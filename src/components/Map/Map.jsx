import React, { useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStyles from './style.js';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { FaLocationDot } from "react-icons/fa6";
import { Rating } from '@mui/material';



const Map = ({ setCoordinates, coordinates, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  // Custom hook to programmatically move the map
  const ChangeMapView = ({ coords }) => {
    console.log(coords, "coordinates")
    const map = useMap();
    useEffect(() => {
      map.setView([coords.lat, coords.lng], map.getZoom()); // Re-center the map when coordinates change
    }, [coords, map]);
    return null;
  };



  // Custom hook to listen to map move events
  const MapEvents = () => {
    const map = useMap();
    useEffect(() => {
      const handleMoveEnd = () => {
        const center = map.getCenter(); // Get new center of the map
        setCoordinates({ lat: center.lat, lng: center.lng }); // Update coordinates
      };

      map.on('moveend', handleMoveEnd); // Add event listener
      return () => {
        map.off('moveend', handleMoveEnd); // Clean up event listener
      };
    }, [map]);

    return null;
  };

  // console.log(places, "place of details");


  return (
    <div className={classes.mapContainer}>
      <MapContainer
        center={coordinates} // Initial map center set to the coordinates
        // center={[coordinates.lat, coordinates.lng]} 
        zoom={14}
        style={{ height: '70vh', width: '50vw' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Move map programmatically when coordinates change */}
        <ChangeMapView coords={coordinates} />

        {/* Update coordinates on map events */}
        <MapEvents />

        {/* Marker at the current coordinates */}
        <Marker position={coordinates}>
          <Popup>Current location</Popup>
        </Marker>

        {places?.map((place, i) => {
          // Check if the place data is available
          {/* console.log(place, "place data"); */}
          return (
            <Marker
              key={i}
              position={[Number(place.latitude), Number(place.longitude)]}
              
            >
              <Popup>
                {/* Render popup content */}
                {isDesktop ? (
                  <Paper elevation={3} style={{ width: '200px' }}>
                    <Typography style={{ padding: '10px' }}>{place.name}</Typography>
                    {/* Ensure image URL exists or provide a fallback */}
                    <img
                      src={place?.photos_sample?.[0]?.photo_url || 'https://via.placeholder.com/150'}
                      alt={place.name || 'Place image'}
                      style={{ width: '100%', height: '100px', padding: '10px' }}
                    />
                    <Rating
                      name="read-only"
                      value={place.rating}
                      precision={0.5}
                      style={{ padding: '10px' }}
                      readOnly
                    />
                  </Paper>
                ) : (
                  <FaLocationDot />
                )}
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>
    </div>
  );
};

export default Map;
