//import PhotosUploader from "../PhotosUploader.jsx";
import {useEffect, useState} from "react";

import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";
import Perks from "../Perks.jsx";
import axios from "axios";
export default function PlacesFormPage() {
 // const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [photoLink,setPhotoLink] = useState('');
  const [redirect,setRedirect] = useState(false);
 /* useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);*/
   function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

/*   async function addPhotoByLink(ev){
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link',{link:photoLink})
    setAddedPhotos(prev => {
      return [...prev, filename]
    });
    setPhotoLink('');
   } */

   function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      setAddedPhotos(prev => {
        return [...prev, ...filenames];
      });
    })
  }



  async function savePlace(ev) {
    ev.preventDefault();
   /*  const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    }; */
    
      await axios.post('/places', {
        title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price
        
      });
      setRedirect(true);
   

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  } 

  return (
    <div>
      <AccountNav />
       <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
         {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
        {preInput('Photos','more = better')}

       {/*  
        <div className="flex gap-2">
        <input value={photoLink}
               onChange={ev => setPhotoLink(ev.target.value)}
               type="text" placeholder={'Add using a link ....jpg'}/>
        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
      </div> */}
{/*upload image*/}
<div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  {addedPhotos.length > 0 && addedPhotos.map(link =>(
    <div className="h-32 flex relative" key={link}>
 <img src={'http://localhost:4000/uploads/'+link} className="rounded-2xl w-full object-cover"/>   
 </div>
  ))}
 
  <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
  <input type="file" multiple className="hidden" onChange={uploadPhoto} />
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
  </label>
  
</div>
       
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />



        {preInput('Perks','select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
       
        {preInput('Extra info','house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>  
      </form> 
    </div>
  );
}