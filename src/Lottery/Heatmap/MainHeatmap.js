import React, { Component } from 'react';
//import styled from 'styled-components'
import { Table } from './Table'
import { TopBar } from './TopBar'
//import { ModalMain } from './ModalDetail'
import { loadDATA } from './preprocess'
import { Province } from './Province/Province'
//import { ThailandChart } from './Province/ThailandChart'
import { TagPage } from './TagPage/TagPage'

import { SidebarHeatmap } from './SidebarHeatmap'

export class MainHeatmap extends Component {
  constructor(props){
      super();
      this.state = {
          data: null,
          loading: true,
          visible: false,
          cellTarget: null,
      }
  }
  async componentDidMount(){
    //nextthis.setContext()
    console.log('this.state.loading', this.state.loading)
    if(this.state.loading){
        const data = await loadDATA()
        console.log('data', data)
        this.setState({ data:data, loading: false })
    }
  }
  handleCancel = () => {
    this.setState({...this.state, visible: false })
  }
  handleOnClickCell = (cell) => {
      this.setState({...this.state, cellTarget:cell, visible: true })
  }
  render(){
      const { data, visible, cellTarget } = this.state;
      if(!data) return <div></div>
      console.log('data', data)
      return (
        <div>
            <TopBar data={data.news_data} />
            <Table data={data.news_data} win_count={data.win_count} handleOnClickCell={this.handleOnClickCell}/>
            {/*visible && <ModalMain onClose={this.handleCancel} cellTarget={cellTarget}/>*/}
            {cellTarget && <SidebarHeatmap showDetail={visible} cellTarget={cellTarget} closeTab={this.handleCancel}/>}

            <Province data={data.province_data}/>
            <TagPage data={data.tag_data}/>
        </div>)
  }
}


/*export const MainHeatmap = () => {
    return (<div>55555</div>)
}*/