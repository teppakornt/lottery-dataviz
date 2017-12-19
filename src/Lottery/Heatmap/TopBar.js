import React, { Component } from 'react';
import styled from 'styled-components'
import { SquareHeader } from './Square'
import $ from 'jquery'
//1a2434
const DateContainer = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: -124px;
    z-index: 1;
    overflow: hidden;
    padding: 8px 4vw;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(26,36,52,.5);
    transition: top .6s cubic-bezier(.6,.2,.1,1);
    display: flex;
    justify-content: center;
    div{
        display: flex;
        flex-direction: row;
    }
`

export class TopBar extends Component {
  constructor(props){
      super();
      this.state = {
          data: [],
          showTopBar: false,
      }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextState.showTopBar === this.state.showTopBar){
          return false; 
    }
    if(nextState.showTopBar){
        $('#TopHeaderLogo').css('top','0px')
    }else{
        $('#TopHeaderLogo').css('top','-124px')
    }
    return true
  }
//   componentWillUpdate(nextProps, nextState) {
//       if(nextState.showTopBar === this.state.showTopBar){
//           return; 
//       }
//   }
  
  
  async componentDidMount(){
      $(window).scroll(()=> {
        let offset = 1000
        if($('#AccuracyHeader')[0].offsetTop+700+offset < $(window).scrollTop() && $(window).scrollTop() < $('#AccuracyHeader')[0].offsetTop+3500+offset){
            this.show()
        }else{
            this.hide()
        }
      });
  }
  show(){
    if(!this.state.showTopBar)this.setState({...this.state, showTopBar: true})
  }
  hide(){
    if(this.state.showTopBar)this.setState({...this.state, showTopBar: false})
  }
  render(){
    const { data } = this.props;
    if (!data || !data[0] || !data[0].values) return <div></div>
    return(
        <DateContainer id={'TopHeaderLogo'}>
            <div>
                {data[0].values && data[0].values.map( x => <SquareHeader url={`./img/${x.news}2.jpg`}/>)}
            </div>
        </DateContainer>)
  }
}