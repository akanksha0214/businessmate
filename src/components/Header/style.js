import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export default makeStyles((theme) => ({
    bar: {
        top: 0, left: 0, width: '100%',backgroundColor:"#FF6F61"
    },
    title: {
        display: 'none',
        
        fontFamily:'monospace',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    toolbar: {
        width: '100%', alignItems: 'center',
    },
}));