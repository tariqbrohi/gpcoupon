import Head from '@/modules/components/Head';
import AffiliateDashboardLayout from '@/layouts/AffiliateDashgoardLayout';
import Provider from '@/components/admin/items/Provider';
import React, { useEffect, useState } from 'react';
import { Heading, Pagination, Spacer } from '@growth-ui/react';
// import { useGetAffiliateItemsForAdminDashboardLazyQuery } from '@/services';
import MyCoupon from './myCoupon';
import AppMain from '@/layouts/AppMain';

const TAKE = 20;

export default function CouponDashboard() {
  return (
    <MyCoupon />
  );
}
