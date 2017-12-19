import React, { Component } from 'react';
//import styled from 'styled-components'
//import _ from 'lodash'
import EChart from '../../../Component/Echart'

const genSeries = (data) => {

    //console.log('data.news', data.news)
    return {
        type:'bar',
        name: data.news,
        stack: 'lnw',
        /*avoidLabelOverlap: false,
        label: {
          normal: {
              show: true,
              position: 'center'
          },
          emphasis: {
              show: true,
              textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold',
                  fontStyle: 'Taviraj'
              }
          }
        },*/
        data: data.province_won2, //formatData(data),
      }
}
export class ProvinceWonChart extends Component {
  constructor(props) {
    super();
    
    this.state = {
      options: this.initOptions(props),
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data !== this.props.data || nextProps.label !== this.props.label || nextProps.horizontal !== this.props.horizontal) {
      nextState.options = this.initOptions(nextProps);
    }
  }

  initOptions(nextProps) {
    const { values, province } = nextProps

    let series = [
      genSeries(values[0]),
      genSeries(values[1]),
      genSeries(values[2]),
      genSeries(values[3]),
    ]
    let options = {
      series: series,
      tooltip: {
        trigger: 'item',
        show: true,
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        top: '1%',
        containLabel: true
      },
      legend: {
        data: province
      },
      xAxis: {
        show: true,
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel:{
          fontStyle: 'Taviraj'
        },
      },
      yAxis: {
        type: 'category',
        axisLabel:{
          fontStyle: 'Taviraj',
          fontSize: 50,
        },
        show: true,
        inverse: true,
        data: province
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