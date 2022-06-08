import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
    container: {
        display: `flex`,
        flexDirection: 'column',
        alignItems: `center`,
        justifyContent: `space-around`,
        padding: `2rem 0`,
        color: 'grey'
    },
    main: {
        display: `flex`,
        flexWrap: 'wrap',
        alignItems: `baseline`,
        justifyContent: `center`,
        width: `75% !important`,
        gap: `1rem`,
    },
    card: {
        width: `200px`,
        margin: `35px`,
    },
    image: {
        // width: `200px`,
        // height: `200px`,
        // objectFit: `cover`
        padding: `10px !important`
    },
    heading: {
        margin: `10px`
    },
    para: {
        lineHeight: `1.4em`
    },
    // left: {
    //     display: `flex`,
    //     alignItems: `center`,
    //     justifyContent: `center`,
    // },
    buttonContained: {
        fontWeight: 600,
        textTransform: 'none',
        width: `220px`,
        borderRadius: '12px',
        padding: `10px`,
        background: `var(--primary)`,
        '&:hover': {
            background: `var(--primaryHover)`,
        },
    },
}));
