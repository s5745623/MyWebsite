function generateBarChartPos(id,data){

    var margin = {top: 30, right: 50, bottom: 30, left: 50},
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

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([15, 0])
        .html(function(d) {
            return d.Date +"<br/>"+ "EnglishCount:<span style='color:#1c9eff'>" +' '+ d.positive + "</span>" + "<br/>" + "ArabicCount:<span style='color:#1c9eff'>" +' '+ d.positiveArab + "</span>";
        });


    var yGrid = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width, 0, 0)
        .tickFormat("")
        .ticks(5);

    d3.select(id)
        .selectAll('svg')
        .remove();

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max = d3.max(data, function(d) { return d.positive; });


    x.domain(data.map(function(d) {return formatDate(d.Date); }));

    y.domain([0, max]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 4)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "#98abc5")
        .text("Positive");


    svg.append("g")
        .attr("class", "grid")
        .call(yGrid);

    svg.call(tip);

    svg.selectAll(".positive")
        .data(data)
        .enter().append("rect")
        .attr("class", "positive")
        .attr("x", function(d) { return x(formatDate(d.Date)); })
        .attr("width", x.rangeBand()/2)
        .attr("y", function(d) { return y(d.positive); })
        .attr("height", function(d) {
            return height - y(d.positive);});

    svg.selectAll(".negative")
        .data(data)
        .enter().append("rect")
        .attr("class", "negative")
        .attr("x", function(d) { return x(formatDate(d.Date))+x.rangeBand()/2; })
        .attr("width", x.rangeBand()/2)
        .attr("y", function(d) { return y(d.positiveArab); })
        .attr("height", function(d) {
            return height - y(d.positiveArab);});

    svg.selectAll(".current")
        .data(data)
        .enter().append("rect")
        .attr("class", "current")
        .attr("x", function(d) { return x(formatDate(d.Date)); })
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
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    var g = svg.append("g");

    g.append("rect")
        .attr("x", width-90)
        .attr("y", 5)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","steelblue");

    g.append("rect")
        .attr("x", width-90)
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","red");

    g.append("text")
        .attr("x",width-75)
        .attr("y",13)
        .text("Positive_English")
        .attr("font-size","10px");

    g.append("text")
        .attr("x",width-75)
        .attr("y",28)
        .text("Positive_Arabic")
        .attr("font-size","10px");


}


function generateBarChartNeg(id,data){

    var margin = {top: 30, right: 50, bottom: 30, left: 50},
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


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([15, 0])
        .html(function(d) {
            return d.Date +"<br/>"+ "EnglishCount:<span style='color:#1c9eff'>" +' '+ d.negative + "</span>" + "<br/>" + "ArabicCount:<span style='color:#1c9eff'>" +' '+ d.negativeArab + "</span>";
        });


    var yGrid = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width, 0, 0)
        .tickFormat("")
        .ticks(5);

    d3.select(id)
        .selectAll('svg')
        .remove();

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max = d3.max(data, function(d) { return d.negative; });


    x.domain(data.map(function(d) {return formatDate(d.Date); }));

    y.domain([0, max]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 4)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("fill", "#98abc5")
        .text("Negative");


    svg.append("g")
        .attr("class", "grid")
        .call(yGrid);

    svg.call(tip);

    svg.selectAll(".positive")
        .data(data)
        .enter().append("rect")
        .attr("class", "positive")
        .attr("x", function(d) { return x(formatDate(d.Date)); })
        .attr("width", x.rangeBand()/2)
        .attr("y", function(d) { return y(d.negative); })
        .attr("height", function(d) {
            return height - y(d.negative);});

    svg.selectAll(".negative")
        .data(data)
        .enter().append("rect")
        .attr("class", "negative")
        .attr("x", function(d) { return x(formatDate(d.Date))+x.rangeBand()/2; })
        .attr("width", x.rangeBand()/2)
        .attr("y", function(d) { return y(d.negativeArab); })
        .attr("height", function(d) {
            return height - y(d.negativeArab);});

    svg.selectAll(".current")
        .data(data)
        .enter().append("rect")
        .attr("class", "current")
        .attr("x", function(d) { return x(formatDate(d.Date)); })
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
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    var g = svg.append("g");

    g.append("rect")
        .attr("x", width-90)
        .attr("y", 5)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","steelblue");

    g.append("rect")
        .attr("x", width-90)
        .attr("y", 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","red");

    g.append("text")
        .attr("x",width-75)
        .attr("y",13)
        .text("Negative_English")
        .attr("font-size","10px");

    g.append("text")
        .attr("x",width-75)
        .attr("y",28)
        .text("Negative_Arabic")
        .attr("font-size","10px");


}

