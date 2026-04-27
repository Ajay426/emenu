import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "./Menu.css"

const isLoggedIn = localStorage.getItem("token")

export default function Menu() {

  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('https://emenu-adnz.onrender.com/menu')
      .then(res => {
        setData(res.data.data)
        // console.log(res.data.data);
      })
      .catch(err => console.log(err));
  }, [])

  const handleDelete = (mid) => {
    const confirmDelete = window.confirm("Would you like to delete?");

    if (confirmDelete) {
      axios.delete(`https://emenu-adnz.onrender.com/menu/${mid}`)
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className='menu-page d-flex flex-column align-items-center bg-light'>
        <h1>Here's Your Menu</h1>

        <div className='w-75 rounded bg-white border shadow p-4'>

          {/* Add Button */}
          <div className='d-flex justify-content-end'>
            {isLoggedIn && (
              <Link to='/create' className='btn btn-success'>Add+</Link>
            )}
          </div>

          <div className="table-container">
            <table className='table table-striped menu-table'>

              <thead>
                <tr>
                  <th>SL NO</th>
                  <th>Dish Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={item.mid}>
                    <td data-label="SL NO">{index + 1}</td>
                    <td data-label="Dish">{item.mname}</td>
                    <td data-label="Quantity">{item.size}</td>
                    <td data-label="Price">{item.price}</td>
                    <td data-label="Category">{item.category}</td>

                    <td data-label="Actions">


                      {isLoggedIn && (
                        <Link
                          to={`/update/${item.mid}`}
                          className="btn btn-sm btn-primary me-2"
                        >
                          Update
                        </Link>
                      )}

                      {isLoggedIn && (
                        <button
                          onClick={() => handleDelete(item.mid)}
                          className='btn btn-sm btn-danger'
                        >
                          Delete
                        </button>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </>
  )
}