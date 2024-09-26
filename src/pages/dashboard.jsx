import React from 'react'
import Navigation from '../components/navigation'
import icon1 from "../assets/div.MuiBox-root.png"
import icon2 from "../assets/iconly-glass-discount.svg.png"
import icon3 from "../assets/div.MuiBox-root (1).png"

const Dashboard = () => {
  return (
    <div className='w-[100%] flex'> 
      <Navigation/>
      <div className='p-[10px]'>
        <h1 className='text-[30px] font-[800] '>Dashboard</h1>
        <div className='flex items-start'>
          <div className=''>
              <div className='flex items-center flex-wrap gap-[20px]'>
                <div className='w-[230px] h-[84px] rounded-[10px] flex items-center justify-evenly gap-[-10px] bg-[#FEF3F2]'>
                  <img src={icon1} className='w-[50px]' alt="" />
                  <div className='flex flex-col items-start gap-[-10px]'>
                    <h1 className='text-[#6C737F] text-[14px]'>Sales</h1>
                    <h1 className='text-[24px] font-[800]'>$152k</h1>
                  </div>
                </div>

                <div className='w-[230px] h-[84px] rounded-[10px] flex items-center justify-evenly gap-[-10px] bg-[#FFFAEB]'>
                  <img src={icon2} className='w-[50px]' alt="" />
                  <div className='flex flex-col items-start gap-[-10px]'>
                    <h1 className='text-[#6C737F] text-[14px]'>Sales</h1>
                    <h1 className='text-[24px] font-[800]'>$152k</h1>
                  </div>
                </div>

                <div className='w-[230px] h-[84px] rounded-[10px] flex items-center justify-evenly gap-[-10px] bg-[#F0FDF9]'>
                  <img src={icon3} className='w-[50px]' alt="" />
                  <div className='flex flex-col items-start gap-[-10px]'>
                    <h1 className='text-[#6C737F] text-[14px]'>Sales</h1>
                    <h1 className='text-[24px] font-[800]'>$152k</h1>
                  </div>
                </div>
              </div>
          </div>

          <div className=''>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
