import React from 'react'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'

function Tariff() {
    return (
        <div className='-z-0 bg-black'>
            <Navbar />
            <div className='w-full flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1500px]'>
                    <div className='p-1 m-1 rounded border-2 border-gray-900   bg-yellow-300'>
                        <div className='flex w-full justify-center'>
                            <p className='font-semibold'>RC 390</p>
                        </div>

                        <div  className="block rounded-lg bg-gray-500 ">
                            <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                                <img className="rounded-t-lg  -z-0 relative "
                                    src="https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ktm-rc-390-gp-edition1664214920184.jpg?q=75g"
                                    alt="..." />

                            </div>
                            <div className='px-2 text-white font-semibold'>
                                <p>Amount 18 Per Hour </p>
                                <p>Extras 10 Per Hour </p>
                            </div>
                            <div className="p-1">
                                <button className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 bg-yellow-400">BOOK NOW</button>
                            </div>
                        </div>
                    </div>


                     <div className='p-1 m-1 rounded border-2 border-gray-900   bg-yellow-300'>
                        <div className='flex w-full justify-center'>
                            <p className='font-semibold'>Trident 660</p>
                        </div>

                        <div className="block rounded-lg bg-gray-500">
                            <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                                <img className="rounded-t-lg relative"
                                    src="https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/triumph-trident-660-standard1677230385685.jpg?q=75"
                                    alt="..." />

                            </div>
                            <div className='px-2 text-white font-semibold'>
                                <p>Amount 18 Per Hour </p>
                                <p>Extras 10 Per Hour </p>
                            </div>
                            <div className="p-1">
                                <button className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 bg-yellow-400">BOOK NOW</button>
                            </div>
                        </div>
                    </div>


                    <div className='p-1 m-1 rounded border-2 border-gray-900   bg-yellow-300'>
                        <div className='flex w-full justify-center'>
                            <p className='font-semibold'>Leoncino 500</p>
                        </div>

                        <div className="block rounded-lg bg-gray-500">
                            <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                                <img className="rounded-t-lg relative"
                                    src="https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/benelli-leoncino-standard1676976393760.jpg?q=75"
                                    alt="..." />

                            </div>
                            <div className='px-2 text-white font-semibold'>
                                <p>Amount 18 Per Hour </p>
                                <p>Extras 10 Per Hour </p>
                            </div>
                            <div className="p-1">
                                <button className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 bg-yellow-400">BOOK NOW</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>


            <UserFooter />
        </div>

    )
}
export default Tariff