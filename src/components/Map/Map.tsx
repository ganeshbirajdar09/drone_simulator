import React, { useState, useEffect, MutableRefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapProps } from './Map.types';
import "./Map.scss"



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string

const Map: React.FC<MapProps> = ({ dronePosition }) => {

    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

    useEffect(() => {
        const initializeMap = ({ setMap, setMarker, mapContainer }: any) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [dronePosition.longitude, dronePosition.latitude],
                zoom: 3
            });

            const markerElement = document.createElement('span');
            markerElement.className = 'marker'
            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat([dronePosition.longitude, dronePosition.latitude])
                .addTo(map);

            setMap(map);
            setMarker(marker);
        };

        if (!map) initializeMap({ setMap, setMarker, mapContainer });
    }, [map, dronePosition.latitude, dronePosition.longitude]);

    useEffect(() => {
        if (marker) {
            marker.setLngLat([dronePosition.longitude, dronePosition.latitude]);

            map && map.flyTo({ center: [dronePosition.longitude, dronePosition.latitude] });
        }
    }, [dronePosition]);

    const mapContainer = React.useRef() as MutableRefObject<HTMLDivElement>;

    return <div ref={mapContainer}  style={{ width: '100vw', height: '100vh' }} />;
}

export default Map;
