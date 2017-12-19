import React, { Component } from 'react';
import styled from 'styled-components'
import _ from 'lodash'

import * as d3 from 'd3'
import { NEWS_CODE } from '../../utils'

import { showThailandMap, prepareData } from './Thailand'

import { SidebarLineChart } from './SidebarLineChart'
import { SidebarBarChart } from './SidebarBarChart'


const parseTime = d3.timeParse("%d/%m/%Y %H:%M");

const Container = styled.div`
    width:1000px;
    margin: 0px auto;
    cursor:pointer;
    :hover{
        background-color: rbga(0,0,0,0.2);
    }
`
const Sidebar = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: ${(props) => props.show ? '0vw' : '-35vw'};
    z-index: 1;
    overflow: hidden;
    padding: 1em;
    height: 100vh;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(26,36,52,.5);
    transition: left .6s cubic-bezier(.6,.2,.1,1);
    display: flex;
    justify-content: center;
    cursor: default;
    overflow-y: scroll;
`
const NewsItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #d9d9d9;
    padding: 8px;
    :hover{
        background-color: #d9d9d9;
    }
`
const ItemTitle = styled.div`
    font-size: 0.8em;
    font-weight: 400;
    color: ${props => props.color};
    margin-bottom: -0.5em;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const SquareHeader = styled.div`
    background-image: url(${props => props.url});
    background-size: contain;
    width: 40px;
    height: 40px;
    margin-right: 4px;
    margin-bottom: 4px;
    @media only screen and (max-width: 320px) {
        margin-right: 2px;
        width: 35px;
        height: 35px;
    }
    @media only screen and (min-width: 480px) {
        margin-right: 8px;
    }
`
const CloseButton = styled.div`
    position: absolute;
    right:1em;
    top:1em;
    :hover{
        color: #d9d9d9;
        cursor: pointer;
    }
`


const formatPost = (post) => {
    const { d2Prize, num2 } = post
    return { ...post , won2: num2 && num2.indexOf(d2Prize) >= 0 }
}
const Item = ({atitlenames, url, btime, won2, news, d2Prize}) => (
    <a href={url} style={{textDecoration: 'none'}} target="__blank">
        <NewsItemContainer>
            <SquareHeader url={`./img/${news}2.jpg`}/>
            <div style={{'display':'block'}}>
                <ItemTitle color={won2 ? '#307328' : 'black'}>{atitlenames}</ItemTitle>
                <div style={{fontSize:'0.4em', marginTop:'0.2em'}}>{btime}</div>
            </div>
            <div style={{color:'#307328', fontWeight:'400',  fontSize: '2em', lineHeight: '1em'}}>{d2Prize}</div>
        </NewsItemContainer>
    </a>
)
const ItemList = ({ detail }) => (
    <div>
        {detail && detail.map(x => <Item {...formatPost(x)}/>)}
    </div>
)

export class LeftSidebar extends Component {
    render(){
        const { showDetail, closeTab, popupData: { news_index, province, posts, province_count, rank, value_lot_date, all_lot_date, base_value_lot_date, news_count} } = this.props
        let rank_text = rank.toString()
        return(
        <Sidebar show={showDetail}>
            {showDetail && 
                <div>
                <div>
                    <CloseButton onClick={closeTab}>X</CloseButton>
                    <h2 style={{textAlign: 'center', fontWeight: 400, marginTop: '0em'}}>{province}</h2>
                    <h1 style={{textAlign: 'center', marginTop: '-1em'}}>{province_count+' งวด'}</h1>
                    <h4 style={{textAlign: 'center', fontWeight: 400,  marginTop: '-2em'}}>{'(อันดับ '+rank_text+')'}</h4>
                </div>
                <div>
                    <div style={{fontSize:'0.7em'}}>จำนวนข่าว</div>
                    <SidebarLineChart 
                        values={value_lot_date} dates={all_lot_date} 
                        baseValues={base_value_lot_date} width={'300px'} height={'300px'}
                        lineText={'จำนวนข่าวที่ถูกจังหวัด'}
                        baseLineText={'จำนวนข่าวจังหวัด'}
                        bgLineColor='rgba(68, 170, 238, 0.5)'/>
                </div>
                {news_index===-1 && <div style={{display:'flex', 'flew-direction': 'row'}}>
                    <div style={{position:'absolute'}}>
                        {NEWS_CODE.map( x => <SquareHeader key={'SquareHeader'+x} url={`./img/${x}2.jpg`}/>)}
                    </div>
                    <div>
                        <SidebarBarChart values={news_count} width={'300px'} height={'190px'} scaleBaseLine={false}/>
                        <div style={{fontSize:'0.7em', textAlign: 'center', marginBottom:'2em', marginTop:'-1em'}}>จำนวนข่าวที่ถูก</div>
                    </div>
                </div>}
                <h2 style={{textAlign: 'center', fontWeight: 400, marginTop: '0em'}}>ข่าวที่เกี่ยวข้อง</h2>
                <ItemList detail={posts}/>
                </div>
            }
        </Sidebar>)
    }
}

const SelectNewsContainer = styled.div`
    position: absolute;
    left:1em;
    top:1em;
    padding: 1em;
`
const RadioContaienr = styled.div`
    display: flex;
    align-items: center;
