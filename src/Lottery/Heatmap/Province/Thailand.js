import * as d3 from 'd3'

import { LOCATION_THAILAND } from '../../location'
import { PROVINCE_MAPPING } from '../../utils'


export const prepareData = (data, news_index=-1, chart_no = 0) => {
    const { province, values, num_lot_won, accuracy } = data
    
    // Case: Select All News
    let province_count = news_index >=0 ? values[news_index].province_count : [];
    if(chart_no === 1){
        province_count = news_index >=0 ? values[news_index].province_won2 : [];
    }else if(chart_no === 2){
        province_count = news_index >=0 ? accuracy.won2_news_pro[news_index].map( x => x.accuracy) : [];
    }
    if(news_index === -1){
        for (let i=0; i<values[0].province_count.length;++i){
            let sum_province = values[0].province_count[i]+values[1].province_count[i]+values[2].province_count[i]+values[3].province_count[i]
            if(chart_no === 1){
                sum_province = num_lot_won[i]
            }else if(chart_no === 2){
                sum_province = accuracy.won2_pro[i].accuracy
            }
            province_count.push(sum_province)
        }
    }
    // Fill Data
    let TmpLocation = JSON.parse(JSON.stringify(LOCATION_THAILAND))
    let dict_location_index = {}
    for(let i=0; i< TmpLocation["features"].length; ++i){
        TmpLocation["features"][i]["properties"]["p"] = 0
        let province_name = TmpLocation["features"][i]["properties"]["name"].toLocaleLowerCase()

        Object.keys(PROVINCE_MAPPING).forEach( p => {
            if(PROVINCE_MAPPING[p] === province_name){
                province_name = p
                TmpLocation["features"][i]["properties"]["name"] = p
            }
        })
        //console.log('province_name', province_name)
        dict_location_index[province_name] = i
    }
    province.forEach( (pro, pro_index) => {
        if(dict_location_index[pro]>=0){
            let location_index = dict_location_index[pro]
            TmpLocation["features"][location_index]["properties"]["value"] = province_count[pro_index]

            TmpLocation["features"][location_index]["properties"]["name"] = pro
            TmpLocation["features"][location_index]["properties"]["p"] = news_index === -1 ? province_count[pro_index]*10 : province_count[pro_index]*30
            if(chart_no === 1){
                TmpLocation["features"][location_index]["properties"]["p"] = news_index === -1 ? province_count[pro_index]*100 : province_count[pro_index]*300
            }else if(chart_no === 2){
                TmpLocation["features"][location_index]["properties"]["p"] = news_index === -1 ? province_count[pro_index]*1000*4 : province_count[pro_index]*3000
                TmpLocation["features"][location_index]["properties"]["value"] = Math.round(province_count[pro_index]*10000)/100
            }
            
        }
    })
    return { province, values: TmpLocation }
}


export const showThailandMap = (lottery_location, showSideBar, hideSideBar, rangeColor=['#fff', '#4ae'], id='#thailand-news', text_unit='ข่าว') => {
    let width = 960, height = 640, centered;

    

    // Define color scale
    let color = d3.scaleLinear()
        .domain([1, 35])
        .clamp(true)
        .range(rangeColor);
    // Get province population 
    const popFn = (d) => {
        let density = d && d.properties ? d.properties.p : null;
        return density / 10;
    }
    // Get province color
    const fillFn = (d) => {
        return color(popFn(d));
    }
    
    let svg = d3.select(id)
        .attr("width", width)
        .attr("height", height);
    
    svg.html("")

    // Add background
    svg.append('rect')
        .style("fill", "#fff")
        .attr('width', width)
        .attr('height', height)
        .on('click', clicked);

    let g = svg.append('g');
    let mapLayer = g.append('g')
        .classed('map-layer', true);

    let xym = d3.geoMercator();
    let path = d3.geoPath().projection(xym);

    // Customize the projection to make the center of Thailand become the center of the map
    xym.rotate([-100.6331, -13.2]);
    xym.translate([width / 2, height / 2]);
    xym.scale(2380);

    mapLayer.selectAll("path").data(lottery_location.features)
        .enter().append("path")
        .attr("d", path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style("fill", fillFn)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", clicked)

    let bigText = svg.append('text')
        .classed('big-text', true)
        .attr("x", width*0.6)
        .attr("y", height*0.8)
        .attr("font-size", "1.5em")
        .attr("color", "black");
    // Get province name
    const nameFn = (d) => {
        return d && d.properties ? d.properties.name + ' (' + ( d.properties.value || 0) + ' '+text_unit+')': null;
    }
    
    

    function mouseover(d) {
        d3.select(this).style('fill', '#FF5722');
        bigText.text(nameFn(d));
    }

    function mouseout(d) {
        d3.select(this).style("fill", fillFn(d));
        // Reset province color
        mapLayer.selectAll('path')
            .style('fill', (d) => { return centered && d===centered ? '#D5708B' : fillFn(d);});
        //bigText.text('');
        if (centered) {
            bigText.text(nameFn(centered));
        } else {
            bigText.text('');
        }
    }
    // When clicked, zoom in
    function clicked(d) {
        let x, y, k;

        // Compute centroid of the selected path
        if (d && centered !== d) {
            let centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
            showSideBar(d.properties.name)
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
            hideSideBar()
        }
        
        // Highlight the clicked province
        mapLayer.selectAll('path')
            .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

        // Zoom
        g.transition()
            .duration(750)
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
    }
    clicked(undefined)
}