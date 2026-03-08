import React, { useEffect } from 'react'
import { ChartLineIcon, CircleDollarSignIcon, StarIcon, UserIcon } from 'lucide-react'
import { dummyDashboardData } from '../../assets/assets'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import BlurCircle from '../../components/BlurCircle'
import { dateFormat } from '../../lib/DateFormate'

const DashBoard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData, setDashboardData] = React.useState({
    activtyShows: [],
    totalBookings: 0,
    totalRevenue: 0, 
    totalUser: 0,
  });

  const [loading, setLoading] = React.useState(true);

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: 'Total Revenue', value: dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon },
    { title: 'Total Users', value: dashboardData.totalUser || "0", icon: UserIcon },
    { title: 'Active Shows', value: dashboardData.totalUser || "0", icon: UserIcon },
  ]

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
    setLoading(false)
  };

  useEffect(() => {
    fetchDashboardData();
  }, [])

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className='relative flex flex-wrap gap-4 w-full'>
        <BlurCircle top='-100px' left='0' />

        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className='flex items-center justify-between gap-4 p-4 border border-gray-300/20 rounded-md w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-16px)] bg-white/5'
          >
            <div>
              <h1 className='font-medium text-lg'>{card.title}</h1>
              <p className='text-2xl font-bold'>{currency}{card.value}</p>
            </div>

            <card.icon className='h-8 w-8 text-gray-400' />
          </div>
        ))}

      </div>

      <p className='mt-10 text-lg font-medium'>Active Show</p>

      <div className='relative flex flex-wrap gap-6 mt-3 max-w-5xl'> 
        <BlurCircle top="100px" left='-10%' />

        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >

            <img
              src={show.movie.poster_path}
              alt=""
              className='h-60 w-full object-cover'
            />

            <p className='font-medium p-2 truncate'>{show.movie.title}</p>

            <div className='flex items-center justify-between px-2'>
              <p className='text-lg font-medium'>{currency} {show.showPrice}</p>

              <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>

            <p className='px-2 pt-2 text-sm text-gray-500'>
              {dateFormat(show.showDateTime)}
            </p>

          </div>
        ))}

      </div>
    </>
  ) : <Loading/>
}

export default DashBoard