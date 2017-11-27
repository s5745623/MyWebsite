function generateTimeAxis(id,data){

    var margin = {top: 0, right: 0, bottom: 20, left: 0},
        width = $(id).width() - margin.left - margin.right,
        height =  $(id).height() - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);


    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max = d3.max(data, function(d) { return 100; });  

    x.domain(data.map(function(d) {return d.Date; }));

    y.domain([0, max]);

    svg.append("g")
        .attr("class", "x axis")
        // .style({'fill': 'black'})
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.selectAll(".positiveE")
        .data(data)
        .enter().append("rect")
        .attr("class", "positiveE")
        .attr("x", function(d) { return x(d.Date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return 100; })
        .attr("height", function(d) {
            return height - 100;});

    svg.selectAll(".current")
        .data(data)
        .enter().append("rect")
        .attr("class", "current")
        .attr("x", function(d) { return x(d.Date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(max); })
        .attr("height", function(d) {
            return height - y(max);})
        .attr("opacity",0)
        .attr("id",function(d,i){return "barSelect"+i;})
        .on("click",function(d,i){
            d3.select("#barSelect"+currentWeek).attr("opacity",0);
            currentWeek=i;
            d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
            transitionMap();
            barClick(d.event);
        })
}

// click on the timeaxis to show monthly event detail
function barClick(event) {
    if (event != ''){

        d3.select("#textMap").classed("hidden", false);
        var marginMap = {top: 20, right: 10, bottom: 10, left: 0},
            widthMap = $('#textMap').width() - marginMap.left - marginMap.right,
            heightMap = 900;

        d3.select('#textMap')
            .selectAll('svg')
            .remove();


        var svg = d3.select('#textMap').append("svg")
            .attr("width", widthMap )
            .attr("height", heightMap)
           .append("g");

        text = svg.append("text")
          .attr("x", 0)
          .attr("y", 20)
          .attr("dy", ".5em")
          .attr("text-anchor", "left")
          .style("opacity", 0.9);

           var lines = event.split('//');
           var first_line = lines.splice(0,1);



            text.append('tspan')
                .attr("x",0)
                .attr("y", 20)
                .attr("dy","0.5em")
                .attr("class", "title")
                .text(first_line);


           for (var i = 0; i < lines.length; i++) {
               text.append("tspan")
                    .text(function(d){return lines[i];})
                    .attr("x",text.attr("x"))
                    .attr("dy","1.4em")
                    .style("font-size","12px") 
                    .attr("class", "content")           
                    .call(wrap, widthMap-20);

            };
        }

    }

//draw tweets map
function generateMap(){
    var marginMap = {top: 10, right: 10, bottom: 10, left: 10},
        widthMap = $('#map').width() - marginMap.left - marginMap.right,
        heightMap = $('#map').height() - marginMap.top - marginMap.bottom;

    var projection = d3.geo.mercator()
        .center([38,33])
        .scale(1500);


    d3.select('#map')
        .selectAll('svg')
        .remove();

    var svgMap = d3.select('#map').append("svg")
        .attr("width", widthMap)
        .attr("height", heightMap);

    var path = d3.geo.path()
        .projection(projection);

    var gMap2 = svgMap.append("g");

    gMap2.selectAll("path")
        .data(SyrAndIrq.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke",'#cccccc')
        .attr("fill",'#ffffff')
        .attr("opacity",1)
        .attr("id",function(d){
            return d.properties.ID_1;
        })
        .attr("class","region");


    var gMap = svgMap.append("g");

    gMap.selectAll("path")
        .data(SyrAndIrq.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke",'#aaaaaa')
        .attr("fill",'none')
        .attr("class","country");

   gMap.append("text")
        .attr("x",0)
        .attr("y",200)
        .text(function(d){
            if (automap == 'all'){
                return "Total Tweets per Month";

            }

            if (automap == 'positive'){
                return "Positive Tweets per Month";
            }

             if (automap == 'negative'){
                return "Negative Tweets per Month";

            }

            if (automap == 'death') {
                return "Deaths per Month";
            } } )
        .attr("font-size","12px");

    gMap.append("rect")
        .attr("x", 0)
        .attr("y", 220)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ffffff")
        .attr("stroke","#000000")
        .attr("stroke-width",1);

    gMap.append("text")
        .attr("x",15)
        .attr("y",228)
        .text("0")
        .attr("font-size","10px");

    gMap.append("rect")
        .attr("x", 0)
        .attr("y", 240)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ffe082");

    gMap.append("text")
        .attr("x",15)
        .attr("y",248)
        .text( function(d){
            if (automap == 'all'){
                return "1 - 999 ";

            }

            if (automap == 'positive'){
                return "1 - 999";
            }

             if (automap == 'negative'){
                return "1 - 999";

            }

            if (automap == 'death') {
                return "1 - 99";
            } } )
        .attr("font-size","10px");

    gMap.append("rect")
        .attr("x", 0)
        .attr("y", 260)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ffbd13");

    gMap.append("text")
        .attr("x",15)
        .attr("y",268)
        .text(function(d){
            if (automap == 'all'){
                return "1,000 - 9,999 ";

            }

            if (automap == 'positive'){
                return "1,000 - 4,999";
            }

             if (automap == 'negative'){
                return "1,000 - 9,999";

            }

            if (automap == 'death') {
                return "100 - 499";
            } } )
        .attr("font-size","10px");

    gMap.append("rect")
        .attr("x", 0)
        .attr("y", 280)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ff8053");

    gMap.append("text")
        .attr("x",15)
        .attr("y",288)
        .text(function(d){
            if (automap == 'all'){
                return "10,000 - 99,999 ";

            }

            if (automap == 'positive'){
                return "5,000 - 9,999";
            }

             if (automap == 'negative'){
                return "10,000 - 99,999";

            }

            if (automap == 'death') {
                return "500 - 999";
            } } )
        .attr("font-size","10px");

    gMap.append("rect")
        .attr("x", 0)
        .attr("y", 300)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ff493d");

    gMap.append("text")
        .attr("x",15)
        .attr("y",308)
        .text(function(d){
            if (automap == 'all'){
                return ">= 100,000 ";

            }

            if (automap == 'positive'){
                return ">= 10,000";
            }

             if (automap == 'negative'){
                return ">= 100,000";

            }

            if (automap == 'death') {
                return ">= 1,000";
            } } )
        .attr("font-size","10px");

    var mapLabels = svgMap.append("g");

    mapLabels.selectAll('text')
        .data(SyrAndIrq.features)
        .enter()
        .append("text")
        .attr("x", function(d){
            return path.centroid(d)[0]-20;})
        .attr("y", function(d){
            return path.centroid(d)[1];})
        .attr("dy", ".55em")
        .attr("class","maplabel")
        .style("font-size","8px")
        .attr("opacity",0.4)
        .text(function(d){
            return d.properties.NAME_1;
        });


     var groups = svgMap.selectAll("g")
        .data(medical_centres_geo.features)
        .enter()
        .append("g");


    groups.append("circle")
        .attr({
            cx: function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[0];            },
            cy: function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[1];            },
            r: 0,
            fill: "steelblue",
            opacity: 0.4,
            stroke: "#fff",
            "stroke-width": 2
        })
        .attr("id",function(d){
            return d.properties.ID;
        });
}



function transitionMap(){
    // $('#week').html("<h4>A map of the number of tweets about Syria and Iraq in the month " + mapSettings[currentWeek].Date + "</h4>");

    var projection = d3.geo.mercator()
        .center([mapSettings[currentWeek].lng,mapSettings[currentWeek].lat])
        .scale(mapSettings[currentWeek].scale);

    var path = d3.geo.path()
        .projection(projection);

    d3.selectAll('.country')
        .attr('d', path);

    d3.selectAll('.maplabel')
        .attr("x", function(d,i){
            return path.centroid(d)[0]-20;})
        .attr("y", function(d,i){
            return path.centroid(d)[1];});

    d3.selectAll('.region').attr('d', path);



    if (mapswitch == 'all'){
        $('#week').html("<h4>Heat Map of <span style='color:#1c9eff'>" + "Total" +' '+ "</span>" + "Tweets by province in the month " + mapSettings[currentWeek].Date + "</h4>" + "<p> <span style='color:#999999'>** Click the bubbles on the map to show the details of events." + "</span>"+ "<p>");
         map_data = all_map[currentWeek].Cases;

    }

    if (mapswitch == 'positive'){
        $('#week').html("<h4>Heat Map of <span style='color:#1c9eff'>" + "Positive" +' '+ "</span>" + "Tweets by province in the month " + mapSettings[currentWeek].Date + "</h4>" + "<p> <span style='color:#999999'>** Click the bubbles on the map to show the details of events." + "</span>"+ "<p>");
        map_data = pos_map[currentWeek].Cases;

    }

    if (mapswitch == 'negative'){
        $('#week').html("<h4>Heat Map of <span style='color:#1c9eff'>" + "Negative" +' '+ "</span>" + "Tweets by province in the month " + mapSettings[currentWeek].Date + "</h4>" + "<p> <span style='color:#999999'>** Click the bubbles on the map to show the details of events." + "</span>"+ "<p>");;
        map_data = neg_map[currentWeek].Cases;

    }
    if (mapswitch == 'death') {
        $('#week').html("<h4>Heat Map of <span style='color:#1c9eff'>" + "Death" +' '+ "</span>" + "by province in the month " + mapSettings[currentWeek].Date + "</h4>" + "<p> <span style='color:#999999'>** Click the bubbles on the map to show the details of events." + "</span>"+ "<p>");;
        map_data = deaths[currentWeek].Cases;
    }


    map_data.forEach(function(element){
        d3.select("#"+element.Region.replace(/\s/g, ''))
            .attr("fill",function(d){
                if (mapswitch == 'all'){
                return convertCasesToColorAll(element.Cases);
                }
                if (mapswitch == 'positive'){
                return convertCasesToColorPos(element.Cases);
                }
                if (mapswitch == 'negative'){
                return convertCasesToColorNeg(element.Cases);
                }
                if (mapswitch == 'death'){
                return convertCasesToColorDeath(element.Cases);
                }
            });

    });


// bubbles on map
    var data = medical_centres[currentWeek].medical_centres;
    data.forEach(function(bubble){

        var tooltip = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);

        d3.select("#"+bubble.id)
            .attr("opacity",convertMedicalCentresToOpacity(bubble.count))
            .attr('r', bubbleCount(bubble.count))
            .attr('cx',function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[0];
            })
            .attr('cy',function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[1];
            })

            .on("click", function() { 
                nodeClick(bubble.event); 
            })
            
            .on("mouseover", function(d) { 
                d3.select("#myText").remove();
                var tooltip = d3.select("body").append("div");
                tooltip.attr("class", "tooltip");
                tooltip.style("opacity", 0);   
                d3.select(this).style("fill","#73c8f4")
                    .attr("stroke", "#fff")
                    .attr('r', 2*bubbleCount(bubble.count))
                    .attr("stroke-width", 1);
                tooltip.transition()        
                    .duration(100)      
                    .style("opacity", convertMedicalCentresToOpacity(bubble.count));      
                tooltip.html(bubble.id + "<br/>"  + bubble.count) 
                    .attr("id", "myText") 
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY - 28) + "px"); 
                }) 

            .on("mouseout", function(d) { 
                // d3.select("#myText").attr("opacity", 0);
                tooltip.transition()        
                    .duration(100)
                    .style("opacity", 0);
                d3.select(this).style("fill","steelblue")
                    .attr("stroke", "#fff")
                    .attr('r', bubbleCount(bubble.count))
                    .attr("stroke-width", 2); 
                d3.select("#myText").remove();
      
            });
            // .on("mouseover", function (d, i) { alert(bubble.countnum); })        
                        
    });
}

