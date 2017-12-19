import React, { Component } from 'react';

import WordCloud from 'react-d3-cloud';


// const data = [
//   { text: 'Hey', value: 1000 },
//   { text: 'lol', value: 200 },
//   { text: 'first impression', value: 800 },
//   { text: 'very cool', value: 1000000 },
//   { text: 'duck', value: 10 },
// ];

const fontSizeMapper = word => word.value*0.8;

//const rotate = word => word.value % 360;

export class WordCloudD3 extends Component {
  componentDidMount() {
    /*setInterval(() => {
      this.forceUpdate();
    }, 3000);*/
  }
  render(){
    const { data, onClick, colorRange } = this.props;
    return (<WordCloud
        data={data}
        font={'Taviraj'}
        onClick={onClick}
        rangeColor={colorRange}
        fontSizeMapper={fontSizeMapper} />)
  }

}
