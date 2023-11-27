import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

import bikeImg from '../../../images/HusqvarnaVitpilen701.jpeg'
import Axios from 'axios'
import { partnerApi } from '../../../config/api'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


function AddCoupon() {
    const partner = useSelector((store) => store.partner.partnerD)
    console.log(partner,"partner");
    const token = partner.token
    const navigate =useNavigate()
    const initialValues = { name: "", brand: "", category: "", makeYear: "", rentPerHour: "", engineCC: "", plateNumber: "" }
    // const [bikeImage,setBikeImage] = useState(null)
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [files,setFiles]=useState([])
    

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newvalue = value.trim()
        setFormValues({ ...formValues, [name]: newvalue, });
    };

    const handleImage=(e)=>{
         const file=e.target.files
        // setBikeImage(file)
        for (let i = 0; i < file.length; i++) {
            const fileType = file[i].type;
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
          
            if (validImageTypes.includes(fileType)) {
              setFiles((prevFiles) => [...prevFiles, file[i]]);
            } else {
              toast.error("Invalid image type");
            }
          }
          


        
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        console.log(Object.keys(formErrors).length);
        let formData= new FormData()
        // formData.append("image",bikeImage)
        for(const [key,value] of Object.entries(formValues)){
            formData.append(key,value)
           
        }

        for(let j=0;j<files.length;j++){
           
            formData.append('image',files[j])

        }
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        //   }
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const submitForm = async (formData) => {
                try { 
                              
                    const response = await Axios.post(`${partnerApi}/addBikes`, formData,{
                            headers: {
                                Authorization:`Bearer ${token}`
                            },
                        })
                    if (response.data.success) {
                        toast.success(response.data.message)
                        navigate('/partner/bikes')
                    } else {
                        toast.error(response.data.message)
                    }
                } catch (error) {

                }
            }
            submitForm(formData)

        }

       



    }
    useEffect(()=>{
       
        
    },[isSubmit,formErrors])


    const validate = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = "name is required!"
        }
        if (!values.brand) {
            errors.brand = "brand is required!"
        }
        if (!values.category) {
            errors.category = "select a category!"
        } 
        if (!values.makeYear) {
            errors.makeYear = "make year is required!"
        }
        if (!values.engineCC) {
            errors.engineCC = "engin cc is required!"
        }
        if (!values.plateNumber) {
            errors.plateNumber = "plate number is required!"
        }
        if (!values.rentPerHour) {
            errors.rentPerHour = "rent Per Hour required!"
        }




        return errors;

    }

    // useEffect(() => {
    //     console.log(formErrors);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         console.log(formValues);
    //     }

    // }, [formErrors])






    return (
        <section>

            <div className=' flex justify-center items-center md:justify-start bg-cover bg-no-repeat bg-center h-[600px] w-full' style={{ backgroundImage: `url(${bikeImg})` }}>
                <div className=' '>
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white  rounded-xl mx-auto shadow-lg overflow-hidden">

                            <div className="w-full  py-3 px-9" >
                                <h2 className="text-2xl text-center font-semibold mb-4">ADD BIKE</h2>

                                <form >
                                    <div className="grid grid-cols-2 gap-5">
                                        <input type="text" placeholder="Name" className="border border-gray-400 py-1 px-2 rounded-lg" value={formValues.name} onChange={handleChange} name="name" />
                                        <input type="text" placeholder="Brand Name" className="border border-gray-400 py-1 px-2 rounded-lg" value={formValues.brand} onChange={handleChange} name="brand" />
                                    </div>
                                    <div className='flex justify-between'><p className='text-sm text-red-600'>{formErrors.name}</p><p className='text-sm text-red-600'>{formErrors.brand}</p></div>
                                    <div className="mt-4">
                                        <input type="file" placeholder="" className=" block text-sm text-gray-900 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 border bg-yellow-300 border-gray-400 py-1 px-2 w-full" 
                                        onChange={handleImage}
                                          name="image"
                                          multiple='multiple'

                                           />
                                    </div>
                                     {/* <p className='text-sm text-red-600'>{formErrors.email}</p>  */}
                                    <div className="mt-4">

                                        <select
                                            name='category'
                                            id="categories"
                                            className="bg-gray-50 border border-gray-400 text-sm rounded-lg block w-full py-2"
                                            onChange={handleChange}
                                        >
                                            <option value="">Choose a Category</option>
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

                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.category}</p>
                                    <div className="mt-4">
                                        <input type="number" placeholder="Make Year" className="border border-gray-400 py-1 px-2 w-full rounded-lg" value={formValues.password} onChange={handleChange} name="makeYear" />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.makeYear}</p>
                                    <div className="mt-4">
                                        <input type="number" name="rentPerHour" placeholder="Rent Per Hour" className="border border-gray-400 py-1 px-2 w-full rounded-lg" value={formValues.rentPerHour} onChange={handleChange} />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.rentPerHr}</p>
                                    <div className="mt-4">
                                        <input type="text" placeholder="Engine CC" className="border border-gray-400 py-1 px-2 w-full rounded-lg" name='engineCC' value={formValues.engineCC} onChange={handleChange} />
                                        {/* <input type="text" placeholder="Plate Number" className="border border-gray-400 py-1 px-2 w-full rounded-lg" name='e' value={formValues.plateNumber} onChange={handleChange} /> */}

                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.engineCC}</p>

                                    <div className="mt-4">
                                        <input type="text" placeholder="Plate Number" className="border border-gray-400 py-1 px-2 w-full rounded-lg" name='plateNumber' value={formValues.plateNumber} onChange={handleChange} />
                                    </div>
                                    <p className='text-sm text-red-600'>{formErrors.plateNumber}</p>

                                    <div className="mt-4">
                                        <button onClick={handleSubmit} className="w-full bg-gray-700 rounded-lg hover:bg-gray-900 hover:text-yellow-400 py-2 text-center text-white ">SAVE</button>

                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </section>



    )
}

export default AddCoupon