// click bubble on the map to show event detail
function nodeClick(event) {
    if (event != ''){

        d3.select("#textMap").classed("hidden", false);
        var marginMap = {top: 20, right: 10, bottom: 10, left: 0},
            widthMap = $('#textMap').width() - marginMap.left - marginMap.right,
            heightMap = 900;

        d3.select('#textMap')
            .selectAll('svg')
            .remove();


        var svg = d3.select('#textMap').append("svg")
            .attr("width", widthMap )
            .attr("height", heightMap)
           .append("g");

        text = svg.append("text")
          .attr("x", 0)
          .attr("y", 20)
          .attr("dy", ".5em")
          .attr("text-anchor", "left")
          .style("opacity", 0.9);

           var lines = event.split('//');
           var first_line = lines.splice(0,1);



            text.append('tspan')
                .attr("x",0)
                .attr("y", 20)
                .attr("dy","0.5em")
                .attr("class", "title")
                .text(first_line);


           for (var i = 0; i < lines.length; i++) {
               text.append("tspan")
                    .text(function(d){return lines[i];})
                    .attr("x",text.attr("x"))
                    .attr("dy","1.4em")
                    .style("font-size","12px") 
                    .attr("class", "content")           
                    .call(wrap, widthMap-20);

            };
        }

    }

