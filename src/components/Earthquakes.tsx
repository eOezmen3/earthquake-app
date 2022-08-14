import 'leaflet/dist/leaflet.css';
import './app.scss';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { useEffect, useState } from 'react';

import L from 'leaflet';
import axios from 'axios';
import moment from 'moment';

type MapMarkersType = {
  key: string;
  description: string;
  position: [number, number];
  mag: number;
  time: Date;
};

const Earthquakes: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapMarkers: any = [];
  useEffect(() => {
    const url =
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

    const fetchData = async () => {
      try {
        await axios.get(url).then((response) => {
          setEarthquakes(response.data.features);
          response.data.features.forEach((equake: any) => {
            mapMarkers.push({
              key: equake.id,
              position: [
                equake.geometry.coordinates[1],
                equake.geometry.coordinates[0],
              ],
              description: equake.properties.place,
              mag: equake.properties.mag,
              time: moment(equake.properties.time).format(
                'DD-MM-YYYY HH:mm:ss',
              ),
            });
          });
          setMarkers(mapMarkers);
        });
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  const markerIcon = L.icon({
    iconSize: [20, 25],
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
  });

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {markers.length > 0 &&
        markers.map((o: any) => {
          return (
            <Marker key={o.key} position={o.position} icon={markerIcon}>
              <Popup className="map-popup">
                <div>
                  <h4>{o.description}</h4>

                  <p>
                    <b>Mag: </b>
                    {o.mag}
                  </p>
                  <p>
                    <b>Date: </b>
                    {o.time}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default Earthquakes;
