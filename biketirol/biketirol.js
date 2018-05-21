/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

let myMap = L.map("mapdiv", {
    fullscreenControl: true
}); 
let markerGroup = L.featureGroup();
let myLayers = {
    osm : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), 
        subdomains : ["a","b","c"], 
        attribution : "Datenquelle: <a href=openstreetmap.org</a>", 

    geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"], 
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>", 
    }
),
    bmapoverlay : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", { 
    subdomains : ["maps","maps1","maps2","maps3","maps4"], 
    attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),
	elektronischeKarteSommer : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	elektronischeKarteWinter : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	elektronischeKarteNomenklatur : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
	elektronischeKarteOrtho : L.tileLayer("http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
		attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>",
	}
), 
};


myMap.addLayer(myLayers.elektronischeKarteSommer); 
myMap.addLayer(markerGroup);


let myMapControl = L.control.layers({ 
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,  
	"Elektronische Karte Sommer" : myLayers.elektronischeKarteSommer,
	"Elektronische Karte Winter" : myLayers.elektronischeKarteWinter,
	"Elektronische Karte Orthophoto" : myLayers.elektronischeKarteOrtho,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
	"Nomenklatur Overlay" : myLayers.elektronischeKarteNomenklatur,
	"Start und Ziel" : markerGroup
        
},{
    collapsed: false
}); 

myMap.addControl(myMapControl); 

myMap.setView([47.14237,10.57026], 11); 


L.control.scale({
    imperial: false, 
    maxWidth: 200, 
    position: "bottomleft"
}).addTo(myMap)


const start = [47.136961, 10.566790]; 
const ziel = [47.009754,10.288611];


let startMarker = L.marker(start, {
	title: "start",
    icon: L.icon({
          iconUrl: 'images/start.png'
})
}).addTo(markerGroup);
startMarker.bindPopup("<p>Der Start in Landeck</p><img style='width:100px'/> <a href='https://de.wikipedia.org/wiki/Landeck_(Tirol)' >Infos</a>");

let zielMarker = L.marker(ziel, {
	title: "ziel",
	icon: L.icon({
          iconUrl: 'images/finish.png'
})
}).addTo(markerGroup);
		  
zielMarker.bindPopup("<p>Das Ziel in Ischgl</p><img style='width:100px'/> <a href='https://de.wikipedia.org/wiki/Ischgl' >Infos</a>");

//Etappe
//let geojson = L.geoJSON(etappendata).addTo(markerGroup);
//geojson.bindPopup(function(layer){
//	console.log("Layer for Popup:", layer.feature.geometry);
//	const props = layer.feature.geometry;
//	const popupText =`<p>${props.coordinates}</p>`;
//	return popupText;
//});

// Etappe über gpx Datei
let gpxTrack = new L.GPX('data/etappe29.gpx', {
    async : true,
}).addTo(markerGroup);
gpxTrack.on("loaded", function(evt) { 
    console.log("get_distance",evt.target.get_distance().toFixed(0))
    console.log("get_elevation_min",evt.target.get_elevation_min().toFixed(0))
    console.log("get_elevation_max",evt.target.get_elevation_max().toFixed(0))
    console.log("get_elevation_gain",evt.target.get_elevation_gain().toFixed(0))
    console.log("get_elevation_loss",evt.target.get_elevation_loss().toFixed(0))
    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge;
    let tief = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("tiefster Punkt").innerHTML = tief;
    let hoch = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("höchster Punkt").innerHTML = hoch;
    let aufstieg = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("Aufstieg").innerHTML = aufstieg;
    let abstieg = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("Abstieg").innerHTML = abstieg;
    myMap.fitBounds(evt.target.getBounds())
})