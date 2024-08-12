import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/places',{withCredentials: true}).then(response => {
      setPlaces([...response.data]);
    });
  }, []);

  const filteredPlaces = places.filter(place => 
    place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center mt-6">
        <input 
          type="text"
          className="border border-gray-300 rounded-full py-2 px-4 shadow-md w-3/4 sm:w-1/2 lg:w-1/3"
          placeholder="Search for places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredPlaces.length > 0 ? filteredPlaces.map(place => (
          <Link key={place._id} to={'/place/' + place._id} className="flex flex-col gap-3 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <div className="bg-gray-200 rounded-2xl overflow-hidden flex justify-center items-center">
              {place.photos?.[0] && 
                <img className="rounded-2xl object-cover w-full h-48" src={axios.defaults.baseURL+'/uploads/' + place.photos?.[0]} alt={place.title} />
              }
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">{place.address}</h2>
              <h3 className="text-sm text-gray-600 mt-1 leading-tight">{place.title}</h3>
              <div className="mt-2 text-gray-800">
                <span className="font-bold">${place.price}</span> <span className="text-sm text-gray-500">per night</span>
              </div>
            </div>
          </Link>
        )) : (
          <div className="col-span-full text-center text-gray-500">
            No places found
          </div>
        )}
      </div>
    </div>
  );
}
