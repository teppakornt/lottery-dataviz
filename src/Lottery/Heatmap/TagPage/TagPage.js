import React, { Component } from 'react';
import styled from 'styled-components'

//import { ProvinceChart } from './ProvinceChart'
//import { ProvinceWonChart } from './ProvinceWonChart'
import { TagCount } from './TagCount'
import { TagWon } from './TagWon'
import { TagAccuracy } from './TagAccuracy'

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




export class TagPage extends Component {
  constructor(props){
      super();
  }
  async componentDidMount(){
      
  }
  render(){
    const { data } = this.props;
    if(!data)return <div></div>
    return(<Container>
        <div style={{marginTop: '20em'}}></div>
        <h1>สิ่งศักดิ์สิทธิ์ไหน</h1>
        <h2>ฮิตช่วงนี้ ?</h2>
        <div style={{marginTop: '20em'}}></div>
        <h4>สีของสิ่งศักดิ์สิทธิ์ แสดงจำนวนข่าวเลขเด็ดที่เกิดขี้นที่นั้น</h4>
        <div style={{position:'relative'}}>
            <TagCount data={data}/>
        </div>
        <div style={{marginTop: '20em'}}></div>
        <h1>สิ่งศักดิ์สิทธิ์ไหนใบ้ถูกเยอะสุด ?</h1>
        <div style={{marginTop: '20em'}}></div>
        <h4>สีของสิ่งศักดิ์สิทธิ์ แสดงจำนวนงวดที่ถูก</h4>
        <div style={{position:'relative'}}>
            <TagWon data={data}/>
        </div>
        <div style={{marginTop: '20em'}}></div>
        <h1>แล้วสิ่งศักดิ์สิทธิ์ไหนแม่นสุด ?</h1>
        <div style={{marginTop: '20em'}}></div>
        <h4>สีของสิ่งศักดิ์สิทธิ์ แสดงเปอร์เซ็นต์ความแม่น(จำนวนงวดที่ถูก / จำนวนเลขเด็ด)</h4>
        <div style={{position:'relative'}}>
            <TagAccuracy data={data}/>
        </div>
        <div style={{marginTop: '20em'}}></div>
        <h1>เลขจาก <span style={{color:'#FF5722'}}>กระดูก</span> และ <span style={{color:'#FF5722'}}>วิหาร</span>  เด็ดสุด!!!</h1>
        <div style={{marginTop: '20em'}}></div>

        <h1>สรุป แหล่งเลขเด็ด</h1>
        <h4>1. จากข่าว ต้อง <span style={{color:'#FF5722'}}>มติชน</span></h4>
        <h4>2. จากจังหวัด ต้อง <span style={{color:'#FF5722'}}>ราชบุรี</span></h4>
        <h4>3. จากสิ่งศักดิ์สิทธิ์ ต้อง <span style={{color:'#FF5722'}}>กระดูก</span> และ <span style={{color:'#FF5722'}}>วิหาร</span></h4>
        
        <div style={{marginTop: '20em'}}></div>
        
    </Container>)
  }
}
