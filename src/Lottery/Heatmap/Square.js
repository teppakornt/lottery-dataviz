import React from 'react';
import styled from 'styled-components'



const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 80px;
    height: 80px;
    margin-right: 4px;
    margin-bottom: 4px;
    flex-wrap: wrap;
    cursor: pointer;
    background-color: ${props => props.backgroundColor};
    @media only screen and (max-width: 320px) {
        margin-right: 2px;
        margin-bottom: 2px;
        width: 70px;
        height: 70px;
    }
    @media only screen and (min-width: 480px) {
        margin-right: 8px;
        margin-bottom: 8px;
    }
`
/*
const Cell = styled.div`
    border-radius: 1px;
    width: 7px;
    height: 7px;
    background-color: ${prop => prop.color};
    border: 0.5px solid #dcdcdc;
    @media only screen and (max-width: 320px) {
        width: 6px;
        height: 6px;
    }
`*/
export const SquareHeader = styled.div`
    background-image: url(${props => props.url});
    background-size: contain;
    width: 80px;
    height: 80px;
    margin-right: 4px;
    margin-bottom: 4px;
    @media only screen and (max-width: 320px) {
        margin-right: 2px;
        margin-bottom: 2px;
        width: 70px;
        height: 70px;
    }
    @media only screen and (min-width: 480px) {
        margin-right: 8px;
        margin-bottom: 8px;
    }
`
export const Square = (props) => {
    const { /*len_num2, detail,*/ won2, handleOnClickCell } = props;
    return (    
        <Container class="sr" onClick={(e)=>handleOnClickCell(props)} backgroundColor={won2 ? '#2ecc71' : '#2a2a2a'}>
            {/*{_.range(0, len_num2).map(x=><Cell color={won2 ? '#307328' : '#4a4a4a'}/>)}
            {_.range(0, 100-len_num2-detail.length).map(x=><Cell color={won2 ? '#8BC34A' : '#c1c1c1'}/>)}
            {_.range(0, detail.length).map(x=><Cell color={won2 ? '#285f21' : '#2a2a2a'}/>)}*/}
        </Container>
    )
}