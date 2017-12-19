import React, { Component } from 'react';
import styled from 'styled-components'

//import { ProvinceChart } from './ProvinceChart'
//import { ProvinceWonChart } from './ProvinceWonChart'
import { ThailandChart } from './ThailandChart'
import { ThailandWonChart } from './ThailandWonChart'
import { ThailandAccuracyChart } from './ThailandAccuracyChart'

const Container = styled.div`
    >h1{
        text-align: center;
        font-weight: 500;
    }
    >h2{
        text-align: center;
        line-height: 0.5em;
        font-weight: 500;
    }
    >h4{
        text-align: center;
        font-weight: 400;
    }
`




export class Province extends Component {
  constructor(props){
      super();
  }
  async componentDidMount(){
      
  }
  render(){
    const { data } = this.props;
    //console.log('this.props', this.props)
    if(!data)return <div></div>
    return(<Container>
        <div style={{marginTop: '20em'}}></div>
        <h1>จังหวัดไหนที่มีเลขเด็ด</h1>
        <h2>ผุดขึ้น มากที่สุด ?</h2>
        <div style={{marginTop: '20em'}}></div>
        <h4>สีของจังหวัด แสดงจำนวนข่าวเลขเด็ดที่เกิดขี้นที่นั้น</h4>
        <div style={{position:'relative'}}>
            <ThailandChart data={data}/>
        </div>
        <div style={{marginTop: '20em'}}></div>
        <h1>จังหวัดไหนใบ้ถูกบ่อยสุด ?</h1>
        <div style={{marginTop: '20em'}}></div>
        <h4>จำนวนงวดที่ถูก</h4>
        <div style={{position:'relative'}}>
            <ThailandWonChart data={data}/>
        </div>
        <div style={{marginTop: '20em'}}></div>
        <h1>แล้วจังหวัดไหนแม่นสุด ?</h1>
        <div style={{marginTop: '20em'}}></div>
        <h4>เปอร์เซ็นต์ความแม่น(จำนวนงวดที่ถูก / จำนวนเลขเด็ด)</h4>
        <div style={{position:'relative'}}>
            <ThailandAccuracyChart data={data}/>
        </div>
        <div style={{marginTop: '20em'}}></div>
        <h1>เลขจาก <span style={{color:'#FF5722'}}>ราชบุรี</span> เด็ดสุด!!!</h1>
        <h2>แม่นถึง 11.82 % ดีกว่าซื้อเองซึ่งแม่นเพียง 1%</h2>
        {/*<ContainerChart>
            <ProvinceWonChart values={data.values} province={data.province} width={'386px'} height={'3000px'}/>
        </ContainerChart>*/}
        {/*<ContainerChart>
            <ProvinceChart values={data.values} province={data.province} width={'386px'} height={'3000px'}/>
        </ContainerChart>*/}
    </Container>)
  }
}
