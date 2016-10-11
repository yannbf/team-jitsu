import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import TeamsTable from './TeamsTable';

var config = {};

config.params = {
  center: [-3.734464116057717,-38.46957206726074], // Greenmile
  zoomControl: false, 
  zoom: 15,
  maxZoom: 16,
  minZoom: 11,
  scrollwheel: false,
  legends: false,
  infoControl: false,
  attributionControl: true
};

config.tileLayer = {
  uri: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  params: {
    attribution: 'Fortaleza - CE',
    maxZoom: 16,
    id: 'gogogoz.1ja4mn8n',
    accessToken: 'pk.eyJ1IjoiZ29nb2dveiIsImEiOiJjaXR6ODl1YTkwYXV6MnpuNGtoNmdqcHd5In0.eRPj7DBBoJy_1wv1mlo_KA'
  }
};

var Map = React.createClass({
  map: null,
  marker: null,
  getID() {
      return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },
  componentDidMount() {
      if (!this.map){
        this.init(this.getID()); 
      }
  },
  init(id) {
    if (this.map) return;
    
    this.map = L.map(id, config.params);
    L.control.zoom({ position: "topleft"}).addTo(this.map);

    var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);

    this.setState({
      tileLayer: tileLayer
    });
  },
  zoomTo(marker) {
    var bounds = new L.LatLngBounds();
    bounds.extend(marker.getLatLng());

    this.map.fitBounds(bounds, {padding: [150, 150]});
  },
  addMarker(latLong, popupContent) {
      if(this.marker){
        this.map.removeLayer(this.marker);
      }

      this.marker = L.marker(latLong).addTo(this.map);
      this.marker.bindPopup(popupContent); 

      this.zoomTo(this.marker);
  },
  render(){
    let {teams} = this.props;
    var table = <img class="loading" src="http://natone.com.br/assets/images/loader.gif"/>
    if (teams != null) { 
        table = <TeamsTable teams={teams} addMarker={this.addMarker} map={this.map} />
    }
    return (
      <div>                
        <div class="wrapper">
          <div id="map" />
        </div>
        <div id="teams" class="wrapper">
          {table}
        </div>
      </div>
    );
  }
}); 

module.exports = Map;