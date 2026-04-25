import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Update from './Update'
import Create from './Create'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './Menu'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Login from './pages/Login01'
import About from './About'
import Contact from './Contact'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>

            <Route path='/' element={<Home />}   ></Route>
            <Route path='/menu' element={<Menu />}  ></Route>
            <Route path='/create' element={<Create />}   ></Route>
            <Route path='/update/:id' element={<Update />} ></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>
            <Route path='/login' element={<Login/>}></Route>


          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}