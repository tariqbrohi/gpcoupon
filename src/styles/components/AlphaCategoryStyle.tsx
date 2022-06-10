import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem'
    },
    main: {
        width: '80%'
    }


}));
