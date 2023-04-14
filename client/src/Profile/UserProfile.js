import React, { useEffect,useState } from 'react'
import { getUserBooking } from '../api-helpers/api-helpers';

function UserProfile() {
  const [booking,setBooking] = useState();
  useEffect(()=>{
getUserBooking().then(res=>setBooking(res.bookings)).catch(err=>{console.error(err)});;
  },[])
  console.log(booking);
  return (
    <div>
      UserProfile
    </div>
  )
}

export default UserProfile
