import Image from 'next/image'
import React from 'react'

import { useStyles } from '../../styles/components/SimpleCategoryCardStyle';

const SimpleCategoryCard = ({ data }: any) => {
    const classes = useStyles()
    return (
        <div className={classes.imageDiv}>
            <Image src={data?.image} className={classes.image} />
            <h3 className={classes.title}>{data?.title}</h3>
        </div>
    )
}

export default SimpleCategoryCard