let vz_s1_w = 800;
let vz_s1_h = 500;

///slide 4 data
var pie2 = [
 {"id":1,"category": "Atorvastatin","value": 0.40,"color": "#ae1c3a"},
{"id":2,"category": "Simvastatin","value": 0.33,"color": "#150a54"},
{"id":3,"category": "Rosuvastatin","value": 0.12,"color": "#0054a6"},
{"id":4,"category": "Pravastatin","value": 0.07,"color": "#008fd5"},
{"id":4,"category": "Lovastatin","value": 0.05,"color": "#00bce7"},
{"id":5,"category": "Ezetimibe","value": 0.02,"color": "#808080"},
{"id":5,"category": "Alirocumab","value": 0.003,"color": "#b3b3b3"},
{"id":5,"category": "Evolocumab","value": 0.002,"color": "#e6e6e6"},
{"id":5,"category": "Fluvastatin","value": 0.001,"color": "#f9c606"}
];

var pie1 = [
{"id":1,"category": "Statin Drugs","value": 0.98,"color": "#414042"},
{"id":2,"category": "Non-Statin Drugs","value": 0.02,"color": "#d1d3d4"},
];

function slide_4_viz() {
        d3.select("svg").remove();
        var width = 280;
        var height = 280;
        var donutWidth = 55;
        var radius1 = Math.min(width, height) / 2.5;
        var radius2 = radius1 - donutWidth + 50;
        
        var svg = d3.select('#chart_3')
          .append('svg')
          .attr('width', width)
          .attr('height', height);
        var svg1 = svg.append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var svg2 = svg.append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc1 = d3.svg.arc()
          .innerRadius(radius1 - donutWidth+50)  
          .outerRadius(radius1);
        var arc2 = d3.svg.arc()
          .innerRadius(radius2 - donutWidth)  
          .outerRadius(radius2);
          
        var pie = d3.layout.pie()
          .value(function(d) { return d.value; })
          .sort(null);

        var path1 = svg1.selectAll('path')
          .data(pie(pie1))
          .enter()
          .append("path")
             .attr('fill', function(d, i) { 
            return d.data.color
          })
          .text(function(d){ return (d.data.value * 100); })

          .transition().delay(function(d, i) { return i * 300; }).duration(350)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc1(d);
                 }
          });

          svg.selectAll(".label")
              .data(pie1)
              .enter().append("svg:text")
                  .attr("class", "label")
                  .attr("text-anchor", "end")
                  .style("font-size", "25px")
                  .text(function(d) {
                    console.log(d);
                      return ((d.value)*100) + "%";
                  })
                  .attr("transform", function(d){ 
                    if(d.value == 0.98) {
                      return "translate(" + ["75,50"] +")"; 
                    } else {
                      return "translate(" + ["150,20"] +")"; 
                    }
                  })

            svg.selectAll(".centerlabel")
              .data(pie1)
              .enter().append("svg:text")
                  .attr("class", "label")
                  .attr("text-anchor", "end")
                  .style("font-size", "20px")
                  .text(function(d) {
                    console.log(d);
                      return "Drug Share";
                  })  
                  .attr("y", function(d) {
                    return 150;
                  })
                  .attr("x", function(d) {
                    return 188;
                  }); 


        var path2 = svg2.selectAll('path')
          .data(pie(pie2))
          .enter()
          .append("path")
             .attr('fill', function(d, i) { 
            return d.data.color
          })
          .transition().delay(function(d, i) { return i * 300; }).duration(350)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc2(d);
                 }
            });
}




