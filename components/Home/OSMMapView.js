import React, { useEffect, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { UserLocationContext } from '@/context/UserLocationContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const OSMMapView = ({ businessList }) => {
  const { userLocation } = useContext(UserLocationContext);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation]);

  const userIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    iconSize: [38, 38],
  });

  const businessIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} ref={mapRef} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Your location</Popup>
        </Marker>
      )}
      {businessList.map((business, index) => (
        <Marker key={index} position={[business.lat, business.lng]} icon={businessIcon}>
          <Popup>{business.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OSMMapView;
