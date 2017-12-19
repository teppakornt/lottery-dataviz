import React, { Component } from 'react';
//import styled from 'styled-components'
//import _ from 'lodash'
import EChart from '../../../Component/Echart'
import moment from 'moment'

const Y_MAX = 10

export class SidebarLineChart extends Component {
  constructor(props) {
    super();
    
    this.state = {
      options: this.initOptions(props),
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data !== this.props.data 
    || nextProps.values !== this.props.values 
    || nextProps.baseValues !== this.props.baseValues
    || nextProps.dates !== this.props.dates 
    || nextProps.label !== this.props.label 
    || nextProps.horizontal !== this.props.horizontal) {
      nextState.options = this.initOptions(nextProps);
    }
  }

  initOptions(nextProps) {
    const { values, dates, maxY, baseValues, scale, lineText='จำนวนข่าวจังหวัด', baseLineText='จำนวนข่าวทั้งประเทศ(x10)', bgLineColor='rgba(70, 70, 70, 0.3)' } = nextProps
    //console.log('barChart', values, dates, baseValue, scaleBaseLine)
    let series = [
    {
        name: baseLineText,
        type:'line',
        smooth:true,
        data: scale ? baseValues.map( x=> Math.floor((x)/scale)) : baseValues,
        itemStyle: {
            normal: {
                color: 'rgba(70, 70, 70, 0)'
            }
        },
        areaStyle: {
            normal: {
                color: bgLineColor
            }
        },
    },
    {
        name: lineText,
        type:'line',
        smooth:true,
        data: values,
        itemStyle: {
            normal: {
                color: 'rgb(255, 70, 131)'
            }
        }
        
    },
    
    ]
    let options = {
      series: series,
      tooltip: {
        trigger: 'axis',
        show: true,
        position: (point, params, dom, rect, size) => {
            if(point[0]>size.viewSize[0]*0.5){
                return [point[0]-size.contentSize[0], point[1]]
            }
            return point
        }
      },
      grid: {
        left: '8%',
        right: '1%',
        bottom: '10%',
        top: '1%',
      },
      xAxis: {
        type: 'category',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        boundaryGap: false,
        show: true,
        data: dates.map( x => moment(x).format("DD-MM-YYYY")),
      },
      yAxis: {
        type: 'value',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        show: true,
        min: 0,
        max: maxY ? maxY : Y_MAX
        //data: _.range(0,dates.length) //dates
      },
    }
    return options;
  }

  handleInitChart = (chart) => {
    this.chart = chart;
  }

  render() {
    const { width, height, responsive, animation, onClick } = this.props;
    const { options } = this.state;

    return <EChart options={options} onInit={this.handleInitChart} width={width} height={height} responsive={responsive} onClick={onClick} animation={animation} />;
  }
}