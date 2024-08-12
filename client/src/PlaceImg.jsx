import axios from "axios";

export default function PlaceImg({place,index=0,classname=null}){
  if(!place.photos?.length){
    return "";
  }
  if(!classname){
    classname+='object-cover'
  }
  return (
    <div>
      <img className={classname} src={axios.defaults.baseURL+'/uploads/'+place.photos[index]}/>
    </div>
  )
}