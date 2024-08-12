import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const price = numberOfDays * place.price;
    const data = {
      checkIn,
      checkOut,
      maxGuests,
      name,
      phone,
      place: place._id,
      price
    };

    try {
      const response = await axios.post('/bookings', data , {
        withCredentials: true });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='bg-white border shadow-lg p-6 rounded-2xl text-center'>
      <div className='text-lg font-semibold'>
        Price: <span className='text-xl text-blue-600'>${place.price}</span> / night
      </div>

      <div className='my-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='w-full md:w-1/2 pr-2 mb-4 md:mb-0'>
            <label className='block font-semibold mb-2'>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          <div className='w-full md:w-1/2 pl-2'>
            <label className='block font-semibold mb-2'>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
        </div>
      </div>

      <div className='my-4'>
        <label className='block font-semibold mb-2'>Number of guests:</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(ev) => setMaxGuests(ev.target.value)}
          className='w-full p-2 border rounded-md'
        />
      </div>

      {numberOfDays > 0 && (
        <>
          <div className='my-4'>
            <label className='block font-semibold mb-2'>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
          <div className='my-4'>
            <label className='block font-semibold mb-2'>Your Cell:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className='w-full p-2 border rounded-md'
            />
          </div>
        </>
      )}

      <button
        onClick={bookThisPlace}
        className='w-full mt-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform duration-200 hover:scale-105'
      >
        Book this place: 
        {numberOfDays > 0 && (
          <span className='ml-2'>${numberOfDays * place.price}</span>
        )}
      </button>
    </div>
  );
}
