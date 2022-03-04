const ip_Tracker_Url = "http://ip-api.com/json/";
const fields ="?fields=status,country,region,regionName,city,zip,lat,lon,timezone,isp,query,offset";

var input = document.querySelector("input");
var search = document.querySelector("button");

var ip_address = document.getElementById("ip-address");
var loc = document.getElementById("loc");
var timezone = document.getElementById("timezone");
var isp = document.getElementById("isp");

var map = L.map("map").setView([51.505, -0.09], 11);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoiam9lbGN2IiwiYSI6ImNrb2dyZ2R2ZTBpY20ydnBuaDNrdGlmOHcifQ.aUdmOfd2fZmlEfjb6vNjKg",
  }
).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

function ip_json(ip) {
    console.log(ip_Tracker_Url +ip+ fields)
     fetch(ip_Tracker_Url + ip + fields)
    .then((res) => res.json())
    .then((data) => output(data));
  }
  
  search.addEventListener("click", function () {
    ip=input.value;
    if(ip!=''){
      ip_json(ip);
    }
});

function output(data){
  if(data.status==='success'){
    loc.innerHTML=data.city+", "+data.regionName+", "+ data.country
    isp.innerHTML= data.isp
    ip_address.innerHTML= data.query
    timezone.innerHTML= data.offset/3600+ " UTC"
    ip_location(data.lat,data.lon)
  }
  else{
    loc.innerHTML="Not Found"
    isp.innerHTML= "Not Found"
    ip_address.innerHTML= data.query
    timezone.innerHTML= "Not Found"
    document.getElementById('map').innerHTML=''
  }


}

function ip_location(lat, lon){
     map.remove()
     map = L.map("map").setView([lat, lon], 11);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
,
  {

    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoiam9lbGN2IiwiYSI6ImNrb2dyZ2R2ZTBpY20ydnBuaDNrdGlmOHcifQ.aUdmOfd2fZmlEfjb6vNjKg",
  }
).addTo(map);

var marker = L.marker([lat, lon]).addTo(map);
}