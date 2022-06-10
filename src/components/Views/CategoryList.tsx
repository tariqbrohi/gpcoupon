import React, { useState } from 'react'

import { useStyles } from '../../styles/components/CategoryListStyle';

import GridViewIcon from '@mui/icons-material/GridViewOutlined';
import CakeIcon from '@mui/icons-material/CakeOutlined';
import FilterVintageIcon from '@mui/icons-material/FilterVintageOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcardOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import FastfoodIcon from '@mui/icons-material/FastfoodOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';

const Data = [
    {
        icon: <GridViewIcon />,
        name: 'All',
        id: 1
    },
    {
        icon: <CakeIcon />,
        name: 'Cakes & Desserts',
        id: 2
    },
    {
        icon: <FilterVintageIcon />,
        name: 'Flowers & Plants & Fruit Hampers',
        id: 3
    },
    {
        icon: <CardGiftcardIcon />,
        name: 'Gift Sets',
        id: 4
    },
    {
        icon: <ShoppingBasketIcon />,
        name: 'Shopping',
        id: 5
    },
    {
        icon: <AppleIcon />,
        name: 'Grocery',
        id: 6
    },
    {
        icon: <FastfoodIcon />,
        name: 'Fast Food',
        id: 7
    },
    {
        icon: <RestaurantOutlinedIcon />,
        name: 'Hotel & Restaurant',
        id: 8
    },
    {
        icon: <TvOutlinedIcon />,
        name: 'Small Appliance',
        id: 9
    },
    {
        icon: <KitchenOutlinedIcon />,
        name: 'Kitchen',
        id: 10
    },
]
const CategoryList = ({ setheading }: any) => {
    const classes = useStyles()
    const [active, setactive] = useState(1)

    return (
        <div className={classes.container}>
            {Data?.map(data => (
                <div className={`${active === data?.id && classes.active} ${classes.list}`}
                    onClick={() => {
                        setactive(data?.id)
                        setheading(data?.name)
                    }}>
                    <span>{data.icon}</span>
                    <h2 className={classes.name}>{data?.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default CategoryList