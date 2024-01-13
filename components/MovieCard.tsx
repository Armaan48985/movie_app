'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdStarRate } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { db } from '@/app/firebaseConfig';
import { doc, deleteDoc, setDoc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';


const postUrl = (url:string) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${url}`
}



async function addDataToFireStore(name:any, userName:any) {
  try {
    const userCollectionRef = collection(db, 'users');

    const userDocumentRef = doc(userCollectionRef, userName);

    const bookmarksCollectionRef = collection(userDocumentRef, 'bookmarks');

    // Add the movie data to the bookmarks subcollection
    const docRef = await addDoc(bookmarksCollectionRef,{
      name: name,
    });
    return true;
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
    return false;
  }
}

export async function fetchDataFromFireStore(userName?: string, filterCondition?: (docData: any) => boolean) {
  try {
      const userCollectionRef = collection(db, 'users');
      const userDocumentRef = doc(userCollectionRef, 'naruto');
      const bookmarksCollectionRef = collection(userDocumentRef, 'bookmarks');

   
      const querySnapshot = await getDocs(bookmarksCollectionRef);

      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
          data.push({ id: doc.id, ...docData });
      
      });
      return data;
    } 
  catch (error) {
    console.error('Error fetching data from Firestore:', error);
    return [];
  }
}

interface UserData {
  id: string;
  name: string;
  email: string;
  userName: string;
  // ... add other fields as per your actual data structure
}
  const MovieCard = ({original_name, poster_path, overview, vote_average}:any) => {
    
    const [bookmark, setBookmark] = useState(false)
    const [name, setName] = useState("")
    const [userData, setUserData] = useState<UserData[]>([]);
    const session = useSession();
    const userName = session?.data?.user?.name;
    let luffy = userData.some((user) => user.name === original_name);
      
    useEffect(() => {
      async function fetchData(){
        const data = await fetchDataFromFireStore();
        setUserData(data) 
      }
      fetchData()
    }, [luffy])
    
    useEffect(() => {
      userData.filter(e => e.userName == session?.data?.user?.name)
    },[])


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await addDataToFireStore(name, userName)
    window.location.reload()
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
          }} className='text-2xl' type='submit'>{luffy ? <IoBookmark/> : <IoBookmarkOutline/>}</button>
        </form>

       </div>
        <p className='w-[200px] text-sm text-gray-400'>{overview.slice(0,100)}...</p>
       
    </div>
  )
}

export default MovieCard