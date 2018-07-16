var ANIMATE_DELAY = 400;
var indexes = []

var index_map = document.getElementById("map");
var marker_layer; 
var marker_2;
var client;
// var marker_group = L.layerGroup([marker_layer]);


// $(window).resize(function() {
//   $(Reveal.getCurrentSlide()).find('.content').css('top',document.body.clientHeight / 2 - ($(Reveal.getCurrentSlide()).find('.content').height() / 2));
// });

  // Initialize background map and create cartodb layers
  var map = L.map('map', {zoomControl:false}).setView([39.8283, -93.923],4)
  createCartodbLayers();

  function createCartodbLayers() {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png', {
      zoomControl:false
    }).addTo(map);

      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.dragging.disable();
      map.keyboard.disable()

    client = new carto.Client({
      apiKey: '74b4e7ddf02e8f72fe5dd16c884739049a6bb461',
      username: 'angiefromspace'
    })

    var source = new carto.source.Dataset('uscounties_rate');
    var style = new carto.style.CartoCSS(`
          #layer {
            polygon-fill: ramp([right_rate], (#deebf7, #c1d5e7, #a6c0d9, #9ecae1, #6baed6), quantiles);
          }
          #layer::outline {
            line-width: 1;
            line-color: #FFFFFF;
            line-opacity: 0.5;
          }
      `); 
    var layer = new carto.layer.Layer(source, style);
    client.addLayer(layer);
    client.getLeafletLayer().addTo(map);  
  };

  function addMarkers() {
    var client = new carto.Client({
      apiKey: '74b4e7ddf02e8f72fe5dd16c884739049a6bb461',
      username: 'angiefromspace'
    });

    var source = new carto.source.Dataset('markers_rate');
    var style = new carto.style.CartoCSS(`
          #layer {
            marker-width: 28.5;
            marker-fill: #EE4D5A;
            marker-fill-opacity: 0.9;
            marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/marker-18.svg');
            marker-allow-overlap: true;
            marker-line-width: 1;
            marker-line-color: #FFFFFF;
            marker-line-opacity: 1;
          }
          #layer::labels {
            text-name: [city];
            text-face-name: 'Open Sans Regular';
            text-size: 9;
            text-fill: #000000;
            text-label-position-tolerance: 0;
            text-halo-radius: 0;
            text-halo-fill: #6F808D;
            text-dy: -15;
            text-allow-overlap: true;
            text-placement: point;
            text-placement-type: dummy;
          }
      `); 
    marker_layer = new carto.layer.Layer(source, style);
    client.addLayer(marker_layer);
    client.getLeafletLayer().addTo(map);
  }


  function addTwoMarkers() {
    var client = new carto.Client({
      apiKey: '74b4e7ddf02e8f72fe5dd16c884739049a6bb461',
      username: 'angiefromspace'
    });
    var source = new carto.source.Dataset('markers_rate_2');
    var style = new carto.style.CartoCSS(`
          #layer {
            marker-width: 28.5;
            marker-fill: #EE4D5A;
            marker-fill-opacity: 0.9;
            marker-file: url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/marker-18.svg');
            marker-allow-overlap: true;
            marker-line-width: 1;
            marker-line-color: #FFFFFF;
            marker-line-opacity: 1;
          }
          #layer::labels {
            text-name: [city];
            text-face-name: 'Open Sans Regular';
            text-size: 9;
            text-fill: #000000;
            text-label-position-tolerance: 0;
            text-halo-radius: 0;
            text-halo-fill: #6F808D;
            text-dy: -15;
            text-allow-overlap: true;
            text-placement: point;
            text-placement-type: dummy;
          }
      `); 

    marker_2 = new carto.layer.Layer(source, style);
    client.addLayer(marker_2);
    client.getLeafletLayer().addTo(map);
  }


  function toMiami() {
    map.setView([26.570663, -79.4542226], 7)
  }

    /// Repositions CartoDB logo and hides attributions
    setTimeout(function(){
        $('#cartodb_logo').animate({
            left: 96,
            bottom: 14
        }, 300);
        $('.leaflet-control-attribution').animate({
            opacity:0
        }, 10);
      }, 10);


  // // Animate and position the content when loading a new slide
  function animateContent(event){
      // $(event.currentSlide).find('.content').css('top',document.body.clientHeight / 2 - ($(event.currentSlide).find('.content').height() / 2));
      if((event.indexh) > 0){
          $(event.currentSlide).find('.content').delay(ANIMATE_DELAY).animate({opacity: 1}, 1000);
      }
      $(event.previousSlide).find('.content').delay(ANIMATE_DELAY*2).animate({opacity: 0}, 100);
  }

  Reveal.addEventListener('slidechanged', function(event) {
    console.log(event)
    if(event.indexv == 1) {
      map.setView([39.8283, -75.923],4)
      addMarkers()
    }
    if(event.indexv == 2) {
      index_map.style.opacity = "0.9";
      toMiami()
    }
    if(event.indexv == 3) {
      index_map.style.opacity = "0";
      slide_4_viz()
    }
    if(event.indexv == 4) {
      index_map.style.opacity = "0";
      slide_5_viz()
    }
    if(event.indexv == 5) {
      addTwoMarkers()
      index_map.style.opacity = "0.9";
      map.setView([39.8283, -93.923],4)

     //  map.removeLayer(marker_layer)
     // if(map.hasLayer(marker_layer)){
     //      console.log('the map had the layer')
     //  } else {
     //    console.log("not found")
     //  }

      // console.log(map.getLayers())

      var count = 0;
      var cur_layers = [];
      map.eachLayer(function(layer) {
          if( layer instanceof L.TileLayer )
              cur_layers.push(layer);
          count++;
          console.log(layer[count])

      });
      console.log(cur_layers)
    }
    if(event.indexv == 6) {
      index_map.style.opacity = "0";
      slide_6_viz()
    }
    if(event.indexv == 9) {
      index_map.style.opacity = "0.9";
    }
    animateContent(event);
    // if(event.indexh>0){
    //     updateMap();
    //     checktimeline();
    // }
  });


function updateMap(){
  // map.fitBounds()
  // map.panTo()
//     var tour_id = $('section.present > .content > .title').attr('tour-id');
//     var sql = new cartodb.SQL({user: 'saleiva'});
//     window.pointsLayer.setSQL("SELECT *, date as date_proc, ST_asGeoJson(the_geom) as geom FROM rolling_stones WHERE tour_id="+tour_id);
//     window.linesLayer.setSQL('SELECT * FROM rolling_stones_tours WHERE cdb_id='+tour_id);

//     sql.getBounds('SELECT * FROM rolling_stones_tours WHERE cdb_id={{id}}', { 
//         id: tour_id 
//     })
//     .done(function(data) {
//         var p0 = new L.LatLng(data[0][0],data[0][1]);
//         var p1 = new L.LatLng(data[1][0],data[1][1]);
//         var bb = new L.LatLngBounds(p0,p1);
//         map.fitBounds(bb);
//     })
//     .error(function(errors) {
//         console.log("error:" + err);
//     })
}

// function searchTour(id){
//     for(i in tour_indexes){
//         if(tour_indexes[i] == id){
//             return (parseInt(i)+1);
//         }
//     }
// }

