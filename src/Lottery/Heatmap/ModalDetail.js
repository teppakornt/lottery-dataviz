import React from 'react';
import styled from 'styled-components'

import moment from 'moment'

const BlockBackground = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    cursor: default;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.82);
    top: 0;
    z-index: 8;
    transition: opacity 0.5s linear;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 80vh;
    background-color: white;
    border-radius: 1em;
    z-index: 10;
    margin: 5% auto;
    transition: opacity 0.5s linear;
    h2{
        font-size: 1em;
        font-weight: 500;
        line-height: 1em;
        text-align: center;
    }
    padding: 1em;
    overflow-y: scroll;
`

const TextDigit = styled.h1`
    color: ${props => props.color};
    text-align: center;
    line-height: 0em;
`


const Header = ({d2Prize, lot_date, won2}) => (
    <div>
        <h2>ฉลากกินแบ่ง งวดประจำวันที่ {moment(lot_date).format('D MMMM YYYY')}</h2>
        <h2 style={{fontSize:'1.5em'}}>เลขที่ออก</h2>
        <TextDigit color={won2 ? '#307328' : '#FF5722'}>{d2Prize}</TextDigit>
    </div>
)
const CloseButton = styled.div`
    font-size: 0.8em;
    font-weight: 500;
    position: absolute;
    cursor: pointer;
    :hover{
        color:#c1c1c1;
    }
`
const ItemTitle = styled.div`
    font-size: 0.8em;
    font-weight: 400;
    color: ${props => props.color};
    margin-bottom: 1em;
`
const formatPost = (post) => {
    const { d2Prize, num2 } = post
    return { ...post , won2: num2 && num2.indexOf(d2Prize) >= 0 }
}
const Item = ({atitlenames, url, btime, won2}) => (
    <a href={url} style={{textDecoration: 'none'}} target="__blank">
        <ItemTitle color={won2 ? '#307328' : 'black'}>{atitlenames}</ItemTitle>
        <div style={{fontSize:'0.4em', marginTop:'0.2em', marginBottom: '1em'}}>{btime}</div>
    </a>
)
const ItemList = ({ detail }) => (
    <div>
        {detail && detail.map(x => <Item {...formatPost(x)}/>)}
    </div>
)
export const ModalMain = ({ onClose, cellTarget }) => {
    console.log('cellTarget', cellTarget)
    return (
        <BlockBackground>
            <Container onClick={(e)=>{}}>
                <Header {...cellTarget}/>
                <ItemList {...cellTarget}/>
                <CloseButton onClick={onClose}>X</CloseButton>
            </Container>
        </BlockBackground>
    )
}