//tweets map
function generateMap(){
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = $('#map').width() - margin.left - margin.right,
        height = 425;

    var projection = d3.geo.mercator()
        .center([38,33])
        .scale(1800);


    d3.select('#map')
        .selectAll('svg')
        .remove();

    var svg = d3.select('#map').append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");

    g.selectAll("path")
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


    // add circles
    // var g = svg.append("g");
    //
    // g.selectAll("circles")
    //     .data(medical_centres_geo.features)
    //     .enter()
    //     .append("circle")
    //     .attr('cx',function(d){
    //         var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
    //         return point[0];
    //     })
    //     .attr('cy',function(d){
    //         var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
    //         return point[1];
    //     })
    //     .attr("r", 15)
    //     .attr("id",function(d){
    //         return d.properties.ID;
    //     })
    //     .attr("class","medical_centres")
    //     .attr("fill","green")
    //     .attr("opacity",0.7)
    //     .on("mouseover", function(d) {
    //         d3.select(this).style("fill","#FC0");})
    //     .on("mouseout", function(d) {
    //         d3.select(this).style("fill","steelblue");})
    //     .append("text")
    //     .text(10)
    //     .attr({
    //         "alignment-baseline": "middle",
    //         "text-anchor": "middle"
    //     });






    var groups = svg.selectAll("g")
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
            r: 10,
            fill: "#BADBDA",
            opacity: 0.5,
            stroke: "#fff",
            "stroke-width": 1
        })
        .attr("id",function(d){
            return d.properties.ID;
        })
        .on("mouseover", function(d) {
            d3.select(this).style("fill","#FC0");})
        .on("mouseout", function(d) {
            d3.select(this).style("fill","steelblue");});


    groups.append("text")
        .attr("id",function (d) {
            return d.properties.ID;
        })
        .text(100)
        .attr({
            x: function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[0];            },
            y: function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[1];           },
            "alignment-baseline": "middle",
            "text-anchor": "middle"
        });




    var g = svg.append("g");

    g.selectAll("path")
        .data(SyrAndIrq.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke",'#aaaaaa')
        .attr("fill",'none')
        .attr("class","country");


    g.append("rect")
        .attr("x", 0)
        .attr("y", 220)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ffffff")
        .attr("stroke","#000000")
        .attr("stroke-width",1);

    g.append("text")
        .attr("x",15)
        .attr("y",228)
        .text("No tweets")
        .attr("font-size","10px");

    g.append("rect")
        .attr("x", 0)
        .attr("y", 240)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ffe082");

    g.append("text")
        .attr("x",15)
        .attr("y",248)
        .text("1 to 99 tweets in the month")
        .attr("font-size","10px");

    g.append("rect")
        .attr("x", 0)
        .attr("y", 260)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ffbd13");

    g.append("text")
        .attr("x",15)
        .attr("y",268)
        .text("100 to 499 tweets in the month")
        .attr("font-size","10px");

    g.append("rect")
        .attr("x", 0)
        .attr("y", 280)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ff8053");

    g.append("text")
        .attr("x",15)
        .attr("y",288)
        .text("500 to 1000 tweets in the last month")
        .attr("font-size","10px");

    g.append("rect")
        .attr("x", 0)
        .attr("y", 300)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill","#ff493d");

    g.append("text")
        .attr("x",15)
        .attr("y",308)
        .text("1000 or more tweets in the month")
        .attr("font-size","10px");

    var mapLabels = svg.append("g");

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


}



