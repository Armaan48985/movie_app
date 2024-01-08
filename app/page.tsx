'use client'
import MovieCard from '@/components/MovieCard'
import FetchFromApi  from '@/utils/FetchFromApi'
import { useEffect, useState } from 'react'
import {useSession, signOut} from 'next-auth/react'

export default function Home() {

  const session = useSession()

  const [popularShows, setPopularShows] = useState([])
  // const[videos, setVideos] = useState([])

  console.log("hello")

  useEffect(() => {
    const fetchUrl = async() => {
      const {data} = await FetchFromApi.get('tv/popular')
      setPopularShows(data?.results)
    }

    fetchUrl()
  })


  return (
    <div>
      <h1>Welcome {session?.data?.user?.name}</h1>
      <button onClick={() => signOut()}>Logout</button>
      {popularShows.map((data:any, index) => {
        return (
          <MovieCard key={index} {...data}/>
        )
      })}
    </div>
  )
}

