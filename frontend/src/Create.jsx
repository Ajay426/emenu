import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Create () {
  const [values, setValues] = useState({
    mname: '',
    price: '',
    fid: '',
    qid: ''
  })

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.mname || !values.price || !values.fid || !values.qid) {
      alert("Please fill all fields");
      return;
    }
    
    console.log("Sending data:", values);
    axios.post('https://emenu-adnz.onrender.com/addmenu', values)
      .then(res => {
        console.log(res);
        navigate('/menu')
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <>
      <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>

        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded-5'>
          <h1 style={{ color: "brown" }}>Add Your Dishes</h1>

          <form onSubmit={handleSubmit}  >

            <div className='mb-2'  >
              <label htmlFor="name">Name:</label>
              <input type="text" name='Dish Name' className='form-control' placeholder='Enter Dish Name'
                onChange={e => setValues({ ...values, mname: e.target.value })}
              />
            </div>

            <div className='mb-2'>
              <label htmlFor="text">Quentity:</label>
              <select
                className="form-control"
                onChange={e => setValues({ ...values, qid: e.target.value })}
              >
                <option value="">Select Quantity</option>
                <option value="1">HALF</option>
                <option value="2">FULL</option>
              </select>

            </div>

            <div className='mb-3'>
              <label htmlFor="text">Price:</label>
              <input type="number" name='Price' className='form-control' placeholder='Enter price'
                onChange={e => setValues({ ...values, price: e.target.value })}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="text">Category:</label>
              <select
                className="form-control"
                onChange={e => setValues({ ...values, fid: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="1">VEG</option>
                <option value="2">NON VEG</option>
                <option value='3'>CHINESE</option>
              </select>
            </div>

            <button className='btn btn-success'>Submit</button>

            <Link to='/menu' className='btn btn-primary ms-3'>Back</Link>

          </form>
        </div>

      </div>
    </>
  ) 
}