`
export class SelectNews extends Component {
  constructor(props){
      super();
  }
  render(){
    const { news_index, onSelectNews } = this.props;
    
    return(
        <SelectNewsContainer>
            <h3 style={{marginBottom:'0em', fontWeight:400}}>1.เลือกสำนักข่าวที่สนใจ</h3>
            <RadioContaienr onClick={()=>onSelectNews(-1)}>
                <input type="radio" value="option3" checked={news_index===-1}/>
                <div style={{fontSize:'0.6em', marginBottom:'0.6em'}}>ทั้งหมด</div>
            </RadioContaienr>
            {NEWS_CODE.map( (x, index) => (
                <RadioContaienr key={'RadioContaienr'+index} onClick={()=>onSelectNews(index)}>
                    <input type="radio" value="option3" checked={news_index===index}/>
                    <SquareHeader url={`./img/${x}2.jpg`}/>
                </RadioContaienr>
                )
            )}

            <h3 style={{marginBottom:'0em', fontWeight:400}}>2.คลิกที่จังหวัดที่ต้องการ</h3>
            
        </SelectNewsContainer>
    )
  }
}


export class ThailandWonChart extends Component {
  constructor(props){
      super();
      let news_index = -1
      let { data } = props;
      let { values } = prepareData(data, news_index, 1)
      this.state = {
          mapData: values,
          showDetail: false,
          news_index: news_index,
          popupData: null
      }
  }
  componentWillUpdate(nextProps, nextState){
      if(nextState.news_index !== this.state.news_index){
          let { data } = nextProps;
          let { values } = prepareData(data, nextState.news_index, 1)
          nextState.mapData = values
          showThailandMap(nextState.mapData, this.showSideBar, this.hideSideBar, ['#fff', '#2ecc71'], '#thailand-news-won', 'งวด')
      }
  }
  async componentDidMount(){
      const { mapData } = this.state;
      showThailandMap(mapData, this.showSideBar, this.hideSideBar, ['#fff', '#2ecc71'], '#thailand-news-won', 'งวด')
  }
  showSideBar = (province) => {
      this.setState({
          showDetail: true
      })
      const { data } = this.props
      const { news_index } = this.state
      let index_pro = data.province.indexOf(province)
      //console.log('data', data, index_pro, data.values[news_index])
      let province_count = news_index === -1 ? 0 : data.values[news_index].province_won2[index_pro]

      let posts = news_index === -1 ? [] : data.values[news_index].province_detail[index_pro]

      let rank = index_pro === -1 ? data.province.length : data.province.length - index_pro

      
      
      let value_lot_date = news_index === -1 ? [] : data.values[news_index].province_won2_lot_date[index_pro]
      let base_value_lot_date = news_index === -1 ? [] : data.values[news_index].province_lot_date[index_pro]

      let all_lot_date = data.lot_date

      if(news_index === -1 && index_pro !== -1) {
          posts = [...posts, ...data.values[0].province_detail[index_pro] ]
          posts = [...posts, ...data.values[1].province_detail[index_pro] ]
          posts = [...posts, ...data.values[2].province_detail[index_pro] ]
          posts = [...posts, ...data.values[3].province_detail[index_pro] ]

          province_count += data.num_lot_won[index_pro]
         


          for(let i=0;  i < all_lot_date.length;  ++i){
            let value = data.values[0].province_won2_lot_date[index_pro][i]+data.values[1].province_won2_lot_date[index_pro][i]+data.values[2].province_won2_lot_date[index_pro][i]+data.values[3].province_won2_lot_date[index_pro][i]
            value_lot_date.push(value)

            let value2 = data.values[0].province_lot_date[index_pro][i]+data.values[1].province_lot_date[index_pro][i]+data.values[2].province_lot_date[index_pro][i]+data.values[3].province_lot_date[index_pro][i]
            base_value_lot_date.push(value2)
          }

      }
      if (!province_count){
          province_count = 0
          posts = []
      }

      if(news_index !== -1){
          let pc = data.values[news_index].province_won2
          pc = _.orderBy(pc,null,['desc'])
          rank = pc.indexOf(province_count)+1
      }else{
          let pc = data.num_lot_won
          pc = _.orderBy(pc,null,['desc'])
          rank = pc.indexOf(province_count)+1
      }

      let news_count = [0, 0, 0, 0]
      if(posts.length > 0){
        posts = posts.map(x => ({
            ...x,
            won2: x.num2 && x.num2.indexOf(x.d2Prize) >= 0,
            nbtime: parseTime(x.btime)
        }))
        posts = posts.filter(x=>x.won2)
        posts =  _.orderBy(posts, ['nbtime'])
        posts.forEach(x => {
            let indexNewsX = NEWS_CODE.indexOf(x.news)
            if( indexNewsX >= 0)
                news_count[indexNewsX] += 1
        })
      }
      //console.log('posts', posts, province_count, rank, value_lot_date, all_lot_date)
      this.setState({
          popupData: {
              news_index,
              province,
              posts,
              province_count,
              rank,
              value_lot_date,
              all_lot_date,
              news_count,
              base_value_lot_date: base_value_lot_date,
          }
      })
  }
  hideSideBar = (province) => {
    this.setState({
          showDetail: false
      })
  }
  
  onSelectNews = (index) => {
    
    this.setState({
        news_index: index
    })
  }
  render(){
    const { mapData, showDetail, popupData, news_index } = this.state;
    if(!mapData) return <div></div>
    return(<Container>
        {popupData && <LeftSidebar showDetail={showDetail} popupData={popupData} closeTab={this.hideSideBar}/>}
        <SelectNews onSelectNews={this.onSelectNews} news_index={news_index}/>
        <svg id="thailand-news-won" width="1000" height="500"></svg>
    </Container>)
  }
}