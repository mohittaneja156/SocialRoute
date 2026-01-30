'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icon
const fixLeafletIcon = () => {
    // We need to fix the icons client-side usually. 
    // But since we can't easily put assets in public folder from here, we will use CDN urls or require if bundler supports it.

    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};

type MapProps = {
    coords: [number, number];
    zoom?: number;
};

export default function MapComponent({ coords, zoom = 13 }: MapProps) {
    useEffect(() => {
        fixLeafletIcon();
    }, []);

    return (
        <MapContainer center={coords} zoom={zoom} scrollWheelZoom={false} className="w-full h-full z-0">
            {/* White/Grayscale Map with Inverted Dark Mode feel via CSS parent */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coords}>
                <Popup>Social Route HQ</Popup>
            </Marker>
        </MapContainer>
    );
}