// format of event list 
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 0, // ems
            x = text.attr("x"),
            y = text.attr("y") ,
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }          
        }
    });

}


function bubbleCount(count){
    if (count>0 && count<3){
        return 5} 
    else if (count>2 && count<6){
        return 8}
    else if (count>5 && count<11){
        return 15}
    else if (count>11 && count<21){
        return 25}
    else{
        return 30};
}

function convertCasesToColorDeath(cases){

    var colors = ["#ffffff","#ffe082","#ffbd13","#ff8053","#ff493d"];

    if(cases==0){
        c=0;
    } else if(cases<100){
        c=1;
    } else if(cases<500){
        c=2;
    } else if(cases<1000){
        c=3;
    } else {
        c=4;
    };
    return colors[c];
}

function convertCasesToColorAll(cases){
    var colors = ["#ffffff","#ffe082","#ffbd13","#ff8053","#ff493d"];
    if(cases==0){
        c=0;
    } else if(cases<1000){
        c=1;
    } else if(cases<10000){
        c=2;
    } else if(cases<100000){
        c=3;
    } else {
        c=4;
    };
    return colors[c];
}


function convertCasesToColorNeg(cases){
    var colors = ["#ffffff","#ffe082","#ffbd13","#ff8053","#ff493d"];
    if(cases==0){
        c=0;
    } else if(cases<1000){
        c=1;
    } else if(cases<10000){
        c=2;
    } else if(cases<100000){
        c=3;
    } else {
        c=4;
    };
    return colors[c];
}

