import React from 'react'
import Navbar from '../Navbar/Navbar'

function CheckOut() {
    return (
        <div className='w-full max-w-[1600px]'>
            <Navbar />
            <div className='w-full h-screen pt-5'>
                <div className='flex  flex-col md:flex-row  justify-center items-center'>
                    <div className='max-w-[750px] md:h-[22rem] w-[95%] rounded-lg mb-3 shadow-2xl border-2'>
                        <p className='text-center text-2xl font-bold py-3'>Booking summery</p>
                        <hr className='' />
                        <div className='w-full flex md:flex-row flex-col'>
                            <div className='w-[100%]  md:w-[40%] p-2'>
                                <p className='text-sm font-semibold underline py-1 text-center'>Bike</p>
                                <img className='rounded-lg' src="https://imgd.aeplcdn.com/664x374/n/cw/ec/123865/g310-rr-right-front-three-quarter-2.jpeg?isig=0&q=80" alt="" />
                                <p className='text-gray-700 pl-1 pt-1'>BMW G 310 RR</p>


                            </div>
                            <div className='w-[100%] md:w-[60%] py-6'>
                                <div className=' flex justify-between px-2'>
                                    <div>
                                        <p>09-06-2023</p>
                                        <p>10:00 AM</p>
                                    </div>
                                    <p className='bg-yellow-300 p-2 font-bold rounded-full'>to</p>
                                    <div>
                                        <p>11-06-2023</p>
                                        <p>12:00 AM</p>

                                    </div>
                                </div>
                                <p className='px-2'>sulthan bathery mint mall</p>
                                <p className='px-2'>ksrtc bus stand s.bathery</p>
                                <div className='flex flex-row justify-between'>
                                    <p className='px-2'>Minimum 24.0 hour charges applicable</p>
                                    <p className='px-2'>5001</p>
                                </div>

                                <div className='flex flex-row justify-between'>
                                    <p className='px-2'>Total</p>
                                    <p className='px-2'>10000</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <p className='px-2'>Number of Helmet (?)</p>
                                    <select className='mx-2 w-[50px] rounded-sm text-center' name="" id="">
                                        <option selected value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>

                                <div className='flex flex-row justify-between'>
                                    <input className='w-[19rem] ml-2' type="text" name="" id="" />
                                    <button className='mr-2'>Apply</button>

                                </div>
                                <div className='flex flex-row justify-between'>
                                    <p className='px-2'>Km limit (?)</p>
                                    <p className='px-2'>120 km</p>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <p className='px-2'>Excess km charges (?)</p>
                                    <p className='px-2'>4.0/km</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='w-[95%] md:w-[300px] md:h-[22rem] md:ml-3 mb-3 rounded-lg shadow-2xl  border-2'>
                        <p className='text-center text-2xl font-bold py-2'>Checkout</p>
                        <hr />
                        <div className='flex mt-3 flex-row justify-between'>
                            <p className='px-2'>Excess km charges (?)</p>
                            <p className='px-2'>4.0/km</p>
                        </div>

                        <div className='mt-3 flex flex-row justify-between'>
                            <p className='px-2'>Booking Fee</p>
                            <p className='px-2'>4.0/km</p>
                        </div>
                        <div className='mt-3 flex flex-row justify-between'>
                            <p className='px-2'>CGST(14%)</p>
                            <p className='px-2'>3000</p>
                        </div>
                        <div className='mt-3 flex flex-row justify-between'>
                            <p className='px-2'>SGST(14%)</p>
                            <p className='px-2'>4000</p>
                        </div>
                       
                        <div className='mt-3 flex flex-row justify-between'>
                            <p className='px-2'>Discount Amount</p>
                            <p className='px-2'>1111</p>
                        </div>
                        <div className='mt-3 flex flex-row justify-between'>
                            <p className='px-2'>Total Amount</p>
                            <p className='px-2'>1111</p>
                        </div>
                        <div className='mt-5 flex justify-center'>
                            <button className=' bg-yellow-300'>Make payment</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CheckOut