
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBCmIfe6uYdwYtS6c7ET-IDEOKMq_sbDsQ",
    authDomain: "latihan-168007.firebaseapp.com",
    databaseURL: "https://latihan-168007.firebaseio.com",
    projectId: "latihan-168007",
    storageBucket: "latihan-168007.appspot.com",
    messagingSenderId: "760935327738"
  };
  firebase.initializeApp(config);

  var markerRef=firebase.database().ref('markers');

  function saveMarker(coord, info=null, imageIcon=null){
    var newMarkerRef  = markerRef.push();
    newMarkerRef.set(
        {
            coord:coord,
            info:info,
            imageIcon:imageIcon
        }
    );
    console.log(newMarkerRef);
  }
  markerRef.on('value',getData,showError);
  function getData(data){
    var markers=[];
    var marker= data.val();
    var keys = Object.keys(data.val());
    console.log(keys);
    for (var i=0;i<keys.length;i++){
      var k = keys[i];
      // console.log(parseFloat(marker[k].coord.lat));
      lat = parseFloat(marker[k].coord.lat);
      lng = parseFloat(marker[k].coord.lng);
      loc = {lat:lat,lng:lng};
      console.log(loc);
      markers.push(createMarker(loc,marker[k].info,'images/placeholder.png'));
    }
    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'images/m'});
  }
  function showError(err){
    document.querySelector('.alert').style.display='block';
    document.getElementById("alert").innerHTML = "Gagal Menyimpan Data";
    document.querySelector('.alert').style.background='red';
    setTimeout(function(){
                document.querySelector('.alert').style.display='none';
            },3000);
  }
