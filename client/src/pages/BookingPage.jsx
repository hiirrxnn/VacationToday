import { useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";
import axios from 'axios';
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings')
        .then(response => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          } else {
            setError('Booking not found');
          }
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load booking data');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-4">{booking.place.title}</h1>
      <AddressLink className="text-lg text-blue-600 underline mb-6">{booking.place.address}</AddressLink>
      
      <div className="bg-white p-6 shadow-lg rounded-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Booking Information</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            <span className="font-semibold text-lg">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights</span>
          </div>
          <BookingDates booking={booking} className="text-gray-600" />
        </div>
      </div>
      
      <div className="bg-primary p-6 text-white rounded-2xl mb-8 text-center">
        <h2 className="text-3xl font-bold">Total Price</h2>
        <div className="text-4xl mt-2">${booking.price}</div>
      </div>

      <PlaceGallery place={booking.place} className="rounded-2xl overflow-hidden" />
    </div>
  );
}
