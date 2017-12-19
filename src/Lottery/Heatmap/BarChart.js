import React, { Component } from 'react';
//import styled from 'styled-components'

import EChart from '../../Component/Echart'

export class BarChart extends Component {
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
    let { values, reverseY, markName } = nextProps;

    let data = values.map( x => ({
        value: x.value,
        name: x.name,
        label:{
            normal:{
                show:  x.name === markName
            }
        },
        itemStyle:{
            normal:{
                color: x.name === markName ? '#307328' : '#8bc34a'
            }
        }
    }))

    let series = [
      {
        type:'bar',
        avoidLabelOverlap: false,
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
        },
        data:data
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
      yAxis: {
        show: true,
        type: 'value',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        inverse: reverseY ? true : false
        //boundaryGap: [0, 0.01]
      },
      xAxis: {
        type: 'category',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        show: false,
        data: ['khaosod', 'thairath', 'matichon', 'manager']
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