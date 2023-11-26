import React from 'react'
import bikeImg from '../../../images/offers.jpg'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'


const Offers = () => {
    const text="heeee"
  return (
    <div>
        <Navbar/>
        <h1 className='font-bold absolute text-[2rem]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400  drop-shadow-lg font-rubik-vinyl [word-spacing:15px]'>REV-ON Offers Check it out</h1>
        <img src={bikeImg} alt="bike img"/>

        <div className='bg-black '>
        <div className='grid py-5 md:py-8  grid-cols-1 px- sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 max-w-[1500px]'>
          
              <div  className='p-1 m-1 rounded border-2 border-gray-900  bg-yellow-300'>
                <div className='flex w-full justify-center'>
                  <p className='font-semibold'>{}</p>
                </div>
                <div className="block rounded-lg bg-gray-500">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                   <img className='w-100 h-100' src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' alt=''/>
                  </div>
                  <div className='px-2 text-white font-semibold'>
                  </div>
                  <div className="p-1">
                    <button onClick={()=>{navigator.clipboard.writeText(text)}}  className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 border-2 border-black hover:border-white bg-yellow-400">COPY CODE</button>
                  </div>
                </div>
              </div>
              <div  className='p-1 m-1 rounded border-2 border-gray-900  bg-yellow-300'>
                <div className='flex w-full justify-center'>
                  <p className='font-semibold'>{}</p>
                </div>
                <div className="block rounded-lg bg-gray-500">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                   <img className='w-100 h-100' src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' alt=''/>
                  </div>
                  <div className='px-2 text-white font-semibold'>
                  </div>
                  <div className="p-1">
                    <button onClick={()=>{navigator.clipboard.writeText(text)}}  className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 border-2 border-black hover:border-white bg-yellow-400">COPY CODE</button>
                  </div>
                </div>
              </div>
              <div  className='p-1 m-1 rounded border-2 border-gray-900  bg-yellow-300'>
                <div className='flex w-full justify-center'>
                  <p className='font-semibold'>{}</p>
                </div>
                <div className="block rounded-lg bg-gray-500">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                   <img className='w-100 h-100' src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' alt=''/>
                  </div>
                  <div className='px-2 text-white font-semibold'>
                  </div>
                  <div className="p-1">
                    <button onClick={()=>{navigator.clipboard.writeText(text)}}  className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 border-2 border-black hover:border-white bg-yellow-400">COPY CODE</button>
                  </div>
                </div>
              </div>
 
        </div>
        
      </div>

        <UserFooter/>

    </div>
  )
}

export default Offers