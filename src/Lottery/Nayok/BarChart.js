import React, { Component } from 'react';
//import styled from 'styled-components'
//import _ from 'lodash'
import EChart from '../../Component/Echart'

export class CompareChart extends Component {
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

    let series = [
      {
        type:'bar',
        stack:'lnw',
        name:'หวย',
        avoidLabelOverlap: false,
        label: {
          normal: {
              show: false,
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
        },
        data: [9165, 135],
      },
      {
        type:'bar',
        stack:'lnw',
        avoidLabelOverlap: false,
        name: 'ลุงตู่',
        label: {
          normal: {
              show: false,
              position: 'center'
          },
          emphasis: {
              show: false,
              textStyle: {
                  fontSize: '14',
                  fontWeight: 'bold',
                  fontStyle: 'Taviraj'
              }
          }
        },
        data: [-3470, -1070]
      }
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
      xAxis: {
        show: true,
        type: 'value',
        max: 12000,
        min: -12000,
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        //boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        show: false,
        data: ['', ''].map( x => ({ 
            value: x,
            textStyle:{
                fontSize: 23,
                width: 1,
            }
        }))
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