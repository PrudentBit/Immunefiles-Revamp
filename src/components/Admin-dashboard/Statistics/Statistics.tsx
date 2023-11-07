"use client"

import React, { useEffect, useState } from 'react';
import StorageConsumption from './StorageConsumption';
import LinkAnalytics from './LinkAnalytics';
import AccountsActive from './AccountsActive';
import getAnalytics from '@/utils/api/getAdminAnalyticsAPI';
import getUser from '@/utils/api/getAdminSpecificUserAPI';
import getUsers from '@/utils/api/getAdminUsersAPI';

type Props = {}

const Statistics = (props: Props) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>();

  useEffect(() => {
    async function fetchData() {
      try {
        const analyticsData = await getAnalytics();
        console.log(analyticsData);
        setAnalytics(analyticsData);
  
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  return (
    <div className='w-full h-[30%] flex gap-8'>
      <StorageConsumption storage={analytics?.storage}/>
      <AccountsActive accounts={analytics?.users}/>
      <LinkAnalytics links={analytics?.links}/>
    </div>
  );
}

export default Statistics;
