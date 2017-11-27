window.onload = function () {

var chart = new CanvasJS.Chart("line_chart", {
  animationEnabled: true,
  backgroundColor: "rgba(255,255,255,0)",
  title: {
    text: "Changing dynamic of chatter",
    fontFamily: "tahoma",
    fontSize: 18,
  },
  axisX: {
    valueFormatString: "YY-MM" ,
    labelFontSize: 10,
    minimum: new Date(2017,1),
    maximum: new Date(2017,7),
  },
  axisY: {
    minimum: -1,
    valueFormatString: "#%",
    gridThickness: 0.1,
    labelFontSize: 9,
    tickLength: 3
  },
  legend: {
    verticalAlign: "top",
    horizontalAlign: "right",
    
    // dockInsidePlotArea: true
  },
  toolTip: {
    shared: true,
    fontFamily: "tahoma",
    fontSize: 11,
  },
  data: [{
    name: "Received",
    showInLegend: true,
    legendMarkerType: "square",
    type: "splineArea",
    color: "rgba(239,129,40,0.6)",
    markerSize: 0,
    dataPoints: [
      { x: new Date(2017,1), y: -1 },
      { x: new Date(2017, 2), y: -0.5 },
      { x: new Date(2017, 3), y: 0.6 },
      { x: new Date(2017, 4), y: 0.2 },
      { x: new Date(2017, 5), y: -0.4 },
      { x: new Date(2017, 6), y: -0.1 },
      { x: new Date(2017, 7), y: 0 }
    ]
  },
  {
    name: "Sent",
    showInLegend: true,
    legendMarkerType: "square",
    type: "splineArea",
    color: "rgba(149,205,221,0.7)",
    markerSize: 0,
    dataPoints: [
      { x: new Date(2017, 1), y: 0.2 },
      { x: new Date(2017, 2), y: 0.1 },
      { x: new Date(2017, 3), y: 0.3},
      { x: new Date(2017, 4), y: 0.6 },
      { x: new Date(2017, 5), y: 0.1},
      { x: new Date(2017, 6), y: 0.2 },
      { x: new Date(2017, 7), y: 0.1 }
    ]
  }]
});
chart.render();

}