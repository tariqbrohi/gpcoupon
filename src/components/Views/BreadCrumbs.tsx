import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadCrumbs = () => {

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            Brand
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={handleClick}
        >
            Name
        </Link>,
        <Typography key="3" color="text.primary">
            Product
        </Typography>,
    ];
    return (
        <div>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </div>
    )
}

export default BreadCrumbs