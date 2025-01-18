import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputBase, Button, FormControl, chipClasses } from '@mui/material';
import useStyles from './style.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';
import { getPlaceData } from '../../api/index.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgPlayListSearch } from "react-icons/cg";

const List = ({ coordinates, setCoordinates, places, setPlaces}) => {
  const classes = useStyles();
  const [query, setQuery] = useState(''); // User's input for business search
  const [loading, setLoading] = useState(false); // Loading state
  
  const handleSearch = async () => {
    if (!query) {
      toast.info("Please enter a business type to search.");
      return;
    }

    // Debugging: Log coordinates
    console.log("Current coordinates:", coordinates);

    if (!coordinates || !coordinates.lat || !coordinates.lng) {
      toast.info("Coordinates are missing. Please allow location access or provide valid coordinates.");
      return;
    }

    setLoading(true);
    try {
      const data = await getPlaceData(coordinates.lat, coordinates.lng, query, 5000); // Pass query and coordinates
      setPlaces(data);

      if (data.length > 0) {
        setCoordinates({ lat: data[0].latitude, lng: data[0].longitude }); // Optionally recenter the map
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast.info("No businesses found around you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <InputBase
          style={{ border: '2px solid grey', borderRadius: '5px', height: '3.5rem', width: '20rem', padding: '0 1rem', color: 'wheat' }}
          placeholder="Enter business type (e.g., Pizza)"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state
        />
        <ToastContainer />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={!query || loading} style={{ background: 'purple' }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </Button>
      </FormControl>

      {/* Display Fetched Places */}
      <Grid container spacing={3} className={classes.list} style={{ marginTop: '2rem' }}>
        {places?.length > 0 ? (
          places.map((place, i) => (
            <Grid item key={i} xs={12}>
              <PlaceDetails
                place={place}
                
              />
            </Grid>
          ))
        ) : (
          !loading && (
            <Typography variant="h6" color="textSecondary" style={{ marginTop: '2rem', marginLeft: '2rem' }}>
              No businesses found. Try searching with a different query.
            </Typography>
          )
        )}
      </Grid>
    </div>
  );
};

export default List;
