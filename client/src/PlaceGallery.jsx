import { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

export default function PlaceGallery({place}){
const [showAllPhotos,setShowAllPhotos] = useState(false);

  if(showAllPhotos){
    return (
      <div className='absolute inset-0 bg-black min-h-screen'>
        <div className='p-8 grid gap-4 bg-black'>
          <div>
            <h2 className='text-2xl text-white font-bold'>Photos of {place.title}</h2>
            <button onClick={()=>setShowAllPhotos(false)} className='flex items-center fixed right-12 py-1 px-1 rounded-md top-8 gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
              Close Photos
            </button>
          </div>
          {place.photos?.length>0 && place.photos.map(photo=>(
            <div className='flex flex-col justify-center items-center'>
              <img className='min-h-screen min-w-screen' src={axios.defaults.baseURL+'/uploads/'+photo} alt=""/>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return(
    <div className=''>
      <div className=' grid gap-2 grid-cols-[2fr_1fr] rounded-3xl'>
      <div>
        {place.photos?.[0] && (
          <img onClick={()=>{setShowAllPhotos(true)}} className='' src={axios.defaults.baseURL+"/uploads/"+place.photos[0]}/>
        )}
      </div>
      <div className='rounded-2xl'>
        {place.photos?.[1] && (
          <img onClick={()=>{setShowAllPhotos(true)}} className='' src={axios.defaults.baseURL+"/uploads/"+place.photos[1]}/>
        )}
        {place.photos?.[2] && (
          <img onClick={()=>{setShowAllPhotos(true)}} className='' src={axios.defaults.baseURL+"/uploads/"+place.photos[2]}/>
        )}      
      </div>
    <div className='flex absolute right-10 bottom-10'>
      <button onClick={()=>setShowAllPhotos(true)} className='py-1 flex items-center gap-2 bg-white rounded-lg border border-black bottom-10 px-2 shadow shadow-gray-500'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
      </svg>
        Show all photos!</button>     
    </div>   
    </div>
  </div>
  )
}