import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) =>{

      const navigate = useNavigate()

      const[selected, setSelected] = useState(null)

      const onBookhandle = () => {
        if(!selected) {
          return toast ('Please select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0)
      }
  return (
    <div id="dateSelect" className="pt-30">
      <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
        
        <BlurCircle top="-100px" right="-100px" />
        <BlurCircle top="-100px" left="0px" />

        <div>
          <p className='text-lg font-semibold'>Choose Date</p>

          <div className='flex items-center gap-6 text-sm mt-5'>
            
            <ChevronLeftIcon width={28} />

            <div className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
              {Object.keys(dateTime).map((date) => (
                <button onClick={()=> setSelected(date)}
                  key={date}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer bg-gray-800 hover:bg-primary/30 transition ${selected === date ? 'bg-primary' : 'border border-gray-700'}`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", { month: 'short' })}
                  </span>
                </button>
              ))}
            </div>

            <ChevronRightIcon width={28} />

          </div>
        </div>
      </div>

      <button onClick={onBookhandle} className="mt-6 bg-primary text-white px-6 py-3 rounded-lg transition-all hover:bg-primary/80 cursor-pointer">
        Book Now
      </button>
    </div>
  )
}

export default DateSelect
