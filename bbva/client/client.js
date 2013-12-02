// All Tomorrow's Parties -- client

// Meteor.subscribe("restaurantes");


// If no party selected, or if the selected party was deleted, select one.
Meteor.startup(function () {
  
    Meteor.subscribe("restaurantes", function(){ 
      total=Restaurants.find({}).count();
      Session.set('total',total);
      
      });

      

  //console.log('empezando');
  
  Meteor.subscribe('estadisticas');
  Meteor.subscribe('genero');
  Meteor.subscribe('heat');
  Session.set('nombre',"BBVA DATATHON (seleccione un restaurante en el mapa)");
  Session.set('posicion',0)
  Session.set('opiniones',0)
  Session.set('puntuacion',0)
  Session.set('demografia',0)
  Session.set('gasto',0);
  Session.set('dia',0);
  Session.set('hora',0);
  Session.set('gasto_medio',0);
  Session.set('transacciones',0);
  Session.set('ticket',0);

  //heats= Heat.find().fetch();

 /*  heat_data={
    max:100,
    data:[]
  };
  var media=[];

 Heat.find().forEach(function(punto){
    var latitud=0;
    var longitud=0;
    console.log('hola')

    Restaurants.find({'codigo':punto['_id']}).forEach(function(punto){
      console.log(punto);
      latitud=punto['geo'][0];
      longitud=punto['geo'][1];
    });

    heat_data.data.push({'lat':latitud,'lon':longitud,'value':punto['value']});


  }); */

 /* heat_data={
    max:100,
    data:[]
  };
  var media=[];

 Heat.find().forEach(function(punto){
    var latitud=0;
    var longitud=0;
    console.log('hola')

    Restaurants.find({'codigo':punto['_id']}).forEach(function(punto){
      console.log(punto);
      latitud=punto['geo'][0];
      longitud=punto['geo'][1];
    });

    heat_data.data.push({'lat':latitud,'lon':longitud,'value':punto['value']});



  }); */

/*
Array.prototype.avg1 = function() {
var av = 0;
var cnt = 0;
var len = this.length;
for (var i = 0; i < len; i++) {
var e = +this[i];
if(!e && this[i] !== 0 && this[i] !== '0') e--;
if (this[i] == e) {av += e; cnt++;}
}
return av/cnt;
}

  Restaurants.find({},{'codigo':1}).forEach(function(punto){
    var latitud=punto['geo'][0];
    var longitud=punto['geo'][1];
    console.log(punto['codigo']);
    Estadisticas.find({'codigo':punto['codigo']}).forEach(function(punto){
        console.log(punto);
         media=[];
         if(punto['days'].length>1){
          for(var i=0; i<punto['days'].length;i++){
            media.push(punto['days']['avg']);
          }
         }
         else {
          media.push(0);
         }
         

         
    });
    var value= media.avg1();
    heat_data.data.push({'lat':latitud,'lon':longitud,'value':value});

  }); */

});

///////////////////////////////////////////////////////////////////////////////
// Party details sidebar

