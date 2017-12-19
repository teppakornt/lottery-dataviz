import * as d3 from 'd3'

const loopNumber = () => {
    d3.select('#headline-radar')
        .transition()
        .delay(1000)
        .duration(0)
        .attr("r", '0%')
        .attr("opacity", 0.4)
        .transition()
        .ease(d3.easeCubic)
        .duration(3200)
        .attr("r", '100%')
        .attr("opacity", 0.1)
        .on('end', loopNumber)
}

export const showTitle = () => {
        
    //transform: rotate(0deg);
    d3.select("#headline1")
        .transition()
        .duration(0)
        .style("transform", 'translate(0px,-50px)')
        .style("transform", 'scale(30,30)')
        .style("opacity",0)
        .transition()
        .delay(400)
        .ease(d3.easeCircle)
        .duration(600)
        .style("transform", 'translate(0px,0px)')
        .style("transform", 'scale(0.8,0.8)')
        .style("opacity",1.0)
        .transition()
        .ease(d3.easeCircle)
        .duration(200)
        .style("transform", 'scale(1,1)')
        

    d3.select("#headline2")
        .transition()
        .duration(0)
        .style("transform", 'translate(0px,-50px) rotate(-20deg)')
        .style("opacity",0)
        .transition()
        .ease(d3.easeCircle)
        .delay(1700)
        .duration(900)
        .style("transform", 'translate(0px,0px) rotate(-20deg)')
        .style("opacity",1.0)
        .transition()
        .ease(d3.easeCircle)
        .duration(200)
        .style("transform", 'rotate(0deg)')
        .on('end', loopNumber)

}