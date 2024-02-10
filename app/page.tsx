'use client'
import MovieCard, { fetchDataFromFireStore } from '@/components/MovieCard'
import FetchFromApi  from '@/utils/FetchFromApi'
import { useEffect, useState } from 'react'
import {useSession, signOut} from 'next-auth/react'
import { Button } from '@/components/ui/button'
import roboto from './fonts'
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Loading from '@/components/Loading'
import Link from 'next/link'
import { fetchPopularMovies, fetchPopularShows, fetchTopRatedShows } from '@/components/api'
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
  const [ratedShows, setRatedShows] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [userData, setUserData] = useState<UserData[]>([]);
  const userName = session?.data?.user?.name;
  const [currentTab, setCurrentTab] = useState('popularShows');

  const handleTabChange = (tab:any) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularShows();
      setPopularShows(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTopRatedShows();
      setRatedShows(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularMovies();
      setPopularMovies(data);
    };
    fetchData();
  }, []);


    useEffect(() => {
        async function fetchData(){
          const data = await fetchDataFromFireStore(userName);
          setUserData(data) 
        }
        fetchData()
      }, [userName])

    return (
      <div className={`w-full min-h-screen bg-black ${roboto.className} text-white`}>
        <div className='flex justify-between items-center text-white p-8 mx-10 py-10 pt-[4rem]'>
          <h1 className='text-8xl text-slate-50'>
            Welcome <span className='text-[#FFD700]'>{userName}</span> !
          </h1>
          <div className='flex gap-14 justify-center items-center outline-none border-none'>
          <DropdownMenu>
              <DropdownMenuTrigger>Bookmarks</DropdownMenuTrigger>
              <DropdownMenuContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {userData.length === 0 && popularMovies.length === 0 ? (
                  <DropdownMenuItem>Empty List</DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuLabel>Shows:</DropdownMenuLabel>
                    {userData.map((e, i) => (
                      <DropdownMenuItem key={i}> <span style={{ marginRight: '8px', fontSize: '18px' }}>•</span>{JSON.parse(JSON.stringify(e.name))}</DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Movies:</DropdownMenuLabel>
                    {/* {popularMovies.map((e:any, i) => (
                      <DropdownMenuItem key={i}>{JSON.parse(JSON.stringify(e?.name))}</DropdownMenuItem>
                    ))} */}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => signOut()} className='bg-[#e09c4a] font-bold hover:bg-[#cf9044] px-6'>
              Logout
            </Button>
          </div>
        </div>
        <div className='p-5'>
            <div className='relative inline-block ml-[6rem] mb-10 my-10'>
                <select
                  value={currentTab}
                  onChange={(e) => handleTabChange(e.target.value)}
                  className='text-lg px-7 py-4 border rounded-md bg-gray-800 text-white z-20 border-none focus:border-white flex items-center gap-10'
                >
                  <option value='popularShows' className='py-10 mt-10'>Popular Shows</option>
                  <option value='ratedShows' className='py-10'>Top Rated Shows</option>
                  <option value='popularMovies' className='py-10'>Popular Movies</option>
                </select>
                <div className='absolute top-5 right-0 pointer-events-none pr-2 pl-auto'>
                  <IoIosArrowDown className='text-white text-xl' />
                </div>
            </div>
      
            <div className='flex flex-wrap gap-20 justify-center items-center'>
            {currentTab === 'popularShows' && popularShows.length > 0 ? (
                    popularShows.map((data: any, index) => (
                    
                        <MovieCard {...data} />
                     
                    ))
                  ) : currentTab === 'ratedShows' && ratedShows.length > 0 ? (
                    ratedShows.map((data: any, index) => (
                      <Link
                        href={{
                          pathname: '/movie',
                          query: { ...data }, // Include all details from the data object
                        }}
                        key={index}
                      >
                        <MovieCard {...data} />
                      </Link>
                    ))
                  ) : currentTab === 'popularMovies' && popularMovies.length > 0 ? (
                    popularMovies.map((data: any, index) => (
                      <Link
                        href={{
                          pathname: '/movie',
                          query: { ...data }, // Include all details from the data object
                        }}
                        key={index}
                      >
                        <MovieCard {...data} />
                      </Link>
                    ))
                  ) : (
                    <Loading />
                  )}

            </div>
        </div>
      </div>
    );
    
    
}

