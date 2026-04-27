import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Update() {

  const { id } = useParams();

  const [values, setValues] = useState({
    mname: '',
    price: '',
    fid: '',
    qid: ''
  });

  const navigate = useNavigate();

  // FIXED useEffect
  useEffect(() => {
    if (!id) return;

    axios.get(`https://emenu-adnz.onrender.com/menubyId/${id}`)
      .then(res => {
        setValues({
          mname: res.data.menu.mname || '',
          price: res.data.menu.price || '',
          fid: res.data.menu.fid || '',
          qid: res.data.menu.qid || ''
        });
      })
      .catch(err => console.log(err));

  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!id) {
      alert("Invalid ID");
      return;
    }

    if (!values.mname || !values.price || !values.fid || !values.qid) {
      alert("All fields required");
      return;
    }

    const updatedData = {
      mname: values.mname,
      price: Number(values.price),
      fid: Number(values.fid),
      qid: Number(values.qid)
    };

    axios.put(`https://emenu-adnz.onrender.com/updatemenu/${id}`, updatedData)
      .then(res => {
        alert("Updated successfully");
        navigate('/menu');
      })
      .catch(err => {
        console.log(err.response);
        alert("Update failed");
      });
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded-5'>
        <h1 style={{ color: "brown" }}>Update menu</h1>

        <form onSubmit={handleUpdate}>

          <div className='mb-2'>
            <label>Name:</label>
            <input
              type="text"
              className='form-control'
              value={values.mname}
              onChange={e => setValues({ ...values, mname: e.target.value })}
            />
          </div>

          <div className='mb-2'>
            <label>Quantity:</label>
            <select
              className="form-control"
              value={values.qid}
              onChange={e => setValues({ ...values, qid: e.target.value })}
            >
              <option value="">Select Quantity</option>
              <option value="1">HALF</option>
              <option value="2">FULL</option>
            </select>
          </div>

          <div className='mb-3'>
            <label>Price:</label>
            <input
              type="number"
              className='form-control'
              value={values.price}
              onChange={e => setValues({ ...values, price: e.target.value })}
            />
          </div>

          <div className='mb-3'>
            <label>Category:</label>
            <select
              className="form-control"
              value={values.fid}
              onChange={e => setValues({ ...values, fid: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="1">VEG</option>
              <option value="2">NON VEG</option>
              <option value="3">CHINESE</option>
            </select>
          </div>

          <button className='btn btn-success'>Update</button>
          <Link to='/menu' className='btn btn-primary ms-3'>Back</Link>

        </form>
      </div>
    </div>
  );
}