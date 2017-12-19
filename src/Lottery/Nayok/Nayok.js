import React, { Component } from 'react';
import styled from 'styled-components'

//import { HistrogramChart } from './HistrogramChart'
import { CompareChart } from './BarChart'
import { facebookPostProcessData } from './util'

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
    font-size: 1em;
    text-align: center;
    line-height: 1em;
    font-weight: 300;
    margin-top: -2em;
`

const ContainerChart = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const CompareDetial = styled.div`
    position: absolute;
    z-index: 10;
    margin-top: 1em;
    div{
        text-align: center;
    }
`



export class Nayok extends Component {
  constructor(props){
      super();
      this.state = {
          data: facebookPostProcessData()
      }
  }
  async componentDidMount(){
      
  }
  render(){
    //const { data } = this.state;
    return(<Container>
        <div style={{marginTop: '20em'}}></div>
        <h1>คนไทยสนใจเลขเด็ดมากแค่ไหน ?</h1>
        <SmallTitle>(ข้อมูลจาก Facebook: ข่าวสด ระหว่างวันที่ 1 เมษายน ถึง 14 สิงหาคม 2017)</SmallTitle>
        <div style={{marginTop: '20em'}}></div>
        <h2><span style={{color:'#2f4554'}}>ลุงตู่</span> VS <span  style={{color:'#c23531'}}>หวย</span></h2>
        
        <ContainerChart>
            <CompareDetial>
                <div>จำนวนข่าว</div>
                <div style={{marginTop:'3em'}}>ค่าเฉลี่ย จำนวนไลค์ + คอมเมนต์ + แชร์ ต่อข่าว</div>
            </CompareDetial>
            <CompareChart width={'386px'} height={'200px'}/>
            <div>
            </div>

            {/*<div style={{marginTop: '10em'}}></div>
            <h2>การกระจายตัว Engagement ของข่าว</h2>
            <HistrogramChart values={data} width={'386px'} height={'900px'}/>*/}
        </ContainerChart>

        <div style={{marginTop: '20em'}}></div>
        <h2>คนสนใจ <span  style={{color:'#c23531'}}>หวย</span> มากกว่า <span style={{color:'#2f4554'}}>ลุงตู่</span></h2>
        <h1>ประมาณ 2.6 เท่า</h1>
        <div style={{marginTop: '20em'}}></div>
        <h1>1 ปีที่ผ่านมามีข่าวหวย มากแค่ไหน ?</h1>
    </Container>)
  }
}
