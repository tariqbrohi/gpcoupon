import currencyFormat from '@/lib/currency-format';
import Grid from '@/modules/components/Grid';
import { useForexMutation, useGPointsQuery } from '@/services'
import { Image, ImageList, Paragraph } from '@growth-ui/react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'

export default function GPoints() {
  const {data} = useGPointsQuery();
  const [forex] = useForexMutation()
  const [rate, setRate] = useState(1)

  useEffect(() => {
    forex({}).then(({data}) => setRate(data)).catch(() => {})
  }, [])

  return (
    <>
      <Paragraph fontWeight={600} fontSize={24}>GPoints</Paragraph>
      <Grid>
        {data?.map(d => (
          <div key={d.id} style={{cursor: 'pointer'}} onClick={() => Router.push(`/gpoints/${d.id}`)}>
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
              <Image src={d.imageUrl} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }} />
            </div>
            <Paragraph fontWeight={500}>{d.name}</Paragraph>
            <Paragraph fontWeight={600}>{currencyFormat(d.amount * rate, 'KRW')}</Paragraph>
          </div>
        ))}
      </Grid>
    </>
  )
}
