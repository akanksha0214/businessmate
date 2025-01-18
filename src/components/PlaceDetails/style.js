import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    card: {
        overflowY: 'auto !important',
        height: '550px',
        backgroundColor: 'rgba(111, 23, 141, 0.8)  !important', // Semi-transparent pink
        backdropFilter: 'blur(10px) !important', // Glass blur effect
        WebkitBackdropFilter: 'blur(10px) !important', // Safari support
        borderRadius: '15px', // Rounded corners
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1) !important', // Custom shadow
        border: '1px solid rgba(255, 255, 255, 0.3) !important', // Light border
        padding: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        position: 'relative',
        perspective: '1000px', // For 3D effect
        transition: 'transform 0.2s ease-out', // Smooth transition
        '&:hover': {
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)', // Larger shadow on hover
        },
        '&::-webkit-scrollbar': {
            width: '8px', // Set the width of the scrollbar
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.1)', // Light track color
            borderRadius: '10px', // Rounded corners for the track
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.5)', // Color of the scrollbar thumb
            borderRadius: '10px', // Rounded corners for the thumb
            border: '2px solid rgba(255, 255, 255, 0.1)', // Optional: small border to enhance the look
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.8)', // Color when hovering over the scrollbar thumb
        },
    },
    inner: {
        transition: 'transform 0.1s ease', // Smooth inner card transition
        transformStyle: 'preserve-3d', // Enable 3D transform
        backfaceVisibility: 'hidden', // Prevent flipping on the back
    },

    chip: {
        margin: '5px 5px 5px 0',
    },
    subtitle: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px', color: 'white'
    },
    address: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px', color: 'white'
    },
    spacing: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'fantasy', fontSize: '34px', color: 'white'
    },
    cardContainer: {
        position: 'relative',
        display: 'inline-block',
        height: '210px',
        width: '400px',
        marginRight: '10px',
        padding: '10px',
        overflow: 'hidden',  // Ensures the link doesn't go outside the image
        '&:hover $btn': {
            display: 'block',
        },
    },
    cardMedia: {
        height: '100%',
        marginRight: '20px',
        border: '1px solid gray',
        transition: 'opacity 0.5s ease',  // Smooth opacity transition on hover
        '&:hover': {
            opacity: 0.7,  // Dim the image on hover
        },
    },
    btn: {
        display: 'none',  // Hidden by default
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundImage: 'linear-gradient(to right, #800080 0%, #DA70D6 100%)',
        borderRadius: '40px',
        boxSizing: 'border-box',
        color: 'purple',
        height: '50px',
        width: '250px',
        fontSize: '1.4em',
        padding: '4px',
        textDecoration: 'none',
        zIndex: 2,
        transition: 'color 0.3s ease',  // Smooth transition for text color
        '&:hover': {
            color: '#fff',  // Text color on hover
        },
    },
    btnSpan: {
        alignItems: 'center',
        background: 'white',
        borderRadius: '40px',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '',
        transition: 'background 0.5s ease',
        width: '100%',
        '&:hover': {
            background: 'transparent',  // Background changes on hover
        },
    },

}));