import React, { PureComponent } from 'react';
import echarts from 'echarts';
import { findDOMNode } from 'react-dom';
import elementResizeEvent, { unbind } from 'element-resize-event';

import debounce from 'lodash/debounce';

// ---- render queue ----
/////////////////////////
let renderQueues = [];
let isQueueRunning = false;

function renderInstance(instance){
	instance.onRenderQueueToggle();
}

function flushRenderQueue() {
	if (renderQueues.length === 0){
    isQueueRunning = false;
    return;
  }
  const onScreenInstance = renderQueues.find((rq)=>{
    if (rq._reactInternalInstance) {
      const element = findDOMNode(rq);
      const rect = element.getBoundingClientRect();
      let yVisible = false;
      let xVisible = false;

      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        yVisible = true;
      } else if (rect.bottom >= 0 && rect.bottom <= window.innerHeight) {
        yVisible = true;
      }
      if (rect.left >= 0 && rect.left <= window.innerWidth) {
        xVisible = true;
      } else if (rect.right >= 0 && rect.right <= window.innerWidth) {
        xVisible = true;
      }

      return xVisible && yVisible;
    }
    return false;
  });

  if (onScreenInstance) {
  	renderInstance(onScreenInstance);
  	renderQueues = renderQueues.filter((rq) => rq !== onScreenInstance);
    setTimeout(flushRenderQueue, 60)
  } else {
  	isQueueRunning = false;
    return;
  }
}

function toggleRenderQueue() {
	if (isQueueRunning) {
    return;
  }
  isQueueRunning = true;
  setTimeout(flushRenderQueue, 60);
}

// -- render worker --
const renderQueueWorker = debounce(toggleRenderQueue,100);
document.addEventListener('scroll', renderQueueWorker);
document.addEventListener('wheel', renderQueueWorker);
document.addEventListener('mousewheel', renderQueueWorker);
window.addEventListener('scroll', renderQueueWorker, true);

function diff(val1, val2) {
  return Math.abs(val1 - val2);
}

// -- render func --
function renderQueue(chart) {
	if (!renderQueues.find((rq) => rq === chart)) {
		renderQueues.push(chart);
	}
	toggleRenderQueue();
};

function removeFromRenderQueue(chart) {
	renderQueues.filter((rq) => rq !== chart);
}

// function clearRenderQueue() {
// 	renderQueues = [];
// }


export default class EChart extends PureComponent {
  static defaultProps = {
    resizeTrigger: 20,
    animation: true,
  };

  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    if (this.props.responsive && this.dom && this.isRegisResize) {
      unbind(this.dom);
    }
    removeFromRenderQueue(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // -- options --
    if (nextProps.options !== this.props.options) {
      this.instance.setOption(nextProps.options);
    }

    // -- size --
    let newResize = null;

    if (nextProps.width !== this.props.width) {
      if (!newResize) newResize = {};
      newResize['width'] = nextProps.width;
    }
    if (nextProps.height !== this.props.height) {
      if (!newResize) newResize = {};
      newResize['height'] = nextProps.height;
    }

    if (newResize) {
      this.instance.resize(newResize);
      this.handleOnResize(nextProps, nextProps.width, nextProps.height);
    }
  }

  initChart = () => {
    const { onInit, responsive, onClick } = this.props;

    this.dom = findDOMNode(this);
    this.instance = echarts.init(this.dom);
    
    // -- use queue --
    // this.instance.setOption(options);
    renderQueue(this);
    this.instance.on('click', onClick);

    if (onInit) {
      onInit(this.instance);
    }

    if (responsive) {
      this.isRegisResize = true;
      this.domSize = { width: this.dom.offsetWidth, height: this.dom.offsetHeight };
      elementResizeEvent(this.dom, this.handleResponsiveResize);
      this.handleOnResize(this.props, this.dom.offsetWidth, this.dom.offsetHeight);
    }
  }

  onRenderQueueToggle = () => {
    const { options, onRender, animation } = this.props;

    this.instance.setOption({
      ...options,
      animation: animation,
    });

    if (onRender) {
      onRender();
    }
  }

  handleResponsiveResize = () => {
    const { resizeTrigger } = this.props;

    if (diff(this.domSize.width, this.dom.offsetWidth) > resizeTrigger || diff(this.domSize.width, this.dom.offsetWidth) > resizeTrigger) {
      this.domSize = { width: this.dom.offsetWidth, height: this.dom.offsetHeight };
      this.instance.resize();

      this.handleOnResize(this.props, this.dom.offsetWidth, this.dom.offsetHeight);
    }
  }

  handleOnResize = (props, width, height) => {
    const { onResize } = props;

    if (onResize) {
      onResize(this.dom.offsetWidth);
    }
  }

  render() {
    const { width, height } = this.props;

    return <div style={{ width: width, height: height }} />;
  }
}
