import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [searchQuery,setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/user-places',{withCredentials: true}).then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const filteredPlaces = places.filter(place => 
    place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <AccountNav />
      <div className="flex justify-center mt-6">
        <input 
          type="text"
          className="border border-gray-300 rounded-full py-2 px-4 shadow-md w-3/4 sm:w-1/2 lg:w-1/3"
          placeholder="Search for places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
      <div className="text-center my-10">
        <Link
          className="bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-2 shadow-md hover:bg-primary-dark transition-colors duration-300"
          to="/account/places/new">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="max-w-5xl mx-auto px-4">
        {filteredPlaces.length > 0 ? (
          <div className="space-y-4">
            {filteredPlaces.map(place => (
              <Link
                key={place._id}
                to={`/account/places/${place._id}`}
                className="flex gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-32 h-32 overflow-hidden rounded-lg bg-gray-300 flex-shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      className="h-full w-full object-cover"
                      src={axios.defaults.baseURL+`/uploads/${place.photos[0]}`}
                      alt={place.title}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">{place.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{place.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">No places found.</div>
        )}
      </div>
    </div>
  );
}
