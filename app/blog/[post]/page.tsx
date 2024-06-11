import React from 'react'

const page = ({params}:{params:any}) => {
  return (
    <div>
        <h1>Post : {params.post}</h1>
    </div>
  )
}

export default page