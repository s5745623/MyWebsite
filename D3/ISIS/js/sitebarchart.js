var data = [
{date: '14-09',number: [124662,301936,0,0,591992,0,294088.666667,1361]},
{date: '14-10',number: [217321,491276,0,0,967812,0,322315.55585,1476]},
{date: '14-11',number: [16688,38827,0,0,76100,0,340904.05585,1234]},
{date: '14-12',number: [48306,141911,190641,74474,263631,611288,358377.55585,1288]},
{date: '15-01',number: [37013,113684,422899,138766,210952,1101115,412109.55585,1291]},
{date: '15-02',number: [0,0,0,0,0,0,430971.05585,0]},
{date: '15-03',number: [28395,69966,224143,100074,137726,874157,446514.55585,953]},
{date: '15-04',number: [46048,114753,222576,114231,236775,1229444,484378.55585,1901]},
{date: '15-05',number: [61656,139798,192523,122869,303045,828325,510247.0,1033]},
{date: '15-06',number: [64205,158748,276673,159993,307504,977790,518069.0,1314]},
{date: '15-07',number: [70594,169074,277686,203698,348100,1075199,528483.666667,1662]},
{date: '15-08',number: [61260,130851,232811,368512,282354,1232568,531253.5,1763]},
{date: '15-09',number: [56668,137767,155875,231370,272179,917778,534114.5,1352]},
{date: '15-10',number: [67354,208690,326641,194912,387938,1001413,530196.0,1212]},
{date: '15-11',number: [270649,737846,232423,168201,1460737,896465,532175.0,970]},
{date: '15-12',number: [177777,444124,149975,138589,924639,684132,543815.5,1015]},
{date: '16-01',number: [85409,248999,164002,78716,500359,508263,554644.0,1309]},
{date: '16-02',number: [30097,86547,68853,144435,174819,388974,557470.0,1177]},
{date: '16-03',number: [83067,237187,114401,205281,467539,588400,565332.666667,1308]},
{date: '16-04',number: [50369,163004,231523,42076,334050,427082,554131.5,1072]},
{date: '16-05',number: [49564,159859,653934,96930,343232,1081982,552018.0,1157]},
{date: '16-06',number: [72474,221178,356422,109007,440769,852592,559634.0,1203]},
{date: '16-07',number: [78598,262814,146057,89024,485319,592234,562912.0,1152]},
{date: '16-08',number: [81033,225953,120363,66331,455650,421001,558086.5,1310]},
{date: '16-09',number: [53097,179283,178866,41917,342636,346784,546638.333333,815]},
{date: '16-10',number: [68773,233056,218528,79771,459779,536203,524822.0,1753]},
{date: '16-11',number: [56356,154887,76406,53286,330069,301194,512700.0,1461]},
{date: '16-12',number: [56856,176410,74600,44229,362722,394577,502551.5,895]},
{date: '17-01',number: [67683,191180,144330,54092,400685,640381,504905.0,969]},
{date: '17-02',number: [55529,175131,79894,42230,356550,287305,507081.0,822]},
{date: '17-03',number: [59673,154176,66427,31262,347112,249099,509965.666667,0]},
{date: '17-04',number: [73734,196881,45291,36300,394998,202947,510884.5,0]},
{date: '17-05',number: [15085,41562,11485,6718,91430,41230,503339.0,0]},
];


var ids = ['posEng', 'negEng', 'posAra', 'negAra','allEng', 'allAra', 'DFC', 'death'];
var ageNames = ['Positive English', 'Negative English', 'Positve Arabic', 'Negative Arabic','English Total Volume', 'Arabic Total Volume', 'Displaced Family Count', 'Death Count'];


// some variables declarations
var margin = {top: 30, right: 20, bottom: 30, left: 40},
    width = $("#bar_chart").width() - margin.left - margin.right,
    height = $("#bar_chart").height() - margin.top - margin.bottom;

// the scale for the state age value
var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

// the scale for each state
var y0 = d3.scale.linear().range([height, 0]);
// the scale for each state age
var y1 = d3.scale.ordinal();

// just a simple scale of colors
var color = d3.scale.ordinal()
    .range(["#7ebff7", "#ef8128", "#e04428", "#fedd6a", "#d89494", "#c3d89b", "#95cddd", "#000000"]);

