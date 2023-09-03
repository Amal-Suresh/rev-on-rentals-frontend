import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../../images/new-logo-rev-on.png'
import logo1 from '../../../images/rev-on-text.png'
import { GrMenu, GrClose } from 'react-icons/gr'
import { useSelector } from 'react-redux'

function Navbar() {
  const [toggleState, setToggleState] = useState(false);
  const [navLink, setNavLink] = useState('')
  const navigate=useNavigate('')
  const user = useSelector(store=>store.user.userD)


    


  const handleBtnClick = () => {
    setToggleState(!toggleState)
    toggleState ? setNavLink('') : setNavLink('top-[9.9%]')
  }


  return (

    <header className='bg-yellow-400 w-full flex justify-center '>
      <nav className='bg-yellow-400 max-w-[1500px] flex justify-between items-center w-[92%] mx-auto'>
        <div className='flex'>
          <img className='w-16' src={logo} alt="logo" />
          <img className='hidden md:block ml-5 w-44 h-13 hover:cursor-pointer' src={logo1} alt="logo" />
        </div>
        <div className={`${navLink} z-10  md:static md:min-h-fit md:w-auto absolute bg-yellow-400 min-h-[60vh] left-0 top-[-100%] w-full flex items-center px-5`}>
          <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
            <li>
              <p onClick={()=>navigate('/')} className='hover:text-black text-gray-700 hover:cursor-pointer font-semibold'>Home</p>
            </li>
            <li>
              <p  onClick={()=>navigate('/tariff')} className='hover:text-black text-gray-700 hover:cursor-pointer font-semibold'>Tariff</p>
            </li>
            <li>
              <p onClick={()=>navigate('/join-us')}  className='hover:text-black text-gray-700 hover:cursor-pointer font-semibold'>Join us</p>
            </li>
            <li>
              <p  onClick={()=>navigate('/offers')} className='hover:text-black text-gray-700 hover:cursor-pointer font-semibold'>Offers</p>
            </li>
            <li>
              <p  onClick={()=>navigate('/viewBikes')} className='hover:text-black text-gray-700 hover:cursor-pointer font-semibold'>Bikes</p>
            </li>
          </ul>

        </div>
        <div className='flex items-center gap-6'>
          {!user.name?<button className='bg-white text-yellow-400 px-5 py-2 rounded-md hover:bg-black hover:text-white ' onClick={()=>navigate('/login')}>Login</button>:<button className='hover:text-black text-gray-700 font-semibold' onClick={()=>navigate("/userProfile")}>{user.name}</button>}
          {!toggleState ? <GrMenu className='cursor-pointer md:hidden' onClick={handleBtnClick} style={{ fontSize: "2rem" }} /> : <GrClose className='cursor-pointer md:hidden' onClick={handleBtnClick} style={{ fontSize: "2rem" }} />}



        </div>
      </nav>
    </header>
  )
}

export default Navbar