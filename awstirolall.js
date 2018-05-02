
let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-l-map
const awsGroup = L.featureGroup();
let myLayers = {
    osm : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), //http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        subdomains : ["a","b","c"], 
        attribution : "Datenquelle: <a href=openstreetmap.org</a>", 

    geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"], //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>", //http://leafletjs.com/reference-1.3.0.html#layer-attribution
    }
),
    bmapoverlay : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", { 
    subdomains : ["maps","maps1","maps2","maps3","maps4"], 
    attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),
   
    bmapgrau : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",{
    subdomains : ["maps","maps1","maps2","maps3","maps4"], 
    attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),
    bmaphidpi : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",{
    subdomains : ["maps","maps1","maps2","maps3","maps4"], 
    attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),
    bmaporthofoto30cm : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
    subdomains : ["maps","maps1","maps2","maps3","maps4"], 
    attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),
}
myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-1.3.0.html#layergroup-addlayer

let myMapControl = L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap. at Orthofoto" : myLayers.bmaporthofoto30cm, 
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Wetterstationen": awsGroup,
    
},{
    collapsed: false
}); // Sollte eigentlich darüber gehen http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed

myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMap.setView([47.267,11.383], 11); //http://leafletjs.com/reference-1.3.0.html#map-setview


L.control.scale({
    imperial: false, 
    maxWidth: 200, 
    position: "bottomleft"
}).addTo(myMap)

// verwendete Methode: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
// verwendete Optionen: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
// http://leafletjs.com/reference-1.3.0.html#control-scale-metric
// http://leafletjs.com/reference-1.3.0.html#control-scale-position

console.log("Stationen: ", stationen); 

myMap.addLayer(awsGroup);
let geojson = L.geoJSON(stationen).addTo(awsGroup);
geojson.bindPopup(function(layer) {
        const props = layer.feature.properties;
        const popupText = `<h1>${props.name}</h1>
        <p>Temperatur: ${props.LT} °C</p>`;
        return popupText;
    
});
myMap.fitBounds(awsGroup.getBounds());

