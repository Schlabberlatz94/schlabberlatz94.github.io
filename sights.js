
let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-l-map
const sightsGroup = L.featureGroup();
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
    "Sehenswürdigkeiten Wien": sightsGroup, 
  
    
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



async function addGeojson(url) {
    // console.log("Url wird geladen: ", url);
    const response = await fetch(url);
    // console.log("Response ", response);
    const sightsdata = await response.json();
    console.log("GeoJson: ", sightsdata);
    const geojson = L.geoJSON(sightsdata, {
        style: function(feature) {
            return { color: "#ff0000" };
        },
        pointToLayer: function(geoJsonPoint, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'sight-2.png'
                    })
                });
        }
    });
	const popup = geojson.bindPopup(function(layer) {
        const props = layer.feature.properties;
        const popupText = `<h1>${props.NAME}</h1>
        <p>Informationen unter: ${props.WEITERE_INF}</p>`;
        return popupText;
    
});
    sightsGroup.addLayer(geojson);
    myMap.fitBounds(sightsGroup.getBounds());

}

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json"

addGeojson(url);

myMap.addLayer(sightsGroup);