Template.page.rendered = function () {
                            
 var testData={
        max: 20,
        data: [{"lat": 40.423237, "lon": -3.714588, "value": 35.42880952380953}, {"lat": 40.41182, "lon": -3.69428, "value": 20.231190476190474}, {"lat": 40.41746, "lon": -3.71112, "value": 25.980714285714285}, {"lat": 40.42562, "lon": -3.71665, "value": 35.42880952380953}, {"lat": 40.4132, "lon": -3.69916, "value": 37.63666666666666}, {"lat": 40.43491, "lon": -3.71319, "value": 26.587142857142855}, {"lat": 40.42206, "lon": -3.70253, "value": 31.905}, {"lat": 0, "lon": 0, "value": 1}, {"lat": 40.4181, "lon": -3.69111, "value": 21.230952380952377}, {"lat": 40.41324, "lon": -3.70842, "value": 25.980714285714285}, {"lat": 40.41487, "lon": -3.70269, "value": 23.63690476190476}, {"lat": 40.42076, "lon": -3.679, "value": 29.77785714285714}, {"lat": 40.41967, "lon": -3.70938, "value": 19.39904761904762}, {"lat": 40.46343, "lon": -3.69363, "value": 27.39920634920635}, {"lat": 40.41973, "lon": -3.70914, "value": 19.39904761904762}, {"lat": 40.41005, "lon": -3.69617, "value": 20.231190476190474}, {"lat": 40.42651, "lon": -3.71648, "value": 35.42880952380953}, {"lat": 40.42038, "lon": -3.7003, "value": 23.26404761904762}, {"lat": 40.4329, "lon": -3.695775, "value": 25.24666666666667}, {"lat": 40.46304, "lon": -3.59216, "value": 1}, {"lat": 40.42806, "lon": -3.69083, "value": 48.00369047619048}]
      };



/* heat_data={
    max:100,
    data:[]
  };
  var media=[];

 Heat.find().forEach(function(punto){
    var latitud=0;
    var longitud=0;
    console.log('hola')

    Restaurants.find({'codigo':punto['_id']}).forEach(function(punto){
      console.log(punto);
      latitud=punto['geo'][0];
      longitud=punto['geo'][1];
    });

    heat_data.data.push({'lat':latitud,'lon':longitud,'value':punto['value']});



  });  */


 
 
 

 var baseLayer= L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
         })

  var heatmapLayer = L.TileLayer.heatMap({
          radius: 20,
          opacity: 0.8,
          gradient: {
            0.45: "rgb(0,0,255)",
            0.55: "rgb(0,255,255)",
            0.65: "rgb(0,255,0)",
            0.95: "yellow",
            1.0: "rgb(255,0,0)"
          }
        });



        heatmapLayer.addData(testData.data);

        var overlayMaps = {
          'Heatmap': heatmapLayer
        };

        var controls = L.control.layers(null, overlayMaps, {collapsed: false});

        var map = new L.Map('map',{
          layers: [baseLayer, heatmapLayer]}); 
         /*var baseLayer= L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
         }).addTo(map);*/

  map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

  var madrid = new L.LatLng(40.42651, -3.71648); 
  map.setView(madrid, 13);
  controls.addTo(map);

  markers =  new L.LayerGroup().addTo(map);




  var popup= L.popup();

  var greenIcon = L.icon({
                        iconUrl: 'images/gourmet.png'

                  });

 

  //point1 = L.marker([40.46304,-3.59216 ],{icon: greenIcon}).addTo(map);
  //markers1.addLayer(point1);
  




  //query=Restaurants.find({});
  query=Restaurants.find({});


  
  
  
  query.observeChanges({
    added: function (id,restaurante){

                

                // point.bi{icon:redIcon}ndPopup('<b><h1>'+hotel.nombre +'</h1></b><h2><em>'+hotel.categoria +' estrellas</em></h2><h3><em>Opinión: '+hotel.reputacion +' </h3><h3>Precio: '+ hotel.precio_minimo +'</em></h3>');
      point = L.marker([restaurante.geo[0], restaurante.geo[1]],{icon:greenIcon}).on('click',Onclick);
      //point= new MyCustomMarker([restaurante.geo[0], restaurante.geo[1]],{icon:greenIcon});
      //point.bindPopup('<b><h2>'+restaurante.nombre +'</h2></b><div class="row" id="spin" ><div class="span12"><h4>LA CARGA DE LOS DATOS PUEDE TARDAR UNOS SEGUNDOS. ESPERE PARA VER LOS GRÁFICOS</h4></div></div><div class="row"><div class="span12" style="text-align:center"><div id="chart2"><svg></svg></div></div></div>'
      //            );
            //      );

      point.bindPopup('<div class="row"><div class="span6"><div class="title" style="text-align:center"><h4>Gasto medio por hora del día</h4></div><div id="chart2"><svg></svg></div></div><div class="span6"><div class="title" style="text-align:center"><h4>Gasto medio por grupo demográfico</h4></div><div id="chart1"><svg></svg></div></div></div><div><h3>El radio de cada círculo en ambas gráficas representa el número de transaciones realizadas con el objetivo de realizar un "pesado" del gasto medio. Puede interactuar con el gráfico selecionando un punto en concreto o bien clickando sobre los puntos en las leyendas para activar o desactivar categorías.</h3></div>');

      //<canvas id="myChart" width="100" height="100"></canvas>
      //<div id="chart2"><svg></svg></div>
      //<canvas id="canvas" height="250" width="400"></canvas>
      //<div id="graph" class="aGraph" style="position:absolute;top:0px;left:0; float:left;"></div>
      point.nombre=restaurante.nombre;
      point.opiniones=restaurante.opiniones;
      point.puntuacion=restaurante.puntuacion;
      point.rank=restaurante.rank;
      point.codigo=restaurante.codigo;
      markers.addLayer(point);
      map.addLayer(markers);


    },
      removed: function(){

      }

  });

    function Onclick(e){
      console.log(e)
      marker = e.target;
        console.log(marker.nombre);
        Session.set('nombre',marker.nombre);
        Session.set('posicion',marker.rank);
        Session.set('opiniones',marker.opiniones);
        Session.set('puntuacion',marker.puntuacion);
        Session.set('codigo',marker.codigo);

    }


  //popupopen

   map.on('popupopen', function(e){
        //console.log(e)
        //marker = e.popup_source;
        //console.log(marker.nombre);
        //Session.set('nombre',marker.nombre);
        //Session.set('posicion',marker.rank);
        //Session.set('total',marker.opiniones)
         lineChartData = {
                  labels : ["January","February","March","April","May","June","July"],
                  datasets : [
                    {
                      fillColor : "rgba(220,220,220,0.5)",
                      strokeColor : "rgba(220,220,220,1)",
                      pointColor : "rgba(220,220,220,1)",
                      pointStrokeColor : "#fff",
                      data : [65,59,90,81,56,55,40]
                    }
                  ]
                };
       
       // var myLine = new Chart(document.getElementById("myChart").getContext("2d")).Line(lineChartData); 
         /*  var lineChartData = {
                        labels : ["January","February","March","April","May","June","July"],
                        datasets : [
                                {
                                        fillColor : "rgba(220,220,220,0.5)",
                                        strokeColor : "rgba(220,220,220,1)",
                                        pointColor : "rgba(220,220,220,1)",
                                        pointStrokeColor : "#fff",
                                        data : [65,59,90,81,56,55,40]
                                },
                                {
                                        fillColor : "rgba(151,187,205,0.5)",
                                        strokeColor : "rgba(151,187,205,1)",
                                        pointColor : "rgba(151,187,205,1)",
                                        pointStrokeColor : "#fff",
                                        data : [28,48,40,19,96,27,100]
                                }
                        ]
                        
                }*/


        


            

            
            var opts = {
              lines: 13, // The number of lines to draw
              length: 20, // The length of each line
              width: 10, // The line thickness
              radius: 30, // The radius of the inner circle
              corners: 1, // Corner roundness (0..1)
              rotate: 0, // The rotation offset
              direction: 1, // 1: clockwise, -1: counterclockwise
              color: '#000', // #rgb or #rrggbb or array of colors
              speed: 1, // Rounds per second
              trail: 60, // Afterglow percentage
              shadow: false, // Whether to render a shadow
              hwaccel: false, // Whether to use hardware acceleration
              className: 'spinner', // The CSS class to assign to the spinner
              zIndex: 2e9, // The z-index (defaults to 2000000000)
              top: 'auto', // Top position relative to parent in px
              left: 'auto' // Left position relative to parent in px
            };
            //var target = document.getElementById('spin');
            //var spinner = new Spinner(opts).spin(target);

            function stats(){

                var estadisticas=[];
                dat=[];

                estadistica=Estadisticas.find({'codigo':marker.codigo}).forEach(function(punto){
                  //console.log(punto)
                  punto['days'].forEach(function(punt){
                    var dia=punt['day'];
                    punt['hours'].forEach(function(horas){
                      //console.log(horas['hour']);
                      if (horas['hour']=='00'){
                        horas['hour']='24';
                        estadisticas.push([dia,horas['hour'],horas['avg'],horas['num_payments']]);
                      }
                      else{
                        estadisticas.push([dia,horas['hour'],horas['avg'],horas['num_payments']]);
                        //lineChartData['datasets'][0]['data'].push(horas['avg']);
                      }
                    });


                  });

                  

                



                //console.log(estadisticas);

                
                });

               // var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData,{ showTooltips: true }); 


                var sem_days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

                for (i = 0; i <sem_days.length; i++) {
                    dat.push({
                        key: sem_days[i],
                        values: []

                    });
                  }

                for (j=0;j<estadisticas.length;j++){
                    if(estadisticas[j][0]=='Monday'){
                      dat[0].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Tuesday'){
                      dat[1].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Wednesday'){
                      dat[2].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Thursday'){
                      dat[3].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Friday'){
                      dat[4].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Saturday'){
                      dat[5].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Sunday'){
                      dat[6].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }

                  }
                  //spinner.stop();
                  var  total=[]

                  for (var i=0;i<dat.length;i++){
                    var suma=0;
                    for(var j=0;j<dat[i]['values'].length;j++){
                      suma=suma+ dat[i]['values'][j]['y']*dat[i]['values'][j]['size']
                    }
                    total.push(suma);
                  }

                  var max_of_array = Math.max.apply(Math, total);

                  //console.log(max_of_array);

                  var index = total.indexOf(max_of_array);
                  //Session.set('dia',total[index]);
                  //console.log(index);
                  switch(index){
                     case 0:
                      key1= 'Monday'
                      break;
                    case 1:
                      key1=  'Tuesday'
                      break;
                    case 2:
                      key1=  'Wednesday'
                      break;
                    case 3:
                      key1=  'Thursday'
                      break;
                    case 4:
                      key1=  'Friday'
                      break;
                    case 5:
                      key1=  'Saturday'
                      break;
                    case 6:
                      key1=  'Sunday'
                      break;
                    default:
                      key1= 'Unknown'

                  }
                  Session.set('dia',key1);

                  //console.log('entramos horas')

                  var suma_total=0;
                  var transacciones=0;

                  var horas=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                  for(var i=0;i<dat.length;i++){
                    for(var j=0;j<dat[i]['values'].length;j++){
                      //console.log(parseInt(dat[i]['values'][j]['x']))
                      //console.log('-----')
                      suma_total=suma_total + dat[i]['values'][j]['y']*dat[i]['values'][j]['size'];
                      transacciones=transacciones+dat[i]['values'][j]['size']
                      horas[parseInt(dat[i]['values'][j]['x'])]= horas[parseInt(dat[i]['values'][j]['x'])] + dat[i]['values'][j]['y']*dat[i]['values'][j]['size']
                    }
                  }
                  var ticket_medio= (suma_total/transacciones);
                  Session.set('ticket', ticket_medio.toFixed(2));
                  Session.set('gasto_medio',suma_total.toFixed(2));
                  Session.set('transacciones',transacciones);

                  for(var i=0;i<horas.length;i++){
                    if (isNaN(horas[i])){
                      horas[i]=0;
                    }
                  }

                  var max_of_hours = Math.max.apply(Math, horas);

                  //console.log(horas);

                  var index = horas.indexOf(max_of_hours);
                 // console.log(index)


                  switch(index){
                     case 0:
                      key2= '0:00 horas'
                      break;
                    case 1:
                      key2=  '1:00 horas'
                      break;
                    case 2:
                      key2=  '2:00 horas'
                      break;
                    case 3:
                      key2=  '3:00 horas'
                      break;
                    case 4:
                      key2=  '4:00 horas'
                      break;
                    case 5:
                      key2=  '5:00 horas'
                      break;
                    case 6:
                      key2=  '6:00 horas'
                      break;
                    case 7:
                      key2=  '7:00 horas'
                      break;
                    case 8:
                      key2=  '8:00 horas'
                      break;
                    case 9:
                      key2=  '9:00 horas'
                      break;
                    case 10:
                      key2=  '10:00 horas'
                      break;
                    case 11:
                      key2=  '11:00 horas'
                      break;
                    case 12:
                      key2=  '12:00 horas'
                      break;
                    case 13:
                      key2=  '13:00 horas'
                      break;
                    case 14:
                      key2=  '14:00 horas'
                      break;
                    case 15:
                      key2=  '15:00 horas'
                      break;
                    case 16:
                      key2=  '16:00 horas'
                      break;
                    case 17:
                      key2=  '17:00 horas'
                      break;
                    case 18:
                      key2=  '18:00 horas'
                      break;
                    case 19:
                      key2=  '19:00 horas'
                      break;
                    case 20:
                      key2=  '20:00 horas'
                      break;
                    case 21:
                      key2=  '21:00 horas'
                      break;
                    case 22:
                      key2=  '22:00 horas'
                      break;
                    case 23:
                      key2=  '23:00 horas'
                      break;
                    default:
                      key2= 'Unknown'

                  }
                  Session.set('hora',key2);


                  return dat

            }
            



            
            function randomData(groups, points) { //# groups,# points per group
                var data = [],
                     shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                     random = d3.random.normal();
               
                 for (i = 0; i < groups; i++) {
                   data.push({
                     key: 'Group ' + i,
                     values: []
                   });
               
                   for (j = 0; j < points; j++) {
                     data[i].values.push({
                       x: random()
                     , y: random()
                     , size: Math.random()
                     //, shape: shapes[j % 6]
                     });
                   }
                 }
               
                 return data;
               }


           nv.addGraph(function() {
                var chart = nv.models.scatterChart()
                              .showDistX(true)
                              .showDistY(true)
                              .color(d3.scale.category10().range());
              
                chart.xAxis.axisLabel('Hora del día').tickFormat(d3.format('.02f'))
                chart.yAxis.axisLabel('Gasto medio').tickFormat(d3.format('.02f'))

                chart.tooltipContent(function (key, y, e, graph) {
                    var x = String(graph.point.x);
                    var y = String(graph.point.y);
                    //if (key == 'Huelva') {
                    var y = ' Cantidad media:<b>' + String(graph.point.y)+'</b>';
                   

                    //tooltip_str = '<center><b>' + key1 + '</b></center>' + y;
                    tooltip_str = '<center><b>' + key + '</b></center>';
                    return tooltip_str;
                });

              
              
               d3.select('#chart2 svg')
                   .datum(stats())
                 .transition().duration(500)
                   .call(chart);
             
               nv.utils.windowResize(chart.update);
             
               return chart;
             });

           // stats();
           function genero(){

                generos=[];
                dati=[];



                genero=Genero.find({'codigo':marker.codigo}).forEach(function(punto){
                  console.log(punto)
                  var date= punto['date'];
                  punto['datos'].forEach(function(punt){
                    console.log(punt['avg'])
                    generos.push([date,punt['avg'],punt['num_payments'],punt['hash']])
                    
                    });


                  });
                console.log(generos);

                var months=['November','December','January','February','March','April']

                var november= new Date("2012-11-01T00:00:00Z");
                var december= new Date("2012-12-01T00:00:00Z");
                var january =new Date("2013-01-01T00:00:00Z");
                var february= new Date("2013-02-01T00:00:00Z");
                var march = new Date("2013-03-01T00:00:00Z");
                var april= new Date("2013-04-01T00:00:00Z");

                for (i = 0; i <months.length; i++) {
                    dati.push({
                        key: months[i],
                        values: []

                    });
                  }

                console.log(generos[0][0]);
                for(j=0;j<generos.length;j++){

                  if (generos[j][0].toString()==november.toString()){
                    dati[0].values.push({x:hash2gen(generos[j][3]),y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][0].toString()==december.toString()){
                    dati[1].values.push({x:hash2gen(generos[j][3]),y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][0].toString()==january.toString()){
                    dati[2].values.push({x:hash2gen(generos[j][3]),y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][0].toString()==february.toString()){
                    dati[3].values.push({x:hash2gen(generos[j][3]),y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][0].toString()==march.toString()){
                    dati[4].values.push({x:hash2gen(generos[j][3]),y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][0].toString()==april.toString()){
                    dati[5].values.push({x:hash2gen(generos[j][3]),y:generos[j][1],size:generos[j][2]})
                  }

                }

            return dati
           }

           function hash2gen(hash){
            switch(hash)
              {
              case 'F#0':
                return 'Female <18'
                break;
              case 'F#1':
                return 'Female 19-25'
                break;
              case 'F#2':
                return 'Female 26-35'
                break;
              case 'F#3':
                return 'Female 36-45'
                break;
              case 'F#4':
                return 'Female 46-55'
                break;
              case 'F#5':
                return 'Female 56-65'
                break;
              case 'F#6':
                return 'Female >66'
                break;
              case 'M#0':
                return 'Male <18'
                break;
              case 'M#1':
                return 'Male 19-25'
                break;
              case 'M#2':
                return 'Male 26-35'
                break;
                case 'M#3':
                return 'Male 36-45'
                break;
                case 'M#4':
                return 'Male 46-55'
                break;
                case 'M#5':
                return 'Male 56-65'
                break;
                case 'M#6':
                return 'Male >66'
                break;
              default:
                return 'Unknown'
              }
           }


           function genero1(){

                generos=[];
                dati=[];



                genero=Genero.find({'codigo':marker.codigo}).forEach(function(punto){
                  //console.log(punto)
                  var date= punto['date'];
                  punto['datos'].forEach(function(punt){
                    //console.log(punt['avg'])
                    generos.push([date,punt['avg'],punt['num_payments'],punt['hash']])
                    
                    });


                  });
                //console.log(generos);

                var months=['F#0','F#1','F#2','F#3','F#4','F#5','F#6','M#0','M#1','M#2','M#3','M#4','M#5','M#6','U']

                var november= new Date("2012-11-01T00:00:00Z");
                var december= new Date("2012-12-01T00:00:00Z");
                var january =new Date("2013-01-01T00:00:00Z");
                var february= new Date("2013-02-01T00:00:00Z");
                var march = new Date("2013-03-01T00:00:00Z");
                var april= new Date("2013-04-01T00:00:00Z");

                for (i = 0; i <months.length; i++) {
                    dati.push({
                        key: months[i],
                        values: []

                    });
                  }

                //console.log(generos[0][0]);
                for(j=0;j<generos.length;j++){

                  if (generos[j][3]=='F#0'){
                    dati[0].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='F#1'){
                    dati[1].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='F#2'){
                    dati[2].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='F#3'){
                    dati[3].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][4]=='F#4'){
                    dati[4].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='F#5'){
                    dati[5].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='F#6'){
                    dati[6].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='M#1'){
                    dati[7].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='M#2'){
                    dati[8].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='M#3'){
                    dati[9].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='M#4'){
                    dati[10].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='M#5'){
                    dati[11].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='M#6'){
                    dati[12].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }
                  else if (generos[j][3]=='U'){
                    dati[13].values.push({x:generos[j][0],y:generos[j][1],size:generos[j][2]})
                  }

                }
            var total=[]    
            for (var i=0; i<dati.length;i++){
                var suma=0;
               for (var j=0;j<dati[i]['values'].length;j++){
                  suma=suma + dati[i]['values'][j]['y']*dati[i]['values'][j]['size']
                  //console.log(suma)
               }
               total.push(suma);
            }

            var max_of_array = Math.max.apply(Math, total);

            //console.log(max_of_array);

            var index = total.indexOf(max_of_array);
            Session.set('gasto',total[index].toFixed(2));
            //console.log(index);

            switch(index){
              case 0:
                key1= 'Female <18'
                break;
              case 1:
                key1=  'Female 19-25'
                break;
              case 2:
                key1=  'Female 26-35'
                break;
              case 3:
                key1=  'Female 36-45'
                break;
              case 4:
                key1=  'Female 46-55'
                break;
              case 5:
                key1=  'Female 56-65'
                break;
              case 6:
                key1=  'Female >66'
                break;
              case 7:
                key1=  'Male <18'
                break;
              case 8:
                key1=  'Male 19-25'
                break;
              case 9:
                key1=  'Male 26-35'
                break;
                case 10:
                key1=  'Male 36-45'
                break;
                case 11:
                key1=  'Male 46-55'
                break;
                case 12:
                key1=  'Male 56-65'
                break;
                case 13:
                key1=  'Male >66'
                break;
              default:
                key1=  'Unknown'
              

            }

            Session.set('demografia',key1);


            return dati
           }

                  

         nv.addGraph(function() {
                var chart = nv.models.scatterChart()
                              .showDistX(true)
                              .showDistY(true)
                              .color(d3.scale.category10().range());
              
                chart.xAxis
                .axisLabel('Date')
               .rotateLabels(-45)
                .tickFormat(function(d) { return d3.time.format('%x')(new Date(d))});


                 chart.tooltipContent(function (key, y, e, graph) {
            var x = String(graph.point.x);
            var y = String(graph.point.y);
            //if (key == 'Huelva') {
            var y = ' Cantidad media:<b>' + String(graph.point.y)+'</b>';
            //}
            //if (key == 'serie 2') {
            //    var y = String(graph.point.name) + ' calls';
            //}
            //if (key == 'serie 3') {
            //    var y = String(graph.point.name) + ' calls';


            //}

            switch(key)
              {
              case 'F#0':
                key1= 'Female <18'
                break;
              case 'F#1':
                key1=  'Female 19-25'
                break;
              case 'F#2':
                key1=  'Female 26-35'
                break;
              case 'F#3':
                key1=  'Female 36-45'
                break;
              case 'F#4':
                key1=  'Female 46-55'
                break;
              case 'F#5':
                key1=  'Female 56-65'
                break;
              case 'F#6':
                key1=  'Female >66'
                break;
              case 'M#0':
                key1=  'Male <18'
                break;
              case 'M#1':
                key1=  'Male 19-25'
                break;
              case 'M#2':
                key1=  'Male 26-35'
                break;
                case 'M#3':
                key1=  'Male 36-45'
                break;
                case 'M#4':
                key1=  'Male 46-55'
                break;
                case 'M#5':
                key1=  'Male 56-65'
                break;
                case 'M#6':
                key1=  'Male >66'
                break;
              default:
                key1=  'Unknown'
              }

            //tooltip_str = '<center><b>' + key1 + '</b></center>' + y;
            tooltip_str = '<center><b>' + key1 + '</b></center>';
            return tooltip_str;
        });

                
                chart.yAxis.axisLabel('Gasto medio').tickFormat(d3.format('.02f'))
              
               d3.select('#chart1 svg')
                   .datum(genero1())
                 .transition().duration(500)
                   .call(chart);
             
               nv.utils.windowResize(chart.update);
             
               return chart;
             });


          

           

           

    





     $('h2').click(function(e){
                  
                    console.log("One of the many Small Polygon Links was clicked");
                });

   });
    //Session.set('posicion',Math.floor((Math.random()*100)+1))



};



Template.details.helpers( {
    nombre: function(){
         return Session.get('nombre')
    } ,

    posicion: function(){
        return Session.get('posicion')
    },

    total: function(){
        return Session.get('total')

    },
    opiniones: function(){
      return Session.get('opiniones')
    },
    puntuacion: function(){
      return Session.get('puntuacion')
    },
    datos: function(){
      return Session.get('datos')
    },

    demografia:function(){
      return Session.get('demografia')
    },

    gasto:function(){
      return Session.get('gasto')
    },
    dia:function(){
      return Session.get('dia')
    },
    hora:function(){
      return Session.get('hora')
    },
    transacciones:function(){
      return Session.get('transacciones')
    },
    gasto_medio:function(){
      return Session.get('gasto_medio')
    },
    ticket:function(){
      return Session.get('ticket')
    }


}
);

Template.details.events = {
 'click .btn-small': function(event){

     event.preventDefault();
     
     $('#myModal').modal();
   
     
     

} 

};


Template.stats.rendered =function () {


  function stats(){

                var estadisticas=[];
                dat=[];

                estadistica=Estadisticas.find({'codigo':Session.get('codigo')}).forEach(function(punto){
                  console.log(punto)
                  punto['days'].forEach(function(punt){
                    var dia=punt['day'];
                    punt['hours'].forEach(function(horas){
                      //console.log(horas['hour']);
                      if (horas['hour']=='00'){
                        horas['hour']='24';
                        estadisticas.push([dia,horas['hour'],horas['avg'],horas['num_payments']]);
                      }
                      else{
                        estadisticas.push([dia,horas['hour'],horas['avg'],horas['num_payments']]);
                        //lineChartData['datasets'][0]['data'].push(horas['avg']);
                      }
                    });


                  });

                  

                



                //console.log(estadisticas);

                
                });

               // var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData,{ showTooltips: true }); 


                var sem_days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

                for (i = 0; i <sem_days.length; i++) {
                    dat.push({
                        key: sem_days[i],
                        values: []

                    });
                  }

                for (j=0;j<estadisticas.length;j++){
                    if(estadisticas[j][0]=='Monday'){
                      dat[0].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Tuesday'){
                      dat[1].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Wednesday'){
                      dat[2].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Thursday'){
                      dat[3].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Friday'){
                      dat[4].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Saturday'){
                      dat[5].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }
                    else if(estadisticas[j][0]=='Sunday'){
                      dat[6].values.push({x:estadisticas[j][1],y:estadisticas[j][2],size:estadisticas[j][3]})
                    }

                  }
                  return dat

            }



            
            function randomData(groups, points) { //# groups,# points per group
                var data = [],
                     shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                     random = d3.random.normal();
               
                 for (i = 0; i < groups; i++) {
                   data.push({
                     key: 'Group ' + i,
                     values: []
                   });
               
                   for (j = 0; j < points; j++) {
                     data[i].values.push({
                       x: random()
                     , y: random()
                     , size: Math.random()
                     //, shape: shapes[j % 6]
                     });
                   }
                 }
               
                 return data;
               }


           nv.addGraph(function() {
    var chart = nv.models.scatterChart()
                  .showDistX(true)
                  .showDistY(true)
                  .color(d3.scale.category10().range());
  
    chart.xAxis.tickFormat(d3.format('.02f'))
    chart.yAxis.tickFormat(d3.format('.02f'))
  
   d3.select('#chart2 svg')
       .datum(stats())
     .transition().duration(500)
       .call(chart);
 
   nv.utils.windowResize(chart.update);
 
   return chart;
 });



  }



/*Template.details.rendered = function () {

    var self = this;
    self.node = self.find("svg");
    //var hoteles= Hotels.find();
    if (! self.handle) {
        self.handle = Deps.autorun(function () {
            data=[];
           


          function dat(groups, points) {
              var data = [],
                  shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                  random = d3.random.normal();

              for (i = 0; i < groups; i++) {
                data.push({
                  key: 'Group ' + i,
                  values: []
                });

                for (j = 0; j < points; j++) {
                  data[i].values.push({
                    x: random()
                  , y: random()
                  , size: Math.random()
                  //, shape: shapes[j % 6]
                  });
                }
              }

              return data;
          }


          nv.addGraph(function() {
            var chart = nv.models.scatterChart()
                          .showDistX(true)
                          .showDistY(true)
                          .color(d3.scale.category10().range());

            chart.xAxis.tickFormat(d3.format('.02f'));
            chart.yAxis.tickFormat(d3.format('.02f'));

            d3.select('#chart svg')
                .datum(dat(4,40))
              .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
          });

            //hoteles= Hotels.find()
            //hoteles1=Hotels.find().
                //hoteles_total.rewind();

            //hoteles_total.rewind();

            //var array= hoteles_total.fetch();
            //console.log(hoteles_total.fetch());


            Restaurants.find().forEach(function(punto){
                 //alert(punto.reputacion +' '+ punto.precio_maximo +' '+ punto.categoria);
                

         });







    });
}



  }


*/

