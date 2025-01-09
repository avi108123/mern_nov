import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold'>404 error</h1>
      <p>page not found</p>
      <Link to={'/'} className='text-4xl font-bold m-7'>go to home page</Link>
    </div>
  )
}

export default Notfound