var bars1 = [
   {"id":1,"category": "Artery","value": 186,"scaled": .09,"color": "#808080"},
  {"id":2,"category": "Cerebrovascular","value": 219,"scaled": .11,"color": "#808080"},
  {"id":3,"category": "Coronary","value": 240,"scaled": .15,"color": "#808080"},
  {"id":4,"category": "Ischemic","value": 0,"scaled": 0,"color": "#808080"},
  {"id":4,"category": "Myocardial","value": 650,"scaled": .34,"color": "#930000"},
  {"id":5,"category": "Peripheral","value": 638,"scaled": .32,"color": "#808080"},
  {"id":5,"category": "Stroke","value": 0,"scaled": 0,"color": "#808080"}
];
var bars1_2 = [
   {"id":1,"category": "Artery","value": 154957,"scaled": .12,"color": "#808080"},
  {"id":2,"category": "Cerebrovascular","value": 153067,"scaled": .12,"color": "#808080"},
  {"id":3,"category": "Coronary","value": 339977,"scaled": .27,"color": "#930000"},
  {"id":4,"category": "Ischemic","value": 0,"scaled": 0,"color": "#808080"},
  {"id":4,"category": "Myocardial","value": 331086,"scaled": .26,"color": "#808080"},
  {"id":5,"category": "Peripheral","value": 296029,"scaled": .23,"color": "#808080"},
  {"id":5,"category": "Stroke","value": 0,"scaled": 0,"color": "#808080"}
];

//slide 5
function slide_5_viz() {
  d3.selectAll("svg").remove();

   var margin = {top: 15, right: 20, bottom: 15, left:120},
    axisMargin = 10,
      height =  200- margin.top - margin.bottom,
      width = 350 - margin.left - margin.right;

    var svg = d3.select("#chart_4_1")
      .append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'svg_id')
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scale.ordinal().rangeRoundBands([0, height], .2);
    var x = d3.scale.linear().rangeRound([0, width]);
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .outerTickSize(0)
        .innerTickSize(0)
        .orient("left");

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .innerTickSize(0)
        .outerTickSize(1)
        .tickValues(d3.range(0, 1.0, .2))
        .tickPadding(5);

      svg.selectAll("*").remove();

      var total = 0;

      y.domain(bars1.map(function(d) { return d.category; }));
      x.domain([0, 1]);

      svg.selectAll('g.axis').remove();
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .attr("fill", "black")
          .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size","12px")
            .attr("dx", "1.3em")
            .attr("dy", ".5em");

      svg.append("g")
          .attr("class", "y axis")
          .attr("fill", "black")
          .call(yAxis)
          .selectAll(".tick text")
            // .call(wrap, y.rangeBand())
          ;

      svg.append("text")
          .attr("class", "title")
          .style("font-size","15px")  
          .attr("y", height + 20)
          .attr("x", 125)
          .attr("dy", ".6em")
          .style("font-size", "15px")
          .style("text-anchor", "end")
          .attr("fill", "#000");
          // .text(type);
          
      var max=98;

      var bars = svg.selectAll(".bar")
          .data(bars1)
          .enter().append("rect")
          .style("fill", function(d) { return d.color; })
          .attr("y", function(d) { return y(d.category); })
          .attr("height", y.rangeBand())
          .attr("x", 2)
          .attr("width", 0) // initial width of 0 for transition
          .transition()
              .duration(1000) // time of duration
              .attr("width", function(d){
                return x(d.scaled);
              }); // width based on scale

      svg.selectAll("rect")
        .data(bars1)
        .enter()
        .append("text")
        .attr("y", y.rangeBand() / 2)
        .attr("x", function(d) { return (d.scaled ); })
        .style("text-anchor", "middle")
        .text(function(d) {return (d.category ); });


      // svg.selectAll(".label")
      //     .data(data)
      //     .enter()
      //         .append("svg:text")
      //         .attr("class", "label")
      //         .style("font-size", "15px")
      //         .attr("text-anchor", "end")
      //         .attr("y", function(d) {
      //             return y(d.rx_behavior) + (y.rangeBand() / 2 + 5) ;
      //         })
      //         .attr("x", function(d) {
      //             return x(d.scaled) + 45;
      //         })
      //         .text(function(d) {
      //             return (d.scaled * 100) + "%";
      //         });


      d3.selectAll("svg2").remove();

     var margin = {top: 15, right: 20, bottom: 15, left:120},
    axisMargin = 10,
      height =  200- margin.top - margin.bottom,
      width = 350 - margin.left - margin.right;


    var svg2 = d3.select("#chart_4_2")
      .append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'svg_id')
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scale.ordinal().rangeRoundBands([0, height], .2);
    var x = d3.scale.linear().rangeRound([0, width]);
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .outerTickSize(0)
        .innerTickSize(0)
        .orient("left");

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .innerTickSize(0)
        .outerTickSize(1)
        .tickValues(d3.range(0, 1.0, .2))
        .tickPadding(5);

      var total = 0;

      y.domain(bars1_2.map(function(d) { return d.category; }));
      x.domain([0, 1]);

      svg2.selectAll('g.axis').remove();
      svg2.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .attr("fill", "black")
          .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size","12px")
            .attr("dx", "1.3em")
            .attr("dy", ".5em");

      svg2.append("g")
          .attr("class", "y axis")
          .attr("fill", "black")
          .call(yAxis)
          .selectAll(".tick text")
            // .call(wrap, y.rangeBand())
          ;

      svg2.append("text")
          .attr("class", "title")
          .style("font-size","15px")  
          .attr("y", height + 20)
          .attr("x", 125)
          .attr("dy", ".6em")
          .style("text-anchor", "end")
          .attr("fill", "#000");
          // .text(type);
          
      var max=98;

      var bars = svg2.selectAll(".bar")
          .data(bars1_2)
          .enter().append("rect")
          .style("fill", function(d) { return d.color; })
          .attr("y", function(d) { return y(d.category); })
          .attr("height", y.rangeBand())
          .attr("x", 2)
          .attr("width", 0) // initial width of 0 for transition
          .transition()
              .duration(1000) // time of duration
              .attr("width", function(d){
                return x(d.scaled);
              }); // width based on scale

      svg2.selectAll("rect")
        .data(bars1_2)
        .enter()
        .append("text")
        .attr("y", y.rangeBand() / 2)
        .attr("x", function(d) { return (d.scaled ); })
        .style("text-anchor", "middle")
        .text(function(d) {return (d.category ); });

}



