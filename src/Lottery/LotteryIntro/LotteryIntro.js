import React, { Component } from 'react';
import styled from 'styled-components'


const Container = styled.div`
    h1{
        text-align: center;
        font-weight: 500;
    }
    h2{
        text-align: center;
        line-height: 0.5em;
        font-weight: 500;
    }
    
`
const SmallTitle = styled.div`
    font-size: 0.5em;
    text-align: center;
    line-height: 0.5em;
    font-weight: 300;
    margin-top: -3em;
`

const CompareDetial = styled.div`
    display: flex;
    justify-content: center;
    tr:nth-child(1){
        font-weight: 500;
        text-align: center;
    }
    td:nth-child(2){
        padding-left: 1em;
        text-align: right;
    }
    td:nth-child(3){
        padding-left: 1em;
        text-align: right;
    }
    td:nth-child(4){
        padding-left: 1em;
        text-align: right;
    }
`


export class LotteryIntro extends Component {
  constructor(props){
      super();
  }
  async componentDidMount(){
      
  }
  render(){
    return(<Container>
        <div style={{marginTop: '20em'}}></div>
        <h1>ใครๆหลายคนฝันจะมีเงินล้าน</h1>
        <h2>และนี้คือเครื่องมือ</h2>
        <div style={{marginTop: '20em'}}></div>
        <CompareDetial>
            <img alt={'lottery-intro'} src="./img/lottery.jpg" height="400px"/>
        </CompareDetial>
        <div style={{marginTop: '20em'}}></div>
        <h1>โอกาสจะได้เป็นเศรษฐีเงินล้าน มีมากแค่ไหน ?</h1>
        <div style={{marginTop: '20em'}}></div>
        <h1>รางวัลสลากกินแบ่งรัฐบาล</h1>
        <CompareDetial>
        <table>
            <tr>
                <td>รางวัล</td>
                <td>จำนวน</td>
                <td>มูลค่า (บาท)</td>
                <td>โอกาส (%)</td>
            </tr>
            <tr><td>รางวัลที่ หนึ่ง</td><td>1 รางวัล</td><td>6,000,000</td><td>0.0001</td></tr>
            <tr><td>รางวัลข้างเคียงรางวัลที่หนึ่ง</td><td>2 รางวัล</td><td>100,000</td><td>0.0002</td></tr>
            <tr><td>รางวัลที่ สอง</td><td>5 รางวัล</td><td>200,000</td><td>0.0005</td></tr>
            <tr><td>รางวัลที่ สาม</td><td>10 รางวัล</td><td>80,000</td><td>0.0010</td></tr>
            <tr><td>รางวัลที่ สี่</td><td>50 รางวัล</td><td>40,000</td><td>0.0050</td></tr>
            <tr><td>รางวัลที่ ห้า</td><td>100 รางวัล</td><td>20,000</td><td>0.0100</td></tr>
            <tr><td>รางวัลเลขหน้า 3 ตัว เสี่ยง 2 ครั้ง</td><td>2,000 รางวัล</td><td>4,000</td><td>0.4000</td></tr>
            <tr><td>รางวัลเลขท้าย 2 ตัว เสี่ยง 1 ครั้ง</td><td>10,000 รางวัล</td><td>2,000</td><td>1.0000</td></tr>
        </table>
        </CompareDetial>
        <div style={{marginTop: '20em'}}></div>
        <h1>สมมติ มีคนซื้อหวย 1,000,000 คน</h1>
        <SmallTitle>(แบบเลขไม่ซ้ำ)</SmallTitle>
        <h2>จะมีถึง 14,168 คน ที่ได้รางวัล</h2>

        <div style={{marginTop: '20em'}}></div>
        <h2>ผู้คนทั้งหลาย จึงไล่ตามความฝัน</h2>
        <h1>ยุคนี้จึงเหมือน ยุค<span style={{color: '#FF5722'}}>เลขเด็ด</span> ครองเมือง</h1>
    </Container>)
  }
}