function convertCasesToColorPos(cases){
    var colors = ["#ffffff","#ffe082","#ffbd13","#ff8053","#ff493d"];
    if(cases==0){
        c=0;
    } else if(cases<1000){
        c=1;
    } else if(cases<5000){
        c=2;
    } else if(cases<10000){
        c=3;
    } else {
        c=4;
    };
    return colors[c];
}


function convertMedicalCentresToOpacity(count){
    if(count==0){
        return 0;
    } else {
        return 0.75;
    }
}

function formatDate(date){
    var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return  month[parseInt(date.substring(5,7))-1] + "/" + date.substring(2,4);

}


var currentWeek=0;
// $('#titleBarchar').html("<h4>Bar Graph of <span style='color:#1c9eff'>" + "Total" +' '+ "</span>" + "Tweets in the month " + mapSettings[currentWeek].Date + "</h4>");
generateTimeAxis("#timeaxis", bar_data);

// 
d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
automap = 'death';
generateMap();
// default title of map
$('#week').html("<h4>Heat Map of <span style='color:#1c9eff'>" + "Total" +' '+ "</span>" + "Tweets by province in the month " + mapSettings[currentWeek].Date + "</h4>" + "<p> <span style='color:#999999'>** Click the bubbles on the map to show the details of events." + "</span>"+ "<p>");
mapswitch = 'death';
transitionMap();


// handle on click event to switch between maps, titles
d3.selectAll(".m")
    .on("click", function() {
        mapswitch = this.getAttribute("value");
        if (mapswitch == 'all'){
            generateMap();
            transitionMap();
        }
        if (mapswitch == 'positive'){
            generateMap();
            transitionMap();
        }
        if (mapswitch == 'negative'){
            generateMap();
            transitionMap();
        }

        if (mapswitch == 'death'){
            generateMap();
            transitionMap();
        }

    });




$(document).keydown(function(e) {
    switch(e.which) {
        case 37:
            d3.select("#barSelect"+currentWeek).attr("opacity",0);
            currentWeek=currentWeek-1;
            if(currentWeek<0){currentWeek=0;}
            d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
            transitionMap();
            break;

        case 39:
            d3.select("#barSelect"+currentWeek).attr("opacity",0);
            currentWeek=currentWeek+1;
            if(currentWeek>bar_data.length-1){
                currentWeek=bar_data.length-1;
            }
            d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
            transitionMap();
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


function autoAdvance(){
    d3.select("#barSelect"+currentWeek).attr("opacity",0);
    currentWeek=currentWeek+1;
    if(currentWeek>bar_data.length-1){
        currentWeek=0;
    }
    d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
    transitionMap();
}

var playTimer;

$(".playPause").click(function(){
    if($(".playPause").hasClass("paused")){
        playTimer = setInterval(function(){autoAdvance()}, 1500);
        $(".playPause").removeClass("paused");
        $(".playPause").addClass("playing");
    } else {
        clearInterval(playTimer);
        $(".playPause").removeClass("playing");
        $(".playPause").addClass("paused");
    }
})

// initiate autoplay on page load
$( document ).ready(function(){
    $(".playPause").trigger("click");
});









