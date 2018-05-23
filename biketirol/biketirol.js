let myMap = L.map("mapdiv", {
    fullscreenControl: true
}); 
let markerGroup = L.featureGroup();
let overlaySteigung = L.featureGroup().addTo(myMap);

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
    //"Start und Ziel" : markerGroup,
    "Steigungslinie" : overlaySteigung,
        
},{
    collapsed: true,
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

//Höhenprofil
let hoehenProfil = L.control.elevation({
    position : "topright",
    theme : "steelblue-theme",
    collapsed : true, 
}).addTo(myMap);

// Etappe über gpx Datei
let gpxTrack = new L.GPX('data/etappe29.gpx', {
    async : true,
})//.addTo(markerGroup);
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
});

gpxTrack.on('addline', function(evt){
    hoehenProfil.addData(evt.line);
    console.log(evt.line);
    console.log(evt.line.getLatLngs());
    console.log(evt.line.getLatLngs()[0]);
    console.log(evt.line.getLatLngs()[0].lat);
    console.log(evt.line.getLatLngs()[0].lng);
    console.log(evt.line.getLatLngs()[0].meta);
    console.log(evt.line.getLatLngs()[0].meta.ele);

         // Alle Segmente der Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
        let p1 = gpxLinie[i-1];
        let p2 = gpxLinie[i];
        console.log(p1.lat,p1.lng,p2.lat, p2.lng);

        // Entfernung zwischen den Punkten berechnen
        let dist = myMap.distance(
            [p1.lat,p1.lng],
            [p2.lat,p2.lng]
        );

        //Höhenunterschied berechnen
        let delta = p2.meta.ele - p1.meta.ele;

        // Steigung in % berechnen
        let proz = (delta > 0) ? (delta / dist * 100.0).toFixed(1) : 0;

        // Bedingung ? Ausdruck1 : Ausdruck 2

        console.log(p1.lat,p1.lng,p2.lat, p2.lng,dist,delta,proz);

        let farbe = 
            proz >  10  ? "#d73027" :
            proz >  6   ? "#f46d43" :
            proz >  2   ? "#fdae61" :
            proz >  0   ? "#fee08b" :
            proz > -2  ? "#d9ef8b" :
            proz > -6  ? "#a6d96a" :
            proz > -10 ? "#66bd63" :
                        "#1a9850";
        
        let segment = L.polyline(
            [
                 [p1.lat,p1.lng], 
                 [p2.lat,p2.lng],
            ], {
                color: farbe,
                weight : 10 
            }
        ).addTo(overlaySteigung);
    }
});
