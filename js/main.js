var currentValue;
function handleClick(myRadio) {
    currentValue = myRadio.value;
    if(currentValue == "category"){
        graduateCategory();
    }
    if(currentValue == "age"){
      ageGroup();
    }
    if(currentValue == "gender"){
      graduateStateWise();
    }
}


function ageGroup(){

  var margin = {top: 20, right: 20, bottom: 30, left: 100},
      width = 1350 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  d3.json("../data/age-wise.json", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
      d.population = +d.population;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.ageGroup; }));
    y.domain([0, d3.max(data, function(d) { return d.population; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.ageGroup); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.population); })
        .attr("height", function(d) { return height - y(d.population); });
    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
  });
}

function graduateCategory(){
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 100},
      width = 1350 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  d3.json("../data/category.json", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
      d.population = +d.population;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(data, function(d) { return d.population; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.label); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.population); })
        .attr("height", function(d) { return height - y(d.population); });
    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
  });
}


function graduateStateWise(){
  var margin = {top: 20, right: 20, bottom: 200, left: 60},
      width = 1350 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);

  var y = d3.scaleLinear()
            .range([height, 0]);
  var color = d3.scaleOrdinal()
      .range(["lightgreen", "grey"]);

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y).tickFormat(d3.format(".2s"));


  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("../data/state-gender.json", function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[3]).filter(function(key) { return key !== "stateName"; }));
  console.log(d3.keys(data[3]).filter(function(key) { return key !== "stateName"; }));
    data.forEach(function(d) {
      var y0 = 0;
      d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.ages[d.ages.length - 1].y1;
    });


    x.domain(data.map(function(d) { return d.stateName; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)"
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("population");

    var area = svg.selectAll(".area")
        .data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.stateName) + ",0)"; });

    area.selectAll("rect")
        .data(function(d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.y1); })
        .attr("height", function(d) { return y(d.y0) - y(d.y1); })
        .style("fill", function(d) { return color(d.name); })

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });
}
