import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from 'axios';
import { differenceInCalendarDays } from "date-fns";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery,setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/bookings',{withCredentials: true}).then(response => {
      setBookings(response.data);
    });
  }, []);

  const filteredBookings = bookings.filter(booking => 
    booking.place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.place.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <AccountNav />
      <div className="flex justify-center mt-6">
        <input 
          type="text"
          className="border border-gray-300 rounded-full py-2 px-4 shadow-md w-3/4 sm:w-1/2 lg:w-1/3"
          placeholder="Search for bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-8 mx-auto max-w-4xl px-4">
        {filteredBookings?.length > 0 ? (
          filteredBookings.map(booking => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex gap-4 mt-8 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-48 h-32 overflow-hidden rounded-lg">
                <PlaceImg place={booking.place} className="object-cover h-full w-full" />
              </div>
              <div className="flex flex-col justify-between grow">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  <span className="font-medium">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:</span>
                  <BookingDates booking={booking} />
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                  </svg>
                  <span>Total Price:</span>
                  <span className="font-bold">${booking.price}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
