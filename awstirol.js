
let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();
let myLayers = {
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
    bmaporthofoto30cm : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
    subdomains : ["maps","maps1","maps2","maps3","maps4"], 
    attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
),
}
myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-1.3.0.html#layergroup-addlayer
myMap.addLayer(markerGroup);

let myMapControl = L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "basemap. at Orthofoto" : myLayers.bmaporthofoto30cm, 
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Wetterstationen": markerGroup, 
},{
    collapsed: false
}); 

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

const Gehrenspitze = [47.387131, 11.133717];
const Hafelekar = [47.312079, 11.383623];
const HoheMundeGipfel = [47.346295, 11.080385];
const HoheMundeWindstation = [47.346612, 11.083694];
const NassereithWannig = [47.336922, 10.862333];
const NassereitherAlm = [47.344376, 10.849554];
const Puitegg = [47.394844, 11.152817];
const Rauthhütte = [47.345909, 11.104943];
const RosshütteWindstation = [47.342025, 11.227903];
const Seegrube = [47.3063819943737, 11.3779335010812];
const Dalfazkamm = [47.448514, 11.751511];
const Erfurterhütte = [47.441861, 11.762127];
const Agetwoad = [47.069889, 10.862306];
const BreiterGrieskogelSchneestation = [47.0839527777778, 11.0273833333333];
const BreiterGrieskogelWindstation = [47.1010555555556, 11.0230388888889];
const Falkaunsalpe = [47.071488, 10.76282];
const FranzSennHütteHorntalerSpitzl = [47.099611, 11.15541667];
const FranzSennHütteKlHorntal = [47.0960000187559, 11.1623888694066];
const LampsenspitzeSchneestation = [47.153491, 11.120722];
const LampsenspitzeWindstation = [47.156075, 11.095642];
const RoterSchrofen = [47.04, 10.7181];
const SchlickerAlm = [47.154432, 11.303207];
const SeirlöcherKogel = [47.0339, 10.8528];
const Lämmerbichlalm = [47.181266, 11.751717];
const RastkogelWindstation = [47.192132, 11.767481];
const Sonntagsköpfl = [47.2750109996958, 11.7520860028295];
const SonntagsköpflWindstation = [47.271989, 11.755802];
const TuxerjochSchneestation = [47.093149, 11.648053];
const TuxerjochWindstation = [47.089717, 11.648987];
const WandspitzeSchneestation = [47.121858, 11.661969];
const WandspitzeWindstation = [47.120752, 11.658062];


    
const markerOptions = {
    title: "wetterstation",
    opacity: 0.7,
};

let GehrenspitzeMarker = L.marker(Gehrenspitze, {title: "Gehrenspitze"}).addTo(markerGroup);
GehrenspitzeMarker.bindPopup("<p>Gehrenspitze </br> Temperatur 0.6°C </br> 26.04.2018 </br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png'>Mehr Wetterdaten</a></p>");

let HafelekarMarker = L.marker(Hafelekar, {title: "Hafelekar"}).addTo(markerGroup);
HafelekarMarker.bindPopup("<p>Hafelekar </br> Temperatur 1.6°C </br> 26.04.2018 </br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png'>Mehr Wetterdaten</a></p>");

let HoheMundeGipfelMarker = L.marker(HoheMundeGipfel, {title: "Hohe Munde Gipfel"}).addTo(markerGroup);
HoheMundeGipfelMarker.bindPopup("<p>Hohe Munde Gipfel </br> 26.04.2018 </br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/woche/hohemunde.png' >Mehr Wetterdaten</a></p>");

let HoheMundeWindstationMarker = L.marker(HoheMundeWindstation, {title: "Hohe Munde Windstation"}).addTo(markerGroup);
HoheMundeWindstationMarker.bindPopup("<p>Hohe Munde Windstation </br> Temperatur -4.1°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' >Mehr Wetterdaten</a></p>");

let NassereithWannigMarker = L.marker(NassereithWannig, {title: "Nassereith Wannig"}).addTo(markerGroup);
NassereithWannigMarker.bindPopup("<p>Nassereith Wannig </br> Temperatur -1.2°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' >Mehr Wetterdaten</a></p>");

let NassereitherAlmMarker = L.marker(NassereitherAlm, {title: "Nassereither Alm"}).addTo(markerGroup);
NassereitherAlmMarker.bindPopup("<p>Nassereither Alm </br> Temperatur 4°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/nassereith.png' >Mehr Wetterdaten</a></p>");

