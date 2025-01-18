import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
// import LocationIcon from '@mui/icons-material/LocationOn';
// import Phoneicon from '@mui/icons-material/Phone';
import { Rating } from '@mui/material';
import useStyles from './style.js';
import { FiStar } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";


const PlaceDetails = ({ place }) => {



  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  // console.log(place, "data");
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 40; // Adjust the 20 to increase/decrease tilt intensity
    const y = ((e.clientY - top) / height - 0.5) * -50; // Adjust the -20 to increase/decrease tilt intensity

    setTransform({ rotateX: y, rotateY: x });

  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 }); // Reset tilt

  };
  const classes = useStyles();
  return (

    <Card elevation={0} className={classes.card}
      style={{
        transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* <CardMedia
        style={{ height: 200, margin: '5px', border: '4px solid gray', borderRadius: '10px' }}
        image={place?.photos_sample?.[0]?.photo_url}
        title={place.name}
      /> */}
      <div className={classes.cardContainer}>
        <CardMedia
        
          className={classes.cardMedia}
          image={place?.photos_sample?.[0]?.photo_url}
          title={place.name}
        />

        <a
          href={place.place_link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.btn}
        >
          <span className={classes.btnSpan}>Visit Website</span>
        </a>
      </div>

      <CardContent >
        <Typography style={{ fontFamily: 'fantasy', fontSize: '28px', color: 'white' }}>{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.subtitle}><FiStar /> &nbsp; Rating </Typography>
          <Rating
            name="read-only"
            value={place.rating}
            precision={0.5}
            readOnly
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom className={classes.subtitle}> <FaPhone /> &nbsp; Phone Number </Typography>
          <Typography gutterBottom className={classes.subtitle}>{place.phone_number}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" marginTop="10px" marginBottom="15px">
          <Typography gutterBottom className={classes.subtitle} style={{ minWidth: '85px', flexShrink: 0, marginRight: "80px" }}><MdAccessTime /> &nbsp; Timing </Typography>
          <Typography gutterBottom className={classes.subtitle} style={{ fontSize: '14px', flex: 1, wordBreak: 'break-word' }}>{place.opening_status}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" marginTop="10px" marginBottom="15px">
          <Typography gutterBottom className={classes.address} style={{ minWidth: '85px', flexShrink: 0, marginRight: "80px" }}>
            <FaMapLocationDot /> Address
          </Typography>
          <Typography className={classes.address} style={{ fontSize: '14px', flex: 1, wordBreak: 'break-word' }}>
            {place.address}
          </Typography>
        </Box>
      </CardContent>
    </Card>

  )
}

export default PlaceDetails