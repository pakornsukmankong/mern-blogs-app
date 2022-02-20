import { useState } from "react"
import NavbarComponent from "./NavbarComponent"
import FooterComponent from "./FooterComponent"
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {getToken, getUser} from '../services/authorize'


const FormComponent = (props) => {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [author,setAuthor] = useState(getUser())

  const inputTitle = (event) =>{
    setTitle(event.target.value)
  }
  const inputContent = (event) => {
    setContent(event)
  }
  const inputAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const submitForm = (event) => {
    event.preventDefault()
    console.table({title,content,author})
    axios
    .post(`${process.env.REACT_APP_API}/create`,
    {title,content,author},
    {
      headers:{
        authorization:`Bearer ${getToken()}`
      }
    }
    )
    .then(response => {
      Swal.fire("แจ้งเตือน","บันทึกข้อมูลเรียบร้อย","success")
      setTitle("")
      setContent("")
      setAuthor("")
    })
    .catch(err=>{
      Swal.fire("แจ้งเตือน",err.response.data.error,"error")
    })
    
  }

  return (
    <>
    <div className="container p-5" >
      <NavbarComponent/>
      <h1 className="text-center mt-2">เขียนบทความ</h1>
      <div className="container border rounded shadow-5 mt-3 p-3">
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label className="mb-2">ชื่อบทความ</label>
          <input type="text" className="form-control mb-2" value={title} onChange={inputTitle}/>
        </div>
        <div className="form-group">
          <label className="mb-2">รายละเอียด</label>
          <ReactQuill
            value={content}
            onChange={inputContent}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="เขียนรายละเอียดบทความของคุณ"
            style={{border:'1px solid black'}}
          />
        </div>
        <div className="form-group">
          <label className="mb-2">ผู้แต่ง</label>
          <input type="text" className="form-control" value={author} onChange={inputAuthor}/>
        </div>
        <br/>
        <input type="submit" value="บันทึก" className="btn btn-primary"/>
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

export default FormComponent