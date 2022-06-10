import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
    container: {
        padding: `2rem 0`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: `column`,
        paddingBottom: `2rem`,
    },
    heading: {
        fontSize: "30px",
        fontWeight: '600',
    },
    para: {
        fontSize: "20px",
        fontWeight: '500',
    },
    box: {
        marginTop: '1rem',
        '& .css-zg4tvw-MuiButtonBase-root-MuiTab-root.Mui-selected': {
            color: "black",
        },
        '& .css-1aquho2-MuiTabs-indicator': {
            backgroundColor: 'black',
            height: '3px'
        },
        '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
            color: "black",
        },

    },
    tabHead: {
        color: 'var(--black)',
        fontWeight: '600',
        fontSize: '16px',
        textTransform: 'unset'
    }

}));