function transitionMap(){


    $('#week').html("<h4>A map of the number of tweets about Syria and Iraq in the month " + mapSettings[currentWeek].Date + "</h4>");

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


    if (choro == 'tweets'){
         map_data = regionCases[currentWeek].Cases;

    }
    if (choro == 'events') {
        map_data = regionEvents[currentWeek].Cases;
    }


    map_data.forEach(function(element){
        d3.select("#"+element.Region.replace(/\s/g, ''))
            .attr("fill",convertCasesToColor(element.Cases));

    });


    var data = medical_centres[currentWeek].medical_centres;

    data.forEach(function(bubble){

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(bubble) {
                return bubble.countnum;
            });

        // bubbleId.call(tip);

        d3.select("#"+bubble.id)
            .attr("opacity",convertMedicalCentresToOpacity(bubble.open))
            .attr('r', bubble.countnum)
            // .on("mouseover", function (d, i) { alert(bubble.countnum); })
            // .on("mouseover", function (d, i) { alert(bubble.countnum); })

            .attr('cx',function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[0];
            })
            .attr('cy',function(d){
                var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
                return point[1];
            });




        d3.select("#"+bubble.id)
            // .enter()
            // .append("text")
            .text(bubble.countnum)
            // .attr({
            //     // x: function(d){
            //     //     var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
            //     //     return point[0];            },
            //     // y: function(d){
            //     //     var point = projection([ d.geometry.coordinates[1], d.geometry.coordinates[0] ]);
            //     //     return point[1];           },
            //     "alignment-baseline": "middle",
            //     "text-anchor": "middle"
            // });

            // element.count = +element.count;



    });



    // var data = regionEvents[currentWeek].Cases;
    //
    // map_data.forEach(function(element){
    //     d3.select("#"+element.Region.replace(/\s/g, ''))
    //         .attr("opacity",0.7)
    //         .attr("cx", function(d){
    //             return path.centroid(d)[0];})
    //         .attr("cy", function(d){
    //             return path.centroid(d)[1];})
    // });


    // map_data.forEach(function(mapCircle){
    //     d3.select("#"+mapCircle.Region.replace(/\s/g, ''))
    //         .enter()
    //         .append("circle")
    //         .attr("x", function(d,i){
    //             return path.centroid(d)[0]-20;})
    //         .attr("y", function(d,i){
    //             return path.centroid(d)[1];})
    //         .attr("class", "bubble")
    //         .attr("r", radius(mapCircle.Cases));
    //
    // });


}


function convertCasesToColor(cases){

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

function convertMedicalCentresToOpacity(open){
    if(open==1){
        return 0.75;
    } else {
        return 0;
    }
}

function formatDate(date){
    var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    // return month[parseInt(date.substring(5,7))-1] + "/" + date.substring(0,4);
    return  month[parseInt(date.substring(5,7))-1] + "/" + date.substring(2,4);

}


var currentWeek=0;
generateBarChartPos('#bar_chart',PosAndNeg);
// handle on click event to switch between maps
d3.selectAll(".n")
    .on("click", function() {
        barchar = this.getAttribute("value");
        if (barchar == 'positive'){
            generateBarChartPos('#bar_chart',PosAndNeg);

        }
        if (barchar == 'negative'){
            generateBarChartNeg('#bar_chart',PosAndNeg);

        }

    });



d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
generateMap();
choro = 'tweets';
transitionMap();


// handle on click event to switch between maps
d3.selectAll(".m")
    .on("click", function() {
        choro = this.getAttribute("value");
        transitionMap();
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
            if(currentWeek>PosAndNeg.length-1){
                currentWeek=PosAndNeg.length-1;
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
    if(currentWeek>PosAndNeg.length-1){
        currentWeek=0;
    }
    d3.select("#barSelect"+currentWeek).attr("opacity",0.15);
    transitionMap();
}

var playTimer;

$(".playPause").click(function(){
    if($(".playPause").hasClass("paused")){
        playTimer = setInterval(function(){autoAdvance()}, 1000);
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








