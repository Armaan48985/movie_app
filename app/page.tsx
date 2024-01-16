'use client'
import MovieCard, { fetchDataFromFireStore } from '@/components/MovieCard'
import FetchFromApi  from '@/utils/FetchFromApi'
import { useEffect, useState } from 'react'
import {useSession, signOut} from 'next-auth/react'
import { Button } from '@/components/ui/button'
import roboto from './fonts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface UserData {
  id: string;
  name: string;
  email: string;
  userName: string;
  // ... add other fields as per your actual data structure
}

export default function Home() {

  const session = useSession()

  const [popularShows, setPopularShows] = useState([])
  const [userData, setUserData] = useState<UserData[]>([]);
  const userName = session?.data?.user?.name;

  useEffect(() => {
    const fetchUrl = async() => {
      const {data} = await FetchFromApi.get('tv/popular')
      setPopularShows(data?.results)
    }
    fetchUrl()
  })

    useEffect(() => {
        async function fetchData(){
          const data = await fetchDataFromFireStore(userName);
          setUserData(data) 
        }
        fetchData()
      }, [userData])

  return (
    <div className={`w-full min-h-screen bg-black ${roboto.className} text-white`}>
      <div className='flex justify-between items-center text-white p-8 mx-10 py-10 pt-[4rem]'>
      <h1 className='text-8xl text-slate-50'>Welcome <span className='text-[#FFD700]'>{userName}</span> ! </h1>
        <div className='flex gap-14 justify-center items-center outline-none border-none'>
              <DropdownMenu>
                <DropdownMenuTrigger>Bookmarks</DropdownMenuTrigger>
                <DropdownMenuContent>
                {userData.length == 0 ? 
                  <DropdownMenuItem>Empty List</DropdownMenuItem>
                  :
                userData
                  .map((e,i) => (
                 <DropdownMenuItem key={i}>{JSON.stringify(e.name)}</DropdownMenuItem>    
                ))}
                
                </DropdownMenuContent>
              </DropdownMenu>

          <Button onClick={() => signOut()} className='bg-[#e09c4a] font-bold hover:bg-[#cf9044] px-6'>Logout</Button>
        </div>
      </div>
      <div className='p-5'>
      <h1 className='text-6xl mt-14 p-5 ml-[6.5rem] mb-6'>Popular Movies : </h1>
      <div className='flex flex-wrap gap-20 justify-center items-center' >
      {popularShows.map((data:any, index) => {
          return (
            <MovieCard key={index} {...data}/>
          )
        })}
      </div>
      </div>
    </div>
  )
}

