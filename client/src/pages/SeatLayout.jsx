import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { ClockIcon, ArrowRightIcon } from 'lucide-react'
import isoTimeFormate from '../lib/isoTimeFormate'
import { toast } from 'react-hot-toast'

const SeatLayout = () => {

  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const showData = dummyShowsData.find(
      show => show._id === id
    )

    if (!showData) return

    setShow({
      movie: showData,
      dateTime: dummyDateTimeData
    })
  }, [id])

  const handleSeatClick = (seatId) => {

    if (!selectedTime) {
      return toast("Please select a time first")
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats")
    }

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    )
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex items-center gap-2'>
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`w-8 h-8 rounded-md border text-xs transition
              ${selectedSeats.includes(seatId)
                ? 'bg-primary text-white'
                : 'bg-white hover:bg-gray-100'
              }`}
          >
            {seatId}
          </button>
        )
      })}
    </div>
  )

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-20 gap-10'>

      {/* Available Timing */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>

        <div className='mt-5 space-y-2'>
          {show?.dateTime?.[date]?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTime(item)
                setSelectedSeats([])
              }}
              className={`flex items-center gap-2 px-4 py-2 w-max rounded-r-md cursor-pointer transition-all
              ${selectedTime?.time === item.time
                ? 'bg-primary text-white'
                : 'hover:bg-primary/10'
              }`}
            >
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{isoTimeFormate(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="flex-1 relative flex flex-col items-center">

        <BlurCircle className="absolute -top-16 -left-16 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

        <h1 className="text-2xl font-bold text-primary mb-6">
          Select Your Seat
        </h1>

        <img
          src={assets.screenImage}
          alt="Screen"
          className="w-full max-w-md mb-4"
        />

        <p className='text-gray-400 text-sm mb-6'>Screen Side</p>

        {selectedTime ? (
          <div className='flex flex-col items-center mt-6 space-y-4'>

            {groupRows.map((pair, index) => (
              <div key={index} className='flex gap-11'>
                {pair.map(row => renderSeats(row))}
              </div>
            ))}

            <button
              onClick={() => navigate("/my-bookings")}
              className="bg-primary text-white px-6 py-2 rounded-md flex items-center mt-6"
            >
              Proceed To Check Out
              <ArrowRightIcon strokeWidth={3} className='w-4 h-4 ml-2' />
            </button>

          </div>
        ) : (
          <p className="text-gray-400 mt-6">
            Please select a time
          </p>
        )}

      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout