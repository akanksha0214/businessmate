import axios from 'axios';

const URL = 'https://local-business-search.p.rapidapi.com/search-nearby';

export const getPlaceData = async (latitude, longitude, query, radius = 5000) => {
  if (!latitude || !longitude) {
    console.error("Latitude and longitude are required.");
    return [];
  }

  if (!query) {
    console.error("Query parameter is required.");
    return [];
  }

  const options = {
    method: 'GET',
    url: URL,
    params: {
      query,              // Search query (e.g., "plumbers")
      lat: latitude,      // Latitude of the center
      lng: longitude,     // Longitude of the center
      limit: '20',        // Limit to 20 results
      language: 'en',     // Language for the search results
      region: 'IN',       // Region for the search
      extract_emails_and_contacts: 'false', // Do not extract emails and contacts
    },
    headers: {
      'x-rapidapi-key': '2a22083e7dmshbcf4ef775d07f5dp11b170jsn5ec5150d51d2', // Your RapidAPI key
      // 'x-rapidapi-key': process.env.REACT_DATA_API,
      'x-rapidapi-host': 'local-business-search.p.rapidapi.com', // API host
    }
  };

  try {
    const response = await axios.request(options);
    return response.data?.data || []; // Return the data if available
  } catch (error) {
    console.error("Error fetching place data:", error.response ? error.response.data : error.message);
    return [];
  }
};
