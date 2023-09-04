import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Navbar from '../Navbar/Navbar'
import UserFooter from '../Footer/UserFooter'
import { userApi } from "../../../API/api"



function UserViewBikes() {

  const [obj, setObj] = useState([])
  const [sort, setSort] = useState("")
  const [filterCat, setFilterCate] = useState("")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [totalPages, setTotalPages] = useState(0)

  console.log(totalPages, "total page");

  const handleClick = (index) => {
    setPage(index + 1)
  }

  const handleCategory = (e) => {
    const { value } = e.target
    setFilterCate(value)
  }
  const handleSort = (e) => {
    const { value } = e.target
    console.log(value, "sort value");
    setSort(value)
  }

  const handlePage = () => {
  }
  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
  }

  const findCities =async(req,res)=>{
    try {
      const response =await Axios.get(`${userApi}retriveCities`)
      if( response.data.success){
        console.log(response.data.data,"kkkkkkkkkkkkkkkkkkkkkkkkcities");

      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    findCities()
    const getAllBikes = async () => {
      try {
        const response = await Axios.get(`${userApi}getBikes?page=${page}&sort=${sort}&category=${filterCat}&search=${search}`)
        if (response.data.success) {
          console.log(response.data.data);
          setObj(response.data.data.bikes)
          setPage(response.data.data.page)
          setTotalPages(response.data.data.totalPages)
        }

      } catch (error) {

      }
    }

    getAllBikes()
  }, [sort, filterCat, search, page])



  return (
    <div className=' max-w-[1600px] bg-black'>
      <Navbar />
      <div className='flex justify-center  items-center py-3'>

        <div className='flex flex-row justify-between  bg-white rounded-lg w-[95%]'>
          <div className="flex flex-row mb-1 sm:mb-0 h-[54px] py-2 px-1  ">
            <div className="relative">
              <select
                name="sort"
                onChange={handleSort}
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="">Price</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                name="category"
                onChange={handleCategory}
                className=" appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option value="">Category</option>
                <option value="Commuters & Minis">Commuters/Minis</option>
                <option value="Scooters">Scooters</option>
                <option value="Modern Classics">Modern Classics</option>
                <option value="Sport Touring">Sport Touring</option>
                <option value="Touring">Touring</option>
                <option value="Electric ">Electric</option>
                <option value="Standard & Naked">Street/nake</option>
                <option value="Sportbikes">Sportsbike</option>
                <option value="Cruisers">Cruisers</option>
                <option value="Adventure">Adventure</option>
                <option value="Scrambler">Scrambler </option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input placeholder="Search"
                name="search"
                onChange={handleSearch}
                value={search}
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
          </div>
          <div className='rounded-r-lg flex flex-row px-3 items-center '>
            <p className='text-2xl font-bold'>CITY :</p>
            <div className="relative">
              <select
                name="category"
                onChange={handleCategory}
                className=" appearance-none h-full rounded-r  sm:rounded-r-none sm:border-r-0 block  w-full bg-white text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none  focus:bg-white ">
                <option value="">Select</option>
                <option value="Commuters & Minis">Commuters/Minis</option>
                <option value="Scooters">Scooters</option>
                <option value="Modern Classics">Modern Classics</option>
                <option value="Sport Touring">Sport Touring</option>
                <option value="Touring">Touring</option>
                <option value="Electric ">Electric</option>
                <option value="Standard & Naked">Street/nake</option>
                <option value="Sportbikes">Sportsbike</option>
                <option value="Cruisers">Cruisers</option>
                <option value="Adventure">Adventure</option>
                <option value="Scrambler">Scrambler </option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          
        </div>
        

      </div>

      <div className='w-full flex justify-center mb-3'>
        <div className='bg-yellow-900-400 pl-2 flex rounded-xl flex-col md:flex-row bg-white w-[95%] '>


          <div className='flex justify-evenly w-full md:w-[50%] items-center my-2 '>
            <p className='w-[20%] text-sm font-bold'>FROM :</p>
            <div className='w-[40%]'>
              <input className='h-[37px] p-2' type="date" />
            </div>

            <div className="relative">
              <select
                name="pickUpTime"
                className="text-sm appearance-none h-full rounded-r  sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-400 text-gray-700 py-2 px-3 pr-7 leading-tight focus:outline-none focus:bg-white">
                <option value="">Select pickUp Time</option>
                <option value="06:00 AM">06:00 AM</option>
                <option value="07:00 AM">07:00 AM</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>

              </select>


              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>


          <div className='flex w-full md:w-[50%] justify-evenly items-center'>
            <p className='w-[18%] text-sm font-bold'>TO :</p>
            <div className='w-[40%]'>
              <input className='h-[37px] p-2' type="date" />
            </div>

            <div className="relative">
              <select
                name="pickUpTime"
                className="text-sm appearance-none h-full rounded-r sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none   focus:bg-white focus:border-gray-500">
                <option value="">Select Drop Time</option>
                <option value="06:00 AM">06:00 AM</option>
                <option value="07:00 AM">07:00 AM</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className='flex justify-center p-2 md:p-0'>
            <button className='bg-yellow-300  rounded-lg hover:bg-yellow-400 hover:text-black font-semibold px-5 py-2 md:h-full md:rounded-r-lg  text-white'>Apply</button>
          </div>

        </div>



      </div>

      <div className='w-full flex justify-center'>
        <div className='grid  grid-cols-1 px- sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 max-w-[1500px]'>


          {obj && obj.map((bike) => {
            return (
              <div key={bike._id} className='p-1 m-1 rounded border-2 border-gray-900  bg-yellow-300'>
                <div className='flex w-full justify-center'>
                  <p className='font-semibold'>{bike.name}</p>
                </div>

                <div className="block rounded-lg bg-gray-500">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat" >
                    <img className="rounded-t-lg relative"
                      src={`${bike.image}`}
                      alt="..." />

                  </div>
                  <div className='px-2 text-white font-semibold'>
                    <p>Amount {bike.rentPerHour} Per Hour </p>
                    <p>Engine {bike.engineCC} CC </p>
                  </div>
                  <div className="p-1">
                    <button className="w-full rounded font-bold py-1 hover:bg-black hover:text-yellow-400 bg-yellow-400">BOOK NOW</button>
                  </div>
                </div>
              </div>
            )
          })
          }


        </div>

      </div>
      <div className='max-w-[1600px] bg-gray-500 flex justify-center'>
        {totalPages > 0 &&
          [...Array(totalPages)].map((val, index) => (
            <button
              className={`${page === index + 1 ? 'bg-black' : 'bg-black'} py-2 px-4 rounded-md m-1 text-white ${page === index + 1 ? 'font-bold' : 'font-normal'} focus:outline-none focus:ring focus:ring-offset-2`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {index + 1}
            </button>
          ))}
      </div>

      <UserFooter />
    </div>

  )
}

export default UserViewBikes