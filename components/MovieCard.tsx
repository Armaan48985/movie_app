'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdStarRate } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { db } from '@/app/firebaseConfig';
import { doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';


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
  }
  catch{
    return false;
  }
}

// export async function fetchDataFromFireStore(){
//   const querySnapshot = await getDoc(doc(db, "name"))

//   const data:any = []
//   querySnapshot.forEach((doc:any) => {
//     data.push({id:doc.id, ...doc.data()})
//   })
//   return data;
// }

const MovieCard = ({original_name, poster_path, overview, vote_average}:any) => {

  const [bookmark, setBookmark] = useState(false)
  const [name, setName] = useState("")

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await bookmark ? addDataToFireStore(name) : removeDataFromFireStore(name);
    setName("")
  }

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
          }} className='text-2xl' type='submit'>{bookmark ? <IoBookmark/> : <IoBookmarkOutline/>}</button>
        </form>

       </div>
        <p className='w-[200px] text-sm text-gray-400'>{overview.slice(0,100)}...</p>
    </div>
  )
}

export default MovieCard