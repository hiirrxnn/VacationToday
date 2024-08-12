import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../UserContext";
export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser} = useContext(UserContext);
  async function loginFunction(ev){
    ev.preventDefault();
    try{
      const {data:userDoc} = await axios.post('/login',{email,password},{withCredentials:true});
      setUser(userDoc);
      setRedirect(true);
      alert('Login successful');
    }catch(e){
      alert('Login failed!');
    }
    
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
 
  return (
    <div className="mt-4 grow">
      <h1 className="text-4xl text-center m-8">Login</h1>
    <form className="max-w-xl mx-auto" onSubmit={loginFunction}>
      <input type="email" 
      placeholder="your@gmail.com"
      value={email}
      onChange={ev=>setEmail(ev.target.value)}
      />
      <input type="password" 
      placeholder="password"
      value={password}
      onChange={ev=>setPassword(ev.target.value)}
      />
      <button className="primary mt-2" type="submit">Login</button>
      <div className="text-center py-2 text-gray-500">Not a member ? <Link to={'/register'} className="underline text-black">Register</Link></div>
    </form>
    </div>
  )
}