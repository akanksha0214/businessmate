import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlaceData } from './api';
import axios from 'axios'; // For making API requests
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbMapPinSearch } from "react-icons/tb";
import { SiGooglebigquery } from "react-icons/si";
import { CircularProgress } from '@mui/material';

const theme = createTheme();

const App = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [coordinates, setCoordinates] = useState(null); // No default location, will request later
  const [bounds, setBounds] = useState(null);
  const [inputLocation, setInputLocation] = useState(''); // User input for location
  const [loader,setLoader]=useState(false);

  // Function to request geolocation, triggered by a user gesture (button click)
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => console.error('Geolocation permission denied or error:', error),
      { enableHighAccuracy: true }
    );
  };

  // Function to handle user input and get coordinates from the location input
  const handleLocationSubmit = async (e) => {
    e.preventDefault();
setLoader(true);
    // Geocoding the input location to get latitude and longitude using Nominatim API
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${inputLocation}`);
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newCoordinates = { lat: parseFloat(lat), lng: parseFloat(lon) };

        // Update the coordinates with the geocoded location
        setCoordinates(newCoordinates);
        toast.success('Location found successfully')
      } else {
        toast.info('Location not found. Please enter valid location.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }finally {
      setLoader(false);
    }
  };

  // Fetch place data whenever coordinates or bounds change
  useEffect(() => {
    setIsLoading(true);
    if (bounds && coordinates) {
      console.log('Coordinates:', coordinates);
      console.log('Bounds:', bounds);

      getPlaceData(bounds.sw, bounds.ne)
        .then((data) => {
          if (data && data.length > 0) {
            console.log('Fetched data:', data);
            setPlaces(data); // Update places state with fetched data
            setIsLoading(false);
          } else {
            console.warn('No data returned from API');
          }
        })
        .catch((error) => {
          console.error('Error in getPlaceData:', error);
        });
    }
  }, [coordinates, bounds]);

 



  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Grid container spacing={1} >
          <Grid item xs={12} md={4}>
            <List isLoading={isLoading} places={places} setPlaces={setPlaces} coordinates={coordinates} setCoordinates={setCoordinates} />
          </Grid>
          <Grid item xs={12} md={8} style={{ background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', width: '1300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Input form for user to search location */}
            {/* <h1>Find Businesses around you</h1> */}
            <form onSubmit={handleLocationSubmit} style={{ marginBottom: '16px', display: 'flex' }}>
              <TextField
                label="Enter a location"
                value={inputLocation}
                onChange={(e) => setInputLocation(e.target.value)}
                // variant="outlined"
                size="small"
                style={{ marginRight: '8px', color: 'white' }}
              />
              <ToastContainer />
              {/* {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'} */}

              {
                loader ? <CircularProgress size={24} color='white'/> :  <Button type="submit" variant="contained" style={{ background: 'purple' }}><SiGooglebigquery /> &nbsp; Go</Button>
              }
              
            </form>

            {/* Button to find the user's current location */}
            {coordinates ? (
              <Map places={places} setPlaces={setPlaces} setCoordinates={setCoordinates} coordinates={coordinates} />
            ) : (
              <Button variant="contained" style={{ background: 'purple' }} onClick={handleGetLocation}>
              <TbMapPinSearch /> &nbsp; Find My Location
              </Button>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default App;
