import React, { Component } from 'react';
//import styled from 'styled-components'
//import _ from 'lodash'
import EChart from '../../Component/Echart'

export class HistrogramChart extends Component {
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
    let { values } = nextProps;

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
        data: values[0].mark === "TRUE" ? values[0].values.map( y => y.CNT ) : values[0].values.map( y => -y.CNT ),
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
        data: values[1].mark === "TRUE" ? values[1].values.map( y => y.CNT ) : values[1].values.map( y => -y.CNT ),
      }
    ]
    let options = {
      series: series,
      tooltip: {
        trigger: 'item',
        show: true,
      },
      grid: {
        left: '0%',
        right: '1%',
        bottom: '1%',
        top: '1%',
        containLabel: false,
      },
      xAxis: {
        show: true,
        type: 'value',
        max: 150,
        min: -150,
        position: 'top',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        //boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        show: true,
        data: values[0].values.map(x => x.bin*2000)
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