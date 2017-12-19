import React, { Component } from 'react';
import styled from 'styled-components'
import { showNewsBarchart, hideNewsBarchart } from './LineChart'

const Container = styled.div`
    position: relative;
    width:1000px;
    margin: 0px auto;
`

const PlayButton = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
    top: 0;
    font-size: 3em;
    font-weight: 600;
    color: rbga(0,0,0,0.5);
    text-align: center;
    vertical-align: middle;
    line-height: 8;
    :hover{
        color: #f39c12;
        background-color: #7f8c8d;
    }
    opacity: ${ props => props.show ? 1 : 0 };
    transition: color 0.4s;
    transition: background-color 0.4s;
    transition: opacity 0.4;
`

export class TimeLineNews extends Component {
  constructor(props){
      super();
      this.state = {
          show: true
      }
  }
  async componentDidMount(){
      
  }
  hideButton = () => {
      this.setState({show: false})
  }
  render(){
      const { show } = this.state;
      return(
    <Container>
        <svg id="chart-news" width="1000" height="500"></svg>
        <PlayButton show={show} onClick={(e)=>{this.hideButton();hideNewsBarchart();showNewsBarchart()}}>
            เล่น
        </PlayButton>
    </Container>)
  }
}