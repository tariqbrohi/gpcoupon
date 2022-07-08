import Router from 'next/router';
import React from 'react';
import currencyFormat from '../lib/currency-format';
import getCurrencySymbol from '../lib/get-currency-symbol';
import Spacer from './Spacer';
import { ROUTES } from '../ROUTES';

export default function Item({
  id,
  imageUrl,
  amount,
  name,
  extendedName,
  country,
  gpoint,
}: any) {
  return (
    <div
      style={{ minWidth: `274px`, width: `274px`, cursor: `pointer` }}
      onClick={() => Router.push(`${ROUTES.item}/${id}`)}
    >
      <div
        style={{
          width: `100%`,
          borderRadius: `14px`,
          overflow: `hidden`,
        }}
      >
        <img src={imageUrl} />
      </div>
      <Spacer size={30} />
      <p style={{ fontWeight: 600 }}>{name}</p>
      <Spacer size={15} />
      <p>{extendedName}</p>
      <Spacer size={15} />
      {/* {amount && (
        <p style={{ fontWeight: 600 }}>
          {getCurrencySymbol(country)}
          {currencyFormat(amount)}
        </p>
      )}
      {gpoint && (
        <p style={{ fontWeight: 600 }}>
          {getCurrencySymbol()}
          {currencyFormat(gpoint)}
        </p>
      )} */}
    </div>
  );
}
