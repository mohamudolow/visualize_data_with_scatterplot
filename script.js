var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    width = 800,
    height = 600,
    margin = {"top": 30, "right": 30, "bottom": 40, "left": 80};

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

// draw the  graph
function scatterGraph(data) {
    console.log(data[0].Year);
}

// load the data for drawing the graph
d3.json(url).then(function(data) {
    scatterGraph(data)
}).catch(function(error) {console.log(error);});