//
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y0)
    .orient("left")
    .tickFormat(d3.format(".2s"));
    // .ticks(10);

var yGrid = d3.svg.axis()
    .scale(y0)
    .orient("left")
    .tickSize(-width, 0, 0)
    .tickFormat("")
    .ticks(8);



// graph 
var svg = d3.select("#bar_chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/////////////////////////////////////////////////////////////////////////////////////////
// /***** default display of bar_chart, show the first three checkbox, use data from file "bar_data.js"  ******////
//////////////////////////////////////////////////////////////////////////////////////////
  var dataDefault = bar_data
  x.domain(data.map(function(d) { return d.date; }));

  var max = d3.max(dataDefault, function(d) { return d.negEng; });
  var max2 = d3.max(dataDefault, function(d) {return d.posEng;});
    if (max2 > max){
        max = max2;
    }
  y0.domain([0, max]);

  y1.domain(ageNames).rangeRoundBands([0, x.rangeBand()]);

  // console.log(x.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg.append("g")
        .attr("class", "grid")
        .call(yGrid);

    svg.selectAll(".allE")
        .data(dataDefault)
        .enter().append("rect")
        .attr("class", "allE")
        .attr("x", function(d) { return x(d.Date); })
        .attr("width", x.rangeBand()/3)
        .attr("y", function(d) { return y0(d.posEng);})
        .attr("height", function(d) {
            return height - y0(d.posEng);});

    svg.selectAll(".allA")
        .data(dataDefault)
        .enter().append("rect")
        .attr("class", "allA")
        .attr("x", function(d) { return x(d.Date)+x.rangeBand()/3; })
        .attr("width", x.rangeBand()/3)
        .attr("y", function(d) { return y0(d.negEng);})
        .attr("height", function(d) {
            return height - y0(d.negEng);});

    svg.selectAll(".positiveE")
        .data(dataDefault)
        .enter().append("rect")
        .attr("class", "positiveE")
        .attr("x", function(d) { return x(d.Date)+2*(x.rangeBand()/3); })
        .attr("width", x.rangeBand()/3)
        .attr("y", function(d) { return y0(d.posAra);})
        .attr("height", function(d) {
            return height - y0(d.posAra);});
  // append default legend
    var g = svg.append("g");

    g.append("rect")
        .attr("x", width-20)
        .attr("y", -30)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#7ebff7");

    g.append("rect")
        .attr("x", width-20)
        .attr("y", -15)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ef8128");

    g.append("rect")
        .attr("x", width-20)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#e04428");

    g.append("text")
        .attr("x",width-30)
        .attr("y",-20)
        .text("Positve English")
        .style("text-anchor", "end")
        .attr("font-size","10px");

    g.append("text")
        .attr("x",width-30)
        .attr("y",-5)
        .text("Negative English")
        .style("text-anchor", "end")
        .attr("font-size","10px");

    g.append("text")
        .attr("x",width-30)
        .attr("y",10)
        .text("Positve Arabic")
        .style("text-anchor", "end")
        .attr("font-size","10px");

////////////*************defaul display end *************///////////////////////////




///////////////////////////////////////////////////
// *********** barchat dynamic control ----- only can select three checkbox (if checkbox 'death' is selected, then disable the others) ***********//////
///////////////////////////////////////////////////


// $('.category').on('change', function(evt) {
//   if($(this).siblings(':checked').length >= 3) {
//      this.checked = false;
//   } 
// });
$('input:checkbox').click(function(){
  if($('input[id="death"]').is(':checked')){
      $('input.category').not(this).prop('checked', false); 
      $('input.category').not(this).prop('disabled', true); 
    }else{
      $('input.category').not(this).prop('disabled', false); 
      if($(this).siblings(':checked').length >= 3) {
           this.checked = false;};
    }
});



d3.select('.categories').selectAll('.category').on('change', function() {
  var x = d3.select('.categories').selectAll('.category:checked');
  // console.log(x);
  // console.log(x[0]);
  var ids = x[0].map(function(category) {
    return category.id;
  });
  // console.log(ids);
  updateGraph(ids);
});


function updateGraph(selectedIds) {

  d3.select("#bar_chart")            // every time click the checkbox, redraw barchart
    .selectAll('svg')
    .remove();


// re-apend svg and axis 
var svg = d3.select("#bar_chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


svg.append("g")
      .attr("class", "grid")
      .call(yGrid);

  var datesData = data.map(function(dateData) {
    return {
      date: dateData.date,
      ages: selectedIds.map(function(selectedId) {
        var index = ids.findIndex(function(id) {
          return selectedId === id;
        });
        return {
          id: ids[index],
          name: ageNames[index],
          value: dateData.number[index]
        };
      })
    }
  });
  

  x.domain(datesData.map(function(d) { return d.date; }));

  var max = d3.max(datesData, function(d) { return d3.max(d.ages, function(d) { return d.value }); })
  y0.domain([0, max]);
  y1.domain(ids).rangeRoundBands([0, (5*x.rangeBand())/2]); // control the width of each bar

  
  svg.selectAll('.axis.x').call(xAxis);
  svg.selectAll('.axis.y').call(yAxis);

  var date = svg.selectAll(".date")
    .data(datesData);

  date.enter().append("g")
    .attr("class", "date")
    .attr("transform", function(d) { return "translate(" + x(d.date) + ", 0)"; });  // translation at x-axis

  var age = date.selectAll("rect")
    .data(function(d) { return d.ages; });

  // we append a new rect every time we have an extra data vs dom element
  age.enter().append("rect")
    .attr('width', 0);

  // this updates will happend neither inserting new elements or updating them
  age
    // .attr("x", function(d) { return x(d.Date); })
    .attr("y", function(d) { return y0(d.value); })
    .attr("x", function(d, index) { return y1(ids[index]); }) // control each group of bars' position
    .attr("id", function(d) { return d.id; })
    // .style("fill", function(d) { return color(d.name); })
    .style("fill", function(d) { 
      if (d.name =="Positive English"){
        return '#7ebff7';
      }
      if (d.name =="Negative English"){
        return '#ef8128';
      }
      if (d.name =="Positve Arabic"){
        return '#e04428';
      }
      if (d.name =="Negative Arabic"){
        return '#fedd6a';
      }
      if (d.name =="English Total Volume"){
        return '#d89494';
      }
      if (d.name =="Arabic Total Volume"){
        return '#c3d89b';
      }
      if (d.name =="Displaced Family Count"){
        return '#95cddd';
      }
      if (d.name =="Death Count"){
        return '#000000';
      }
       
    })
    .text(function(d) { return d.name })
    .transition()
    .attr("height", function(d) { return height-y0(d.value); })
    .attr("width", y1.rangeBand());// width of bar
 


  // console.log(y1(ids));
  // console.log(y1.rangeBand());


  age.exit().transition().attr("width", 0).remove();

    var legend = svg.selectAll(".legend")
      .data(datesData[0].ages.map(function(age) { return age.name; }));

  legend.enter().append("g");
  legend
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + (-30 + i * 15) + ")"; });

  var legendColor = legend.selectAll('.legend-color')
  .data(function(d) { 
    // console.log([d]);
    // return [d]; });
     return [d]; });

  // var new_color = svg.selectAll(".legend")
  //     .data(datesData[0].ages.map(function(age) { return color(ageNames.indexOf(age.name)); }));

  legendColor.enter().append("rect");
  legendColor
    .attr('class', 'legend-color')
    .attr("x", width - 18)
    .attr("width", 10)
    .attr("height", 10)
    // .style("fill", color);
    .style("fill",function(d){
      // return [color[ageNames.indexOf(d.name)]];
      if (d =="Positive English"){
        return color(0);
      }
      if (d =="Negative English"){
        return '#ef8128';
      }
      if (d =="Positve Arabic"){
        return '#e04428';
      }
      if (d =="Negative Arabic"){
        return '#fedd6a';
      }
      if (d =="English Total Volume"){
        return '#d89494';
      }
      if (d =="Arabic Total Volume"){
        return '#c3d89b';
      }
      if (d =="Displaced Family Count"){
        return '#95cddd';
      }
      if (d =="Death Count"){
        return '#000000';
      }
    });

  var legendText = legend.selectAll('.legend-text').data(function(d) { return [d]; });;

  legendText.enter().append("text");
  legendText
    .attr('class', 'legend-text')
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".15em")
    .style("text-anchor", "end")
    .text(function(d) { return d; })
    .attr("font-size","10px");

  legend.exit().remove();
}


