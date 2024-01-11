'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdStarRate } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { db } from '@/app/firebaseConfig';
import { doc, deleteDoc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';


const postUrl = (url:string) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${url}`
}


async function addDataToFireStore(name:any){
  try{
    const docRef = await setDoc(doc(db, "message", name), {
      name: name,
    })
    return true;
  }
  catch{
    return false;
  }
}

async function removeDataFromFireStore(name:any){
  try{
    const docRef = await deleteDoc(doc(db, "message", name))
    return true;
    alert('deleted')
  }
  catch{
    return false;
  }
}

export async function fetchDataFromFireStore() {
  try {
    const querySnapshot = await getDocs(collection(db, 'message')); // Replace 'your_collection_name' with the actual name of your collection

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
    return [];
  }
}
interface UserData {
  id: string;
  name: string;
  email: string;
  // ... add other fields as per your actual data structure
}
  const MovieCard = ({original_name, poster_path, overview, vote_average}:any) => {
    
    const [bookmark, setBookmark] = useState(false)
    const [name, setName] = useState("")
    const [userData, setUserData] = useState<UserData[]>([]);
    let luffy = userData.some((user) => user.name === original_name);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    !luffy && window.location.reload()
    await !luffy ? addDataToFireStore(name) : removeDataFromFireStore(name);
    setName("")
  }

  useEffect(() => {
    async function fetchData(){
      const data = await fetchDataFromFireStore();
      setUserData(data) 
    }
    fetchData()
  }, [])
console.log(luffy)

  return (
    <div>
        <img
         src={postUrl(poster_path)}
         alt='poster'
         width={200}
         height={200}
        />
       <div className='flex justify-between items-center'>
          <div> 
            <h1 className='mt-4'>{original_name}</h1>
            <span className='my-2 text-sm font-bold flex items-center'>{vote_average} <span className='text-[#ffcd58] ml-1 text-lg'><MdStarRate /></span></span>
          </div>
          
        <form onSubmit={handleSubmit}>
          <button onClick={() => {
            setName(original_name)
            setBookmark(e => !e)
          }} className='text-2xl' type='submit'>{luffy ? <IoBookmark/> : <IoBookmarkOutline/>}</button>
        </form>

       </div>
        <p className='w-[200px] text-sm text-gray-400'>{overview.slice(0,100)}...</p>
       
    </div>
  )
}

export default MovieCard