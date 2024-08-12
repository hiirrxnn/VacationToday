import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
export default function RegisterPage(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  async function registerUser(ev){
    ev.preventDefault();
    try{
      await axios.post('/register',{
        name,
        email,
        password
      });
      alert('Registration Succesful. You can log in');
    }catch(e){
      alert('Registration failed , please try again')
    }
  }
  return (
    <div className="mt-4 grow">
      <h1 className="text-4xl text-center m-8">Register</h1>
    <form className="max-w-xl mx-auto" onSubmit={registerUser}>
      <input type="text" 
      placeholder="John Doe"
      value={name}
      onChange={ev=>setName(ev.target.value)}
      />
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
      <button className="primary mt-2" type="submit">Register</button>
      <div className="text-center py-2 text-gray-500">Already a member ?<Link to={'/login'} className="underline text-black"> Login</Link></div> 
    </form>
    </div>
  )
}