var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    width = 800,
    height = 600,
    margin = {"top": 30, "right": 30, "bottom": 40, "left": 80},
    padding = 60;

// define svg container
var svg = d3.select("#scatterGraph")
.append("svg")
.attr("width", width)
.attr("height", height)
.style("background", "gray");

//define the 'div' for the tooltip
var div = d3.select("body")
.append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// set the title of the graph
svg.append("text")
    .attr("x", width/2 - (margin.left * 2))
    .attr("y", 40)
    .text("Doping in Professional Bicycle Racing")
    .style("font-size", "150%");

var timeFormat = d3.timeFormat("%M:%S");
//define the range for the axes scale
var x = d3.scaleLinear().range([0, width-(padding*2)]);
var y = d3.scaleTime().range([0, height-(padding*2)]);

//define the axes orientation
var xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft(y).tickFormat(timeFormat);

//handle mouseover click event
function handleMouseover(d) {
    div.style("opacity", 0.9)
        .style("left", (d3.event.pageX + padding/2) + "px")
        .style("top", d3.event.pageY + "px")
        .html("<p>" + d.Name + ",&nbsp;" + d.Nationality + "</p><p>Year:" + d.Year + "&nbsp;&nbsp;&nbsp;Time:" + timeFormat(d.Time) + "</p>" + (d.Doping ? ("<br><p>" + d.Doping +"</p") : ""));
}

//handle mouseout click event
function handleMouseout(d) {
    div.style("opacity", 0);
}


// draw the  graph
function scatterGraph(data) {

    //parse the data
    data.forEach(d => {
        var parsedTime = d.Time.split(":");
        d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    });

    //setup the domain for the axes scale
    x.domain([d3.min(data, d => d.Year - 1), d3.max(data, d => d.Year + 1)]);
    y.domain(d3.extent(data, d => d.Time));

    //append the x axis to the svg container
    svg.append("g")
        .attr("transform", "translate("+ padding + "," + (height-padding) + ")")
        .call(xAxis);
    
    //append the y axis to the svg container
    svg.append("g")
        .attr("transform", "translate(" + padding + "," + padding +")")
        .call(yAxis);
    
    // y axis label
    svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -300)
    .attr('y', 18)
    .style('font-size', 15)
    .text('Time in Minutes');
    
    //plot the data on the graph
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.Year)+padding)
        .attr("cy", d => y(d.Time)+padding)
        .attr("r", 8)
        .style("fill", d => d.Doping == "" ? "#1abc9c" : "orange")
        .style("stroke", "#232323")
        .style("opacity", 0.7)
        .on("mouseover", handleMouseover)
        .on("mouseout", handleMouseout);
}


// load the data for drawing the graph
d3.json(url).then(function(data) {
    scatterGraph(data)
}).catch(function(error) {console.log(error);});