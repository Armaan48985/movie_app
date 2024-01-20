// /pages/movie.tsx
'use client'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../../app/globals.css'

const MovieDetails = () => {
  const router = useRouter();
  const { original_name, poster_path, overview, vote_average }:any = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const postUrl = (url:string) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${url}`
}

return (
  <div className="min-h-screen bg-black text-white p-8 w-full flex justify-center items-center">
    <div className="flex w-[900px] h-[800px]">
      <div className="">
        <img
          src={postUrl(poster_path)}
          alt="d"
          className="rounded-md w-[800px] h-[800px]"
        />
      </div>
      <div className="ml-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 text-[#FFD700]">{original_name}</h1>
        <p className="text-yellow-400 text-lg mb-2">Rating: {vote_average}</p>
        <p className="text-gray-300 text-lg">{overview}</p>
      </div>
    </div>
  </div>
);
};




export default MovieDetails;
