import React from 'react'

interface ParamsType {
   name: string;
}

const page = ({params} :{params: ParamsType}) => {
  return (
    <div>
        <h1>nice to meet you {params.name} </h1>
    </div>
  )
}

export default page