import React, { Component } from 'react';
import EChart from '../../../Component/Echart'



export class SidebarBarChart extends Component {
  constructor(props) {
    super();
    
    this.state = {
      options: this.initOptions(props),
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.values !== this.props.values 
    || nextProps.label !== this.props.label 
    || nextProps.horizontal !== this.props.horizontal) {
      nextState.options = this.initOptions(nextProps);
    }
  }

  initOptions(nextProps) {
    let { values } = nextProps;

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
        itemStyle: {
            normal: {
                color: '#ff97b9'
            }
        },
        data: values
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
        show: false,
        type: 'value',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        //inverse: reverseY ? true : false
        //boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        axisLabel:{
          fontStyle: 'Taviraj'
        },
        show: false,
        inverse: true,
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