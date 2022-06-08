import React from 'react';
import { useStyles } from '../../styles/components/HowToStyles';
import Image from 'next/image';
import { Button } from '@mui/material';
import timing from '../../asset/timing.svg';
import global_pay from '../../asset/global_pay.svg';
import gift_on_the_go from '../../asset/gift_on_the_go.svg';

const Card = (data: any) => {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <Image src={data.image}
                className={classes.image}
            />
            <h4 className={classes.heading}>
                {data.heading}
            </h4>
            <p className={classes.para}>
                {data.para}
            </p>
        </div>
    )
}

const HowTo = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <Card
                    heading={'Gift on the go'}
                    para={'Shop in 3 minutes and delivered for instant use'}
                    image={gift_on_the_go}
                />
                <Card
                    heading={'Gift at ease'}
                    para={'Pay with your debit / credit card'}
                    image={global_pay}
                />
                <Card
                    heading={'Gift on time'}
                    para={'Real time mobile delivery 365 days, 24 hours'}
                    image={timing}
                />
            </div>
            <Button
                className={classes.buttonContained} variant="contained">
                How to use
            </Button>
        </div>
    );
};

export default HowTo;
