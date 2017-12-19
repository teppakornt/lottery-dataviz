import React, { Component } from 'react';
import styled from 'styled-components'

import moment from 'moment'

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

const TextDigit = styled.h1`
    color: ${props => props.color};
    text-align: center;
    line-height: 0em;
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
        </NewsItemContainer>
    </a>
)
const ItemList = ({ detail }) => (
    <div>
        {detail && detail.map(x => <Item {...formatPost(x)}/>)}
    </div>
)

export class SidebarHeatmap extends Component {
    render(){
        const { closeTab, showDetail, cellTarget: { d2Prize, lot_date, won2, detail } } = this.props
        return(
        <Sidebar show={showDetail}>
            {showDetail && 
                <div>
                <div>
                    <CloseButton onClick={closeTab}>X</CloseButton>
                    <h2 style={{textAlign:'center', fontWeight: 400, fontSize: '1em'}}>งวดประจำวันที่ </h2>
                    <h2 style={{textAlign:'center', fontWeight: 400, fontSize: '1em', marginTop: '-1em'}}>{moment(lot_date).format('D MMMM YYYY')}</h2>
                    <h2 style={{fontSize:'1.5em', textAlign:'center'}}>เลขที่ออก</h2>
                    <TextDigit color={won2 ? '#307328' : '#FF5722'}>{d2Prize}</TextDigit>
                    {/*<h2 style={{textAlign: 'center', fontWeight: 400, marginTop: '0em'}}>{province}</h2>
                    <h1 style={{textAlign: 'center', marginTop: '-1em'}}>{province_count+' งวด'}</h1>
                    <h4 style={{textAlign: 'center', fontWeight: 400,  marginTop: '-2em'}}>{'(อันดับ '+rank_text+')'}</h4>*/}
                </div>
                <h2 style={{textAlign: 'center', fontWeight: 400, marginTop: '2em'}}>ข่าวที่เกี่ยวข้อง</h2>
                <ItemList detail={detail}/>
                </div>
            }
        </Sidebar>)
    }
}