import React from 'react'

import movieImage from '../../assets/movie.png'

import Image from 'next/image'

const page = () => {
  return (
    <div>
        we will show the image here
        <Image src={movieImage} alt='movie image'></Image>
        <Image src={movieImage} alt='movie image' width={50}></Image>
    </div>
  )
}

export default page