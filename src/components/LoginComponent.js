import { useEffect, useState } from "react"
import NavbarComponent from "./NavbarComponent"
import FooterComponent from "./FooterComponent"
import axios from 'axios'
import Swal from 'sweetalert2'
import { authenticate, getUser } from "../services/authorize"
import { withRouter } from 'react-router-dom'


const LoginComponent = (props) => {
  const [username,setUserName] = useState("")
  const [password,setPassword] = useState("")
  
  const inputUsername = (event) => {
    setUserName(event.target.value)
  }

  const inputPassword = (event) => {
    setPassword(event.target.value)
  }

  const submitForm = (event) => {
    event.preventDefault()
    axios
    .post(`${process.env.REACT_APP_API}/login`,{username,password})
    .then(response=>{
      //login สำเร็จ
      authenticate(response,()=>props.history.push("/create"))
    })
    .catch(err=>{
      Swal.fire("แจ้งเตือน",err.response.data.error,"error")
    })
    
  }

  useEffect(()=>{
    getUser() ? props.history.push('/') : props.history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <div className="container p-5" >
      <NavbarComponent/>
      <div className="container border rounded shadow-5 mt-3 p-3">
        <h1 className="text-center">เข้าสู่ระบบ</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control mt-2 mb-2" value={username} onChange={inputUsername}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control mt-2" value={password} onChange={inputPassword}/>
          </div>
          <br/>
          <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
          <a href="/" className="btn btn-warning ms-2" >กลับหน้าแรก</a>
        </form>
      </div>
    </div>
    <div className="position-absolute bottom-0 w-100">
    <FooterComponent/>
    </div>
    </>
  )
}

export default withRouter(LoginComponent)