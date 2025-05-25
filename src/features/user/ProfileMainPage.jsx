import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from './UserProfile.jsx';
import OrderPage from '../orders/OrderPage.jsx';

export default function ProfileMainPage() {

  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className='p-5 grid grid-cols-3 gap-5'>

      <UserProfile user={user} />
      <OrderPage user={user} />

    </div>
  )
}