///slide 6 data
var pie4 = [
 {"id":1,"category": "Atorvastatin","value": 0.49,"color": "#ae1c3a"},
{"id":2,"category": "Simvastatin","value": 0.29,"color": "#150a54"},
{"id":3,"category": "Rosuvastatin","value": 0.05,"color": "#0054a6"},
{"id":4,"category": "Pravastatin","value": 0.07,"color": "#008fd5"},
{"id":4,"category": "Lovastatin","value": 0.07,"color": "#00bce7"},
{"id":5,"category": "Ezetimibe","value": 0.02,"color": "#808080"},
{"id":5,"category": "Alirocumab","value": 0.003,"color": "#b3b3b3"},
{"id":5,"category": "Evolocumab","value": 0.001,"color": "#e6e6e6"},
{"id":5,"category": "Fluvastatin","value": 0.01,"color": "#f9c606"}
];
var pie3 = [
{"id":1,"category": "Statin Drugs","value": 0.98,"color": "#414042"},
{"id":2,"category": "Non-Statin Drugs","value": 0.02,"color": "#d1d3d4"},
];
var bars6 = [
   {"id":1,"category": "Artery","value": 137,"scaled": .18,"color": "#808080"},
  {"id":2,"category": "Cerebrovascular","value": 11,"scaled": .01,"color": "#808080"},
  {"id":3,"category": "Coronary","value": 210,"scaled": .28,"color": "#808080"},
  {"id":4,"category": "Ischemic","value": 17,"scaled": .02,"color": "#808080"},
  {"id":4,"category": "Myocardial","value": 208,"scaled": .27,"color": "#930000"},
  {"id":5,"category": "Peripheral","value": 155,"scaled": .20,"color": "#808080"},
  {"id":5,"category": "Stroke","value": 17,"scaled": .02,"color": "#808080"}
];
var bars6_2 = [
   {"id":1,"category": "Artery","value": 246346,"scaled": .20,"color": "#808080"},
  {"id":2,"category": "Cerebrovascular","value": 14644,"scaled": .01,"color": "#808080"},
  {"id":3,"category": "Coronary","value": 608424,"scaled": .50,"color": "#930000"},
  {"id":4,"category": "Ischemic","value": 16897,"scaled": .01,"color": "#808080"},
  {"id":4,"category": "Myocardial","value": 181409,"scaled": .15,"color": "#808080"},
  {"id":5,"category": "Peripheral","value": 145466,"scaled": .12,"color": "#808080"},
  {"id":5,"category": "Stroke","value": 16897,"scaled": .01,"color": "#808080"}
];

