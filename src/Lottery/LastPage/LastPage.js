import React, { Component } from 'react';
import styled from 'styled-components'


const Container = styled.div`
    >h1{
        font-weight: 500;
    }
    >h2{
        line-height: 0.5em;
        font-weight: 500;
    }
    >h4{
        font-weight: 400;
    }
    padding: 0px 3em;
`




export class LastPage extends Component {
  constructor(props){
      super();
  }
  async componentDidMount(){
      
  }
  render(){
    return(<Container>
        <h1>อ้างอิง</h1>
        <div>ข้อมูลที่นำมาใช้ในการจัดทำ Data Visualization ทั้งหมดอ้างอิงจาก &nbsp;
            <a target="__blank" href={'https://www.thairath.co.th'}>thairath.co.th</a>, &nbsp; 
            <a target="__blank" href={'https://www.khaosod.co.th'}>www.khaosod.co.th</a>, &nbsp;
            <a target="__blank" href={'https://matichon.co.th'}>matichon.co.th</a>&nbsp; และ &nbsp;
            <a target="__blank" href={'https://www.manager.co.th'}>www.manager.co.th</a> &nbsp; 
        ระหว่างวันที่ 31 กันยายน 2016 ถึง 31 กันยายน 2017
        </div>
        <div>และข้อมูลจาก Facebook: ข่าวสด ระหว่างวันที่ 1 เมษายน ถึง 14 สิงหาคม 2017</div>
    </Container>)
  }
}
