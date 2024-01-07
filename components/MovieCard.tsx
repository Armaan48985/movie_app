import Image from 'next/image'
import React from 'react'

const postUrl = (url:string) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${url}`
}

const MovieCard = ({original_name, poster_path}:any) => {
  return (
    <div>
        <img
         src={`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
         alt='poster'
         width={200}
         height={200}
        />
        <h1>{original_name}</h1>
    </div>
  )
}

export default MovieCard