function slide_6_viz() {
        d3.selectAll("svg").remove();
        var width = 200;
        var height = 200;
        var donutWidth = 55;
        var radius1 = Math.min(width, height) / 2.5;
        var radius2 = radius1 - donutWidth + 50;
        
        var svg = d3.select('#chart_6')
          .append('svg')
          .attr('width', width)
          .attr('height', height);
        var svg1 = svg.append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var svg2 = svg.append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc1 = d3.svg.arc()
          .innerRadius(radius1 - donutWidth+50)  
          .outerRadius(radius1);
        var arc2 = d3.svg.arc()
          .innerRadius(radius2 - donutWidth)  
          .outerRadius(radius2);
          
        var pie = d3.layout.pie()
          .value(function(d) { return d.value; })
          .sort(null);

        var path1 = svg1.selectAll('path')
          .data(pie(pie3))
          .enter()
          .append("path")
             .attr('fill', function(d, i) { 
            return d.data.color
          })
          .text(function(d){ return (d.data.value * 100); })

          .transition().delay(function(d, i) { return i * 300; }).duration(350)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc1(d);
                 }
          });

          svg.selectAll(".label")
              .data(pie3)
              .enter().append("svg:text")
                  .attr("class", "label")
                  .attr("text-anchor", "end")
                  .style("font-size", "25px")
                  .text(function(d) {
                    console.log(d);
                      return ((d.value)*100) + "%";
                  })
                  .attr("transform", function(d){ 
                    if(d.value == 0.98) {
                      return "translate(" + ["75,30"] +")"; 
                    } else {
                      return "translate(" + ["150,10"] +")"; 
                    }
                  })

            svg.selectAll(".centerlabel")
              .data(pie3)
              .enter().append("svg:text")
                  .attr("class", "label")
                  .attr("text-anchor", "end")
                  .style("font-size", "20px")
                  .text(function(d) {
                    console.log(d);
                      // return "Drug Share";
                  })  
                  .attr("y", function(d) {
                    return 150;
                  })
                  .attr("x", function(d) {
                    return 188;
                  }); 


        var path2 = svg2.selectAll('path')
          .data(pie(pie4))
          .enter()
          .append("path")
             .attr('fill', function(d, i) { 
            return d.data.color
          })
          .transition().delay(function(d, i) { return i * 300; }).duration(350)
            .attrTween('d', function(d) {
                 var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                 return function(t) {
                     d.endAngle = i(t);
                   return arc2(d);
                 }
            });

    function slide_62_viz() {
      // d3.selectAll("svg").remove();
    var margin = {top: 15, right: 20, bottom: 15, left:120},
        axisMargin = 10,
          height =  180- margin.top - margin.bottom,
          width = 270 - margin.left - margin.right;

        var svg = d3.select("#chart_6_2")
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .attr('id', 'svg_id')
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var y = d3.scale.ordinal().rangeRoundBands([0, height], .2);
        var x = d3.scale.linear().rangeRound([0, width]);
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .outerTickSize(0)
            .innerTickSize(0)
            .orient("left");

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .innerTickSize(0)
            .outerTickSize(1)
            .tickValues(d3.range(0, 1.0, .2))
            .tickPadding(5);

          svg.selectAll("*").remove();

          var total = 0;

          y.domain(bars1.map(function(d) { return d.category; }));
          x.domain([0, 1]);

          svg.selectAll('g.axis').remove();
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .attr("fill", "black")
              .call(xAxis)
              .selectAll("text")
                .style("text-anchor", "end")
                .style("font-size","12px")
                .attr("dx", "1.3em")
                .attr("dy", ".5em");

          svg.append("g")
              .attr("class", "y axis")
              .attr("fill", "black")
              .call(yAxis)
              .selectAll(".tick text")
                // .call(wrap, y.rangeBand())
              ;

          svg.append("text")
              .attr("class", "title")
              .style("font-size","15px")  
              .attr("y", height + 20)
              .attr("x", 125)
              .attr("dy", ".6em")
              .style("font-size", "15px")
              .style("text-anchor", "end")
              .attr("fill", "#000");
              // .text(type);
              
          var max=98;

          var bars = svg.selectAll(".bar")
              .data(bars1)
              .enter().append("rect")
              .style("fill", function(d) { return d.color; })
              .attr("y", function(d) { return y(d.category); })
              .attr("height", y.rangeBand())
              .attr("x", 2)
              .attr("width", 0) // initial width of 0 for transition
              .transition()
                  .duration(1000) // time of duration
                  .attr("width", function(d){
                    return x(d.scaled);
                  }); // width based on scale

          svg.selectAll("rect")
            .data(bars1)
            .enter()
            .append("text")
            .attr("y", y.rangeBand() / 2)
            .attr("x", function(d) { return (d.scaled ); })
            .style("text-anchor", "middle")
            .text(function(d) {return (d.category ); });


          // svg.selectAll(".label")
          //     .data(data)
          //     .enter()
          //         .append("svg:text")
          //         .attr("class", "label")
          //         .style("font-size", "15px")
          //         .attr("text-anchor", "end")
          //         .attr("y", function(d) {
          //             return y(d.rx_behavior) + (y.rangeBand() / 2 + 5) ;
          //         })
          //         .attr("x", function(d) {
          //             return x(d.scaled) + 45;
          //         })
          //         .text(function(d) {
          //             return (d.scaled * 100) + "%";
          //         });


          d3.selectAll("svg2").remove();

         var margin = {top: 15, right: 20, bottom: 15, left:120},
        axisMargin = 10,
          height =  180- margin.top - margin.bottom,
          width = 270 - margin.left - margin.right;


        var svg2 = d3.select("#chart_6_3")
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .attr('id', 'svg_id')
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var y = d3.scale.ordinal().rangeRoundBands([0, height], .2);
        var x = d3.scale.linear().rangeRound([0, width]);
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .outerTickSize(0)
            .innerTickSize(0)
            .orient("left");

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .innerTickSize(0)
            .outerTickSize(1)
            .tickValues(d3.range(0, 1.0, .2))
            .tickPadding(5);

          var total = 0;

          y.domain(bars1_2.map(function(d) { return d.category; }));
          x.domain([0, 1]);

          svg2.selectAll('g.axis').remove();
          svg2.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .attr("fill", "black")
              .call(xAxis)
              .selectAll("text")
                .style("text-anchor", "end")
                .style("font-size","12px")
                .attr("dx", "1.3em")
                .attr("dy", ".5em");

          svg2.append("g")
              .attr("class", "y axis")
              .attr("fill", "black")
              .call(yAxis)
              .selectAll(".tick text")
                // .call(wrap, y.rangeBand())
              ;

          svg2.append("text")
              .attr("class", "title")
              .style("font-size","15px")  
              .attr("y", height + 20)
              .attr("x", 125)
              .attr("dy", ".6em")
              .style("text-anchor", "end")
              .attr("fill", "#000");
              // .text(type);
              
          var max=98;

          var bars = svg2.selectAll(".bar")
              .data(bars1_2)
              .enter().append("rect")
              .style("fill", function(d) { return d.color; })
              .attr("y", function(d) { return y(d.category); })
              .attr("height", y.rangeBand())
              .attr("x", 2)
              .attr("width", 0) // initial width of 0 for transition
              .transition()
                  .duration(1000) // time of duration
                  .attr("width", function(d){
                    return x(d.scaled);
                  }); // width based on scale

          svg2.selectAll("rect")
            .data(bars1_2)
            .enter()
            .append("text")
            .attr("y", y.rangeBand() / 2)
            .attr("x", function(d) { return (d.scaled ); })
            .style("text-anchor", "middle")
            .text(function(d) {return (d.category ); });
       
    }
    slide_62_viz()


}



















