import React, { Component } from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import { WordCloudD3 } from './WordCloud'
import { NEWS_CODE } from '../../utils'

import { SidebarLineChart } from '../Province/SidebarLineChart'
import { SidebarBarChart } from '../Province/SidebarBarChart'


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
    width:700px;
    margin: 0px auto;
`



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
            <div style={{color:'#307328', fontWeight:'400',  fontSize: '2em', lineHeight: '1em'}}>{d2Prize}</div>
        </NewsItemContainer>
    </a>
)
const ItemList = ({ detail }) => (
    <div>
        {detail && detail.map(x => <Item {...formatPost(x)}/>)}
    </div>
)

export class LeftSidebar extends Component {
    render(){
        const { showDetail, 
            closeTab, 
            popupData: { news_index, 
                tag, 
                detail, 
                lot_won, 
                won_overtime,
                news_overtime,
                rank, 
                all_lot_date,
                news_bar_chart
                //value_lot_date, all_lot_date, base_value_lot_date
            } } = this.props
        let rank_text = rank.toString()

        return(
        <Sidebar show={showDetail}>
            {showDetail && 
                <div>
                <div>
                    <CloseButton onClick={closeTab}>X</CloseButton>
                    <h2 style={{textAlign: 'center', fontWeight: 400, marginTop: '0em'}}>{tag}</h2>
                    <h1 style={{textAlign: 'center', marginTop: '-1em'}}>{lot_won+' งวด'}</h1>
                    <h4 style={{textAlign: 'center', fontWeight: 400,  marginTop: '-2em'}}>{'(อันดับ '+rank_text+')'}</h4>
                </div>
                <div>
                    <div style={{fontSize:'0.7em'}}>จำนวนเลขเด็ด</div>
                    <SidebarLineChart 
                    values={won_overtime} 
                    dates={all_lot_date} 
                    baseValues={news_overtime} 
                    maxY={25}
                    width={'300px'} height={'300px'} 
                    baseLineText={'จำนวนข่าวสิ่งศักดิ์สิทธิ์'}
                    lineText={'จำนวนข่าวที่ถูก'}
                    bgLineColor='rgba(68, 170, 238, 0.5)'
                    scale={1}/>
                </div>
                {news_index===-1 && <div style={{display:'flex', 'flew-direction': 'row'}}>
                    <div style={{position:'absolute'}}>
                        {NEWS_CODE.map( x => <SquareHeader key={'SquareHeader'+x} url={`./img/${x}2.jpg`}/>)}
                    </div>
                    <div>
                        <SidebarBarChart values={news_bar_chart} width={'300px'} height={'190px'}/>
                    </div>
                </div>}
                <h2 style={{textAlign: 'center', fontWeight: 400, marginTop: '0em'}}>ข่าวที่เกี่ยวข้อง</h2>
                <ItemList detail={detail}/>
                </div>
            }
        </Sidebar>)
    }
}

const SelectNewsContainer = styled.div`
    position: absolute;
    left:1em;
    top:1em;
    padding: 1em;
`
const RadioContaienr = styled.div`
    display: flex;
    align-items: center;
`
class SelectNews extends Component {
  constructor(props){
      super();
  }
  render(){
    const { news_index, onSelectNews } = this.props;
    
    return(
        <SelectNewsContainer>
            <h3 style={{marginBottom:'0em', fontWeight:400}}>1.เลือกสำนักข่าวที่สนใจ</h3>
            <RadioContaienr onClick={()=>onSelectNews(-1)}>
                <input type="radio" value="option3" checked={news_index===-1}/>
                <div style={{fontSize:'0.6em', marginBottom:'0.6em'}}>ทั้งหมด</div>
            </RadioContaienr>
            {NEWS_CODE.map( (x, index) => (
                <RadioContaienr key={'RadioContaienr'+index} onClick={()=>onSelectNews(index)}>
                    <input type="radio" value="option3" checked={news_index===index}/>
                    <SquareHeader url={`./img/${x}2.jpg`}/>
                </RadioContaienr>
                )
            )}

            <h3 style={{marginBottom:'0em', fontWeight:400}}>2.คลิกที่สิ่งศักดิ์สิทธิ์</h3>
            
        </SelectNewsContainer>
    )
  }
}


export class TagWon extends Component {
  constructor(props){
      super();
      this.state = {
          news_index: -1,
          showDetail: false,
          popupData: null,
      }
  }
  async componentDidMount(){
      
  }
  onSelectNews = (index) => {
    
    this.setState({
        news_index: index
    })
  }
  showSideBar = (d) => {
      
      const { text: tag } = d
      const { data } = this.props
      const { news_index } = this.state
      let allTagData = data.tag_data[news_index+1].tags
      let tagData = null
      for(let i=0; i<allTagData.length; ++i){
          if(tag === allTagData[i].tag){
              tagData = allTagData[i]
              break
          }
      }
      if(!tagData)return


      //RANK
      let sp = allTagData.map(x=>x.lot_won)
      sp = _.orderBy(sp,null,['desc'])
      let rank = sp.indexOf(tagData.lot_won)+1;

      //NEWS BAR CHART
      let news_bar_chart = NEWS_CODE.map(x => 0)
      let detail = tagData.detail.filter(x => x.won2)
      tagData.detail = detail
      for(let i=0; i<detail.length;++i){
          let idx = NEWS_CODE.indexOf(detail[i].news)
          if(idx >= 0)
            news_bar_chart[idx] += 1
      }
      //console.log('news_bar_chart', news_bar_chart)

      
      this.setState({
          popupData: {
              ...tagData,
              rank: rank,
              news_index,
                news_bar_chart
          },
          showDetail: true,
      })
  }
  hideSideBar = () => {
    this.setState({
          showDetail: false
      })
  }
  render(){
    const { data } = this.props;
    const { news_index, popupData, showDetail } = this.state;
    
    
    if(!data)return <div></div>
    return(<Container>
        {popupData && <LeftSidebar showDetail={showDetail} popupData={popupData} closeTab={this.hideSideBar}/>}
        <SelectNews onSelectNews={this.onSelectNews} news_index={news_index}/>
        <WordCloudD3 
            data={data.tag_data[news_index+1].tags.map(x=> ({text:x.tag,  value: news_index > 0 ? x.lot_won*40 : x.lot_won*20}))}
            onClick={this.showSideBar}
            colorRange={['#fff', '#2ecc71']}/>
    </Container>)
  }
}
