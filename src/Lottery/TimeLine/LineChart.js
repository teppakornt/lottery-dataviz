import * as d3 from 'd3'
import colorbrewer from 'colorbrewer'

export const hideNewsBarchart = () => {
    let svg = d3.select("#chart-news")
    svg.html("");
}

export const showNewsBarchart = () => {
    let svg = d3.select("#chart-news"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

    let x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    let line = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    d3.csv("./data/group_news_lot.csv", function(error, data) {
        if (error) throw error;
        
        data.forEach((d) => {
            /*eslint-disable */
            d.date = parseTime(d.lot_date)
            d.khaosod = parseInt(d.khaosod)
            d.thairath = parseInt(d.thairath)
            d.matichon = parseInt(d.matichon)
            d.manager = parseInt(d.manager)
            /*eslint-enable */
            //d.close = +d.close;
        });

        const preprocess = (d, columnName) => ({ id: columnName,  values: d.map( x => ({ date: x.date, value: x[columnName] }) )})
        let news_data = [ preprocess(data,'khaosod'),
                            preprocess(data,'thairath'),
                            preprocess(data,'matichon'),
                            preprocess(data,'manager')]
                            
        let colors = colorbrewer.Set2[5];

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain([0,30]);

        z.domain(['khaosod', 'thairath', 'matichon', 'manager']).range(colors);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .style("font", "200 14px Taviraj")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .style("font", "200 14px Taviraj")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .style("font", "200 14px Taviraj")
            .text("จำนวนข่าว");

        var news = g.selectAll(".news")
            .data(news_data)
            .enter().append("g")
            .attr("class", "news")

        let path = news.append("path")
            .attr("class", "line")
            .attr("id", (d, index) => "chart-new-path"+index )
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); });
        
        
        let text = news.append("image")
            .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
            //.attrTween("transform", (d,index) => translateAlong(path.node(), d))
            .attr('href',(d)=>'./img/'+d.id+'.png')
            .attr('heigth','22px')
            .attr('width','75px')
            // .attr("x", 3)
            // .attr("dy", "0.35em")
            // .style("font", "14px Taviraj")
            // .attr("fill", function(d) { return z(d.id); })
            // .text(function(d) { return d.id; });
        // news.append("text")
        //     .datum(function(d) { return {id: d.id, value: d.values[0]}; })
        //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
        //     .attr("x", 3)
        //     .attr("dy", "0.35em")
        //     .style("font", "14px Taviraj")
        //     .text(function(d) { return d.id; });
        
        // Add verical line
        let openDay = parseTime("2017-05-16 16:00:00")
        g.append("line")
            .attr("x1", x(openDay))  //<<== change your code here
            .attr("y1", 0)
            .attr("x2", x(openDay))  //<<== and here
            .attr("y2", height)
            .attr('stroke-dasharray','5,5')
            .style("stroke-width", 1)
            .style("stroke", "#1a2434")
            .style("fill", "none")
            .style('opacity', 0)
            .transition()
            .delay(12000*0.5)
            .ease(d3.easeLinear)
            .duration(1000)
            .style('opacity', 1)
        g.append('text')
            .attr('x', x(openDay))
            .attr('dx','0.2em')
            .attr('y', height/10)
            .attr('fill', '#1a2434')
            .style("font", "48px Taviraj")
            .text('เปิดเทอม')
            .style('opacity', 0)
            .transition()
            .delay(12000*0.5)
            .ease(d3.easeLinear)
            .duration(1000)
            .style('opacity', 1)
            .style("font", "18px Taviraj")


        // Add verical line
        let newyear = parseTime("2017-01-01 16:00:00")
        g.append("line")
            .attr("x1", x(newyear))  //<<== change your code here
            .attr("y1", 0)
            .attr("x2", x(newyear))  //<<== and here
            .attr("y2", height)
            .attr('stroke-dasharray','5,5')
            .style("stroke-width", 1)
            .style("stroke", "#1a2434")
            .style("fill", "none")
            .style('opacity', 0)
            .transition()
            .delay(12000*0.2)
            .ease(d3.easeLinear)
            .duration(1000)
            .style('opacity', 1)
        g.append('text')
            .attr('x', x(newyear))
            .attr('dx','0.2em')
            .attr('y', height/10)
            .attr('fill', '#1a2434')
            .style("font", "48px Taviraj")
            .text('ปีใหม่')
            .style('opacity', 0)
            .transition()
            .delay(12000*0.2)
            .ease(d3.easeLinear)
            .duration(1000)
            .style('opacity', 1)
            .style("font", "18px Taviraj")

        // Animation

        path = path._groups
        var totalLength = [path[0][0].getTotalLength(), 
                            path[0][1].getTotalLength(),
                            path[0][2].getTotalLength(),
                            path[0][3].getTotalLength()];


        d3.selectAll(path[0])
            .attr("stroke-dasharray", (d, index) => totalLength[index] + " " + totalLength[index] ) 
            .attr("stroke-dashoffset", (d, index) => {return totalLength[index]; })
            .transition()
            .duration(12000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
        const translateAlong = (path, data) => {
            var l = path.getTotalLength();
            return (t) => {
                var p = path.getPointAtLength(t * l);
                return "translate(" + p.x + "," + p.y + ")";
            };
        }
        text.transition()
            .duration(12000)
            .ease(d3.easeLinear)
            .attrTween("transform", (d, index) => { return translateAlong(path[0][index], d)})

    });

}
