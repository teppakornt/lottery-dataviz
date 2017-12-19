import React, { Component } from 'react';
import styled from 'styled-components'

import { showTitle } from './FirstPageAnimate'

const Container = styled.div`
    #headline{
        overflow: hidden;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;

        color: black;
    }
    #headline-back{
        background-color: #4a4a4a;
        height: 0.4em;
        transform-origin: left;
    }
    #headline1{
        font-size: 4em;
        text-align: center;
        line-height: 0.8em;
        cursor: default;
        transform-origin: center;
        display:flex;
        flex-direction: row;
        justify-content: center;
    }
    #headline2{
        font-size: 2em;
        text-align: center;
        font-weight: 100;
        transform-origin: center;
        cursor: default;
        color: #FF5722;
        line-height: 1.2em;
    }
`

export class FirstPage extends Component {
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
      showTitle();
  }
  render(){
    return(<Container>
        <div id={'headline'}>
            <div id={"headline1"}>
                <div>ตามล่าแหล่งเลขเด็ด</div>
            </div>
            <div id={"headline2"}>จากข่าว</div>
            <div style={{position: "absolute", zIndex: -1, width: "100%", height:"100%"}}>
            <svg width="100%" height="100%"><circle id="headline-radar" cx="50%" cy="50%" r="0" stroke="#4a4a4a" strokeWidth="1em" fill="white"></circle></svg>
            </div>
        </div>
    </Container>)
  }
}