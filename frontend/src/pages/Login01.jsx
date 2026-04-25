import { useState } from "react"
import "./Login01.css"

export default function Login() {

  const [isLogin, setisLogin] = useState(true)

  // ⭐ input states
  const [uname,setUname] = useState("")
  const [pwd,setPwd] = useState("")
  const [confirmPwd,setConfirmPwd] = useState("")

  // ⭐ LOGIN FUNCTION
  const handleLogin = async () => {
    try{
      const res = await fetch("http://localhost:3001/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ uname, pwd })
      })

      const data = await res.json()

      if(res.ok){
        localStorage.setItem("token", data.token)  // store JWT
        alert("Login successful")
        window.location.href="/menu"
      }else{
        alert(data.message)
      }

    }catch(err){
      alert("Server error")
    }
  }

  // ⭐ SIGNUP FUNCTION
  const handleSignup = async () => {

    if(pwd !== confirmPwd){
      alert("Passwords do not match")
      return
    }

    try{
      const res = await fetch("http://localhost:3001/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ uname, pwd })
      })

      const data = await res.json()

      if(res.ok){
        alert("Account created! Please login.")
        setisLogin(true)
        setUname("")
        setPwd("")
        setConfirmPwd("")
      }else{
        alert(data.message)
      }

    }catch(err){
      alert("Server error")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="form-toggle">
          <button className={isLogin ? 'active' : ""} onClick={() => setisLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ""} onClick={() => setisLogin(false)}>Sign Up?</button>
        </div>

        {/* LOGIN FORM */}
        {isLogin ? (
          <div className="inner-card">

            <div className="logo">
              <div className="logo-circle">OR</div>
            </div>

            <h2>Welcome Back!</h2>
            <p className="subtitle">to your restaurant</p>

            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={uname}
                onChange={(e)=>setUname(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e)=>setPwd(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>

            <p className="forgot">
              Forgot password?
              <a href="#" onClick={()=>setisLogin(false)}> Or Sign Up</a>
            </p>

          </div>

        ) : (
          /* SIGNUP FORM */
          <div className="inner-card">

            <div className="logo">
              <div className="logo-circle">OR</div>
            </div>

            <h2>Great Choice</h2>
            <p className="subtitle">For your restaurant</p>

            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={uname}
                onChange={(e)=>setUname(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Password"
                value={pwd}
                onChange={(e)=>setPwd(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={(e)=>setConfirmPwd(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={handleSignup}>
              Sign Up
            </button>

          </div>
        )}

      </div>
    </div>
  )
}