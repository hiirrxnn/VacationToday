import { useContext ,useState } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from "../UserContext.jsx";
import { Navigate, Link } from 'react-router-dom';
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";
export default function ProfilePage(){
  const [redirect,setRedirect]=useState(false);
  const {user,ready , setUser } = useContext(UserContext);
  let {subpage} = useParams();
  if(subpage===undefined){
    subpage='profile'
  }
  async function logout(){
    await axios.post('/logout');
    setUser(null);
    setRedirect('/')
  }
  if(ready && !user){
    return <Navigate to={'/login'}/>
  }

  if(!ready){
    return 'Loading!'
  }
  if(redirect){
    return <Navigate to={redirect}/>
  }
  
  return (
    
    <div>
    <AccountNav />
    {subpage === 'profile' && (
      <div className="text-center my-16 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p className="text-lg">Logged in as <span className="font-bold">{user.name}</span> (<span className="text-gray-600">{user.email}</span>)</p>
        <button
          className="primary max-w-md mt-6 mx-auto py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    )}
    {subpage === 'places' && (
      <PlacesPage />
    )}
  </div>
  )
}