let PuiteggMarker = L.marker(Puitegg, {title: "Puitegg"}).addTo(markerGroup);
PuiteggMarker.bindPopup("<p>Puitegg </br> Temperatur 5.3°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/puitegg.png' >Mehr Wetterdaten</a></p>");

let RauthhütteMarker = L.marker(Rauthhütte, {title: "Rauthhütte"}).addTo(markerGroup);
RauthhütteMarker.bindPopup("<p>Rauthhütte </br> Temperatur 11.7°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rauthhuette.png' >Mehr Wetterdaten</a></p>");

let RosshütteWindstationMarker = L.marker(RosshütteWindstation, {title: "Rosshütte Windstation"}).addTo(markerGroup);
RosshütteWindstationMarker.bindPopup("<p>Rosshütte Windstation </br> Temperatur 4.1°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/rosshuette.png' >Mehr Wetterdaten</a></p>");

let SeegrubeMarker = L.marker(Seegrube, {title: "Seegrube"}).addTo(markerGroup);
SeegrubeMarker.bindPopup("<p>Seegrube </br> Temperatur 3.1°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seegrube.png' >Mehr Wetterdaten</a></p>");

let DalfazkammMarker = L.marker(Dalfazkamm, {title: "Dalfazkamm"}).addTo(markerGroup);
DalfazkammMarker.bindPopup("<p>Dalfazkamm </br> Temperatur 0.4°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' >Mehr Wetterdaten</a></p>");

let ErfurterhütteMarker = L.marker(Erfurterhütte, {title: "Erfurterhütte"}).addTo(markerGroup);
ErfurterhütteMarker.bindPopup("<p>Erfurterhütte </br> Temperatur 2.4°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/erfurterhuette.png' >Mehr Wetterdaten</a></p>");

let AgetwoadMarker = L.marker(Agetwoad, {title: "Agetwoad"}).addTo(markerGroup);
AgetwoadMarker.bindPopup("<p>Agetwoad </br> Temperatur 1.5°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/agetwoad.png' >Mehr Wetterdaten</a></p>");

let BreiterGrieskogelSchneestationMarker = L.marker(BreiterGrieskogelSchneestation, {title: "Breiter Grieskogel Schneestation"}).addTo(markerGroup);
BreiterGrieskogelSchneestationMarker.bindPopup("<p>Breiter Grieskogel Schneestation </br> Temperatur 1.1°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' >Mehr Wetterdaten</a></p>");

let BreiterGrieskogelWindstationMarker = L.marker(BreiterGrieskogelWindstation, {title: "Breiter Grieskogel Windstation"}).addTo(markerGroup);
BreiterGrieskogelWindstationMarker.bindPopup("<p>Breiter Grieskogel Windstation </br> Temperatur -3.4°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/breiter_grieskogel.png' >Mehr Wetterdaten</a></p>");

let FalkaunsalpeMarker = L.marker(Falkaunsalpe, {title: "Falkaunsalpe"}).addTo(markerGroup);
FalkaunsalpeMarker.bindPopup("<p>Falkaunsalpe </br> Temperatur 2.2°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' >Mehr Wetterdaten</a></p>");

let FranzSennHütteHorntalerSpitzlMarker = L.marker(FranzSennHütteHorntalerSpitzl, {title: "Franz-Senn-Hütte Horntaler Spitzl"}).addTo(markerGroup);
FranzSennHütteHorntalerSpitzlMarker.bindPopup("<p>Franz-Senn-Hütte Horntaler Spitzl </br> Temperatur 4.3°C </br> 25.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' >Mehr Wetterdaten</a></p>");

let FranzSennHütteKlHorntalMarker = L.marker(FranzSennHütteKlHorntal, {title: "Franz-Senn-Hütte Kl Horntal"}).addTo(markerGroup);
FranzSennHütteKlHorntalMarker.bindPopup("<p>Franz-Senn-Hütte Kl Horntal </br> Temperatur 5.5°C </br> 25.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/franz_senn_huette.png' >Mehr Wetterdaten</a></p>");

let LampsenspitzeSchneestationMarker = L.marker(LampsenspitzeSchneestation, {title: "Lampsenspitze Schneestation"}).addTo(markerGroup);
LampsenspitzeSchneestationMarker.bindPopup("<p>Lampsenspitze Schneestation </br> Temperatur 1.7°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' >Mehr Wetterdaten</a></p>");

