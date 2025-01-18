import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px', marginLeft: '2rem'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '10px',
    marginTop: '3.5rem',
    background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    width: '500px'
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px', // Set the width of the scrollbar
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.1)', // Light track color
      borderRadius: '10px', // Rounded corners for the track
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(138, 33, 156, 0.5)', // Color of the scrollbar thumb
      borderRadius: '10px', // Rounded corners for the thumb
      border: '2px solid rgba(255, 255, 255, 0.1)', // Optional: small border to enhance the look
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(255, 255, 255, 0.8)', // Color when hovering over the scrollbar thumb
    },
  },
}));