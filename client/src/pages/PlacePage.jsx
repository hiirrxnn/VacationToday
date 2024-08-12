import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import axios from 'axios';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get('/places/' + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <>
      <div className='mt-8 bg-gray-100 -mx-8 px-8 py-8 border rounded-2xl relative'>
        <h1 className='text-3xl font-bold'>{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
      </div>

      <div className='bg-gray-100 mt-8 p-8 rounded-2xl grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <h2 className='font-bold text-2xl mb-4'>Description</h2>
          <p className='text-gray-700 leading-6'>{place.description}</p>
          <div className='mt-6'>
            <h3 className='font-semibold text-lg mb-2'>House Rules</h3>
            <ul className='space-y-2'>
              <li><b>Check-in:</b> {place.checkIn}:00 hours</li>
              <li><b>Check-out:</b> {place.checkOut}:00 hours</li>
              <li><b>Max number of guests:</b> {place.maxNoOfGuests}</li>
            </ul>
          </div>
        </div>
        <BookingWidget place={place} />
      </div>

      <div className='border-t mt-8 pt-8 text-sm text-gray-700 leading-6'>
        <h2 className='font-bold text-2xl mb-4'>Extra Info</h2>
        <p>{place.extraInfo}</p>
      </div>
    </>
  );
}
