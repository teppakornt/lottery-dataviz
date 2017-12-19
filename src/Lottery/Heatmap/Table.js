import React from 'react';
import styled from 'styled-components'
import { Square, SquareHeader } from './Square'
import { BarChart } from './BarChart'
import moment from 'moment'
const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const HeaderContainer = styled.div`
    h2{
        text-align: center;
        font-weight: 500;
    }
    h1{
        text-align: center;
        margin-top: -1em;
    }
    div{
        text-align: center;
        margin-top: -2em;
    }
`
const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`
const ChartContainer = styled.div`
    margin: 0px auto;
    position: relative;
`
const HeatTitleContainer= styled.div`
    h2{
        text-align: center;
        font-weight: 600;
        margin-top: 0em;
    }
`
const HeatTitle = styled.div`
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
`

const HeatLabel = styled.div`
    position: absolute;
    text-align: center;
    margin-left: -3em;
    margin-top: -2em;

`

export const Table = ({ data, win_count, ...props }) => (
    <Container>
        <div style={{marginTop: '20em'}}></div>
        <Header/>
        <div style={{marginTop: '20em'}}></div>
        <ChartContainer>
            <div style={{marginLeft:'-4em'}}>จำนวนงวดที่ถูก</div>
            <div style={{marginLeft:'-1.6em'}}>
                <BarChart values={win_count.map( x => ({name:x.name, value:x.count_won2 }))} markName={'khaosod'} width={'386px'} height={'400px'}/>
            </div>
            {data && data[0] && <RowHeader {...data[0]}/>}
            <div style={{marginBottom:'15em'}}/>
            <HeatTitleContainer>
                <HeatTitle>ดูตามรายงวด</HeatTitle>
                <h2>ช่วงนี้สำนักไหน ทำดี ?</h2>
            </HeatTitleContainer>
            <div style={{marginBottom:'15em'}}/>
            <HeatTitleContainer>
                <img alt={'tutorial'} src={'./img/tutorial.png'} style={{marginLeft:'1em'}}/>
            </HeatTitleContainer>
            <div style={{marginBottom:'15em'}}/>
            <HeatLabel>งวดของเดือน</HeatLabel>
            {data && data.map( x => <Row {...props} {...x}/>)}
        </ChartContainer>

        <div style={{marginTop: '20em'}}></div>
        
        <HeaderAccuracy/>

        <div style={{marginTop: '15em'}}></div>

        <ChartContainer>
            <div style={{marginLeft:'-3em'}}>ความแม่น(%)</div>
            <div style={{marginLeft:'-1.6em'}}>
                <BarChart values={win_count.map( x => ({name:x.name, value:x.percent_won2 }))} markName={'matichon'} width={'386px'} height={'400px'}/>
            </div>
            {data && data[0] && <RowHeader {...data[0]}/>}
        </ChartContainer>
        <div style={{marginTop: '20em'}}></div>
        <SummaryAccuracy/>
    </Container>
)

const Header = () => (
    <HeaderContainer>
        <h2>ข่าวหวยของสำนักไหน</h2>
        <h1 id={'AccuracyHeader'}>แม่นที่สุด ?</h1>
        <div>(จำนวนงวดที่ถูก เฉพาะเลขท้าย 2 ตัว)</div>
    </HeaderContainer>
)

const HeaderAccuracy = () => (
    <HeaderContainer>
        <h2>ถ้าคำนวนเป็นเปอร์เซ็นของความแม่น</h2>
        <div>(จำนวนงวดที่ถูก / จำนวนเลขเด็ด)</div>
    </HeaderContainer>
)

const SummaryAccuracy = () => (
    <HeaderContainer>
        <h2>เลขจาก <span style={{color:'#FF5722'}}>มติชน</span> เด็ดสุด!!!</h2>
        <div style={{marginTop:'2em'}}></div>    
        <div>แม่นระดับ 1.24% มากกว่าสุ่มซื้อ(1%)</div>
    </HeaderContainer>
)

const DateFormat = (date) => {
    if(!date) return ''
    const standard = moment(date).format("D-MMM-YY")
    if(standard==="17-Jan-17")
        return '2017'
    if(standard==="1-Sep-16")
        return moment(date).format("MMM-YY")
    return moment(date).format("MMM")
}
const DateContainer = styled.div`
    font-size: 1em;
    color: #525252;
    transform: rotate(-90deg);
    position: absolute;
    margin-top: 1em;
    margin-left: -2.5em;
    width: 80px;
    text-align: center;
`
const Row = ({ lot_date, values, ...props }) => (
    <RowContainer>
        <DateContainer>{DateFormat(lot_date)}</DateContainer>
        {values && values.map( x => <Square {...props} {...x}/>)}
    </RowContainer>
)

const RowHeader = ({ values }) => (
    <RowContainer>
        {values && values.map( x => <SquareHeader url={`./img/${x.news}2.jpg`}/>)}
    </RowContainer>
)