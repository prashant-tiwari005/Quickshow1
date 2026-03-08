import React from 'react'
import { assets } from '../../assets/assets'
import { Icon, LayoutDashboard, LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
    const user ={
        firstName:'Admin',
        lastName:'User',
        imageUrl : assets.profile,
    }

    const adminNavlinks =[
        { name:'Dashboard', path:'/admin', icon: LayoutDashboardIcon },
        { name:'Add Shows', path:'/admin/add-shows', icon: PlusSquareIcon},
        { name:'List Booking', path:'/admin/list-booking' , icon: ListIcon}, 
        { name:'List Shows', path:'/admin/list-shows' , icon: ListCollapseIcon},
    ]

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col item-center pt-8 max-w-13 md:max-w-60 w-full border-gray-300/20 text-sm'>
     <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />
     <p className='mt-2 text-center max-md:hidden'>{user.firstName} {user.lastName}</p>
     <div className='w-full'>  
      {adminNavlinks.map((link , index) => (
        <NavLink key={index} to={link.path} end className={({isActive}) =>`relative flex item-center mas-mid:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive &&'bg-primary/15 text-primary group'}`}> 
         {({isActive}) => (
            <>
             <link.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
             <span className='max-md:hidden'>{link.name}</span>
            </>
         )}
        </NavLink>
      ))}

     </div>
    </div>
  )
}

export default AdminSidebar
