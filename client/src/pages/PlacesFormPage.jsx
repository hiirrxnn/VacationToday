import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Perks from "../Perks";
import PhotosUploader from '../PhotosUploader';

export default function PlacesFormPage() {
  const { id } = useParams();
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [price, setPrice] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxNoOfGuests, setMaxNoOfGuests] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxNoOfGuests(data.maxNoOfGuests);
      setDescription(data.description);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl font-semibold mt-6">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm mb-2">{text}</p>
    );
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos, description,
      perks, checkIn, checkOut, extraInfo,
      maxNoOfGuests, price
    };
    if (id) {
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <form onSubmit={savePlace} className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      {preInput('Title', 'Title for your place (should be something catchy)')}
      <input
        className="w-full p-2 border rounded-md mb-4"
        type="text"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        placeholder="e.g., My Sweet Home"
      />

      {preInput('Address', 'Full Address including Postal Code')}
      <input
        className="w-full p-2 border rounded-md mb-4"
        type="text"
        value={address}
        onChange={ev => setAddress(ev.target.value)}
        placeholder="e.g., 1234 Main St, City, Country"
      />

      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

      {preInput('Description', 'Describe your place briefly')}
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
        placeholder="A brief description of your place"
      />

      {preInput('Perks', 'Select all the perks relevant to your place')}
      <Perks selected={perks} onChange={setPerks} />

      {preInput('Extra Info', 'House rules, etc.')}
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        value={extraInfo}
        onChange={ev => setExtraInfo(ev.target.value)}
        placeholder="Additional information (house rules, etc.)"
      />

      {preInput('Check-In & Check-Out Time & Max No. of Guests', 'Enter check-in, check-out times, and max no. of guests')}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="p-2 border rounded-md"
          type="text"
          placeholder="Check-in (e.g., 14:00)"
          value={checkIn}
          onChange={ev => setCheckIn(ev.target.value)}
        />
        <input
          className="p-2 border rounded-md"
          type="text"
          placeholder="Check-out (e.g., 11:00)"
          value={checkOut}
          onChange={ev => setCheckOut(ev.target.value)}
        />
        <input
          className="p-2 border rounded-md"
          type="number"
          placeholder="Max guests"
          value={maxNoOfGuests}
          onChange={ev => setMaxNoOfGuests(ev.target.value)}
        />
        <input
          className="p-2 border rounded-md"
          type="number"
          placeholder="Price per night"
          value={price}
          onChange={ev => setPrice(ev.target.value)}
        />
      </div>

      <button className="mt-6 w-full bg-primary text-white p-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300" type="submit">
        Save
      </button>
    </form>
  );
}
