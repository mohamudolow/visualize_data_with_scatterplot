var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    width = 800,
    height = 600,
    margin = {"top": 30, "right": 30, "bottom": 40, "left": 80},
    padding = 50;

// define svg container
var svg = d3.select("#scatterGraph")
.append("svg")
.attr("width", width)
.attr("height", height)
.style("background", "gray");

// set the title of the graph
svg.append("text")
    .attr("x", width/2 - (margin.left * 2))
    .attr("y", 40)
    .text("Doping in Professional Bicycle Racing")
    .style("font-size", "150%");

//define the range for the axes scale
var x = d3.scaleLinear().range([0, width-(padding*2)]);
var y = d3.scaleTime().range([0, height-(padding*2)]);

//define the axes orientation
var xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft(y).tickFormat(d3.timeFormat("%M:%S"));


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
        .style("opacity", 0.7);
}


// load the data for drawing the graph
d3.json(url).then(function(data) {
    scatterGraph(data)
}).catch(function(error) {console.log(error);});