import React from 'react'
import Navigation from '../components/navigation'

const Dashboard = () => {
  return (
    <div className='w-[100%] flex'> 
      <Navigation/>
      <div className='p-[10px]'>
        <h1>Hello Dashboard</h1>
      </div>
    </div>
  )
}

export default Dashboard