let LampsenspitzeWindstationMarker = L.marker(LampsenspitzeWindstation, {title: "Lampsenspitze Windstation"}).addTo(markerGroup);
LampsenspitzeWindstationMarker.bindPopup("<p>Lampsenspitze Windstation </br> Temperatur -0.8°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/lampsenspitze.png' >Mehr Wetterdaten</a></p>");

let RoterSchrofenMarker = L.marker(RoterSchrofen, {title: "Roter Schrofen"}).addTo(markerGroup);
RoterSchrofenMarker.bindPopup("<p>Roter Schrofen </br> Temperatur -1°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/falkaunsalpe.png' >Mehr Wetterdaten</a></p>");

let SchlickerAlmMarker = L.marker(SchlickerAlm, {title: "Schlicker Alm"}).addTo(markerGroup);
SchlickerAlmMarker.bindPopup("<p>Schlicker Alm </br> Temperatur 6.5°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png' >Mehr Wetterdaten</a></p>");

let SeirlöcherKogelMarker = L.marker(SeirlöcherKogel, {title: "Seirlöcher Kogel"}).addTo(markerGroup);
SeirlöcherKogelMarker.bindPopup("<p>Seirlöcher Kogel </br> Temperatur 0°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/seirloecherkogel.png' >Mehr Wetterdaten</a></p>");

let LämmerbichlalmMarker = L.marker(Lämmerbichlalm, {title: "Lämmerbichlalm"}).addTo(markerGroup);
LämmerbichlalmMarker.bindPopup("<p>Lämmerbichlalm </br> Temperatur 3°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' >Mehr Wetterdaten</a></p>");

let RastkogelWindstationMarker = L.marker(RastkogelWindstation, {title: "Rastkogel Windstation"}).addTo(markerGroup);
RastkogelWindstationMarker.bindPopup("<p>Rastkogel Windstation </br> Temperatur 0.1°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/laemmerbichlalm.png' >Mehr Wetterdaten</a></p>");

let SonntagsköpflMarker = L.marker(Sonntagsköpfl, {title: "Sonntagsköpfl"}).addTo(markerGroup);
SonntagsköpflMarker.bindPopup("<p>Sonntagsköpfl </br> Temperatur 1.2°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' >Mehr Wetterdaten</a></p>");

let SonntagsköpflWindstationMarker = L.marker(SonntagsköpflWindstation, {title: "Sonntagsköpfl Windstation"}).addTo(markerGroup);
SonntagsköpflWindstationMarker.bindPopup("<p>Sonntagsköpfl Windstation </br> Temperatur 3.3°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/sonntagskoepfl.png' >Mehr Wetterdaten</a></p>");

let TuxerjochSchneestationMarker = L.marker(TuxerjochSchneestation, {title: "Tuxerjoch Schneestation"}).addTo(markerGroup);
TuxerjochSchneestationMarker.bindPopup("<p>Tuxerjoch Schneestation </br> Temperatur 6°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' >Mehr Wetterdaten</a></p>");

let TuxerjochWindstationMarker = L.marker(TuxerjochWindstation, {title: "Tuxerjoch Windstation"}).addTo(markerGroup);
TuxerjochWindstationMarker.bindPopup("<p>Tuxerjoch Windstation </br> Temperatur 1.5°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/tuxerjoch.png' >Mehr Wetterdaten</a></p>");

let WandspitzeSchneestationMarker = L.marker(WandspitzeSchneestation, {title: "Wandspitze Schneestation"}).addTo(markerGroup);
WandspitzeSchneestationMarker.bindPopup("<p>Wandspitze Schneestation </br> Temperatur 1.3°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' >Mehr Wetterdaten</a></p>");

let WandspitzeWindstationMarker = L.marker(WandspitzeWindstation, {title: "Wandspitze Windstation"}).addTo(markerGroup);
WandspitzeWindstationMarker.bindPopup("<p>Wandspitze Windstation </br> Temperatur -0.3°C </br> 26.04.2018</br><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/wandspitze.png' >Mehr Wetterdaten</a></p>");




let patscherkoflMarker = L.marker(patscherkofl, {title: "Patscherkofel"}).addTo(markerGroup);
patscherkoflMarker.bindPopup("<p>Patscherkofl von der Nordkette aus</p><img style='width:200px' src='https://apps.tirol.gv.at/luft/nordkette.jpg' alt='Patscherkofel' />");










myMap.fitBounds(markerGroup.getBounds()); // Zentriert die drei Marker in einem neuen Ausschnitt