import { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent"
import FooterComponent from "./FooterComponent"
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getToken } from "../services/authorize"


const EditComponent = (props) => {
  const [state,setState] = useState({
    title:"",
    author:"",
    slug:"",
  })
  const {title,author,slug} = state
  const [content,setContent] = useState("")

  const inputContent = (event) => {
    setContent(event)
  }

  //กำหนดค่าให้กับ state
  const inputValue = name => event => {
    setState({...state,[name]:event.target.value})
  }

  //ดึงข้อมูลบทความที่ต้องการแก้ไข
  useEffect(()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
    .then(response=>{
      const {title,content,author,slug} = response.data
      setState({...state,title,author,slug})
      setContent(content)
    })
    .catch(err=>{
      alert(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const showUpdateForm = () => {
    return (
      <>
      <div>
        <form onSubmit={submitForm}>
        <div className="form-group">
          <label className="mb-2">ชื่อบทความ</label>
          <input type="text" className="form-control mb-2" value={title} onChange={inputValue("title")}/>
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
          <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
        </div>
        <br/>
          <input type="submit" value="อัพเดท" className="btn btn-primary"/>
          <a href="/" className="btn btn-warning ms-2" >กลับหน้าแรก</a>
        </form>
      </div>
      </>
    )
  }

  const submitForm = (event) => {
    event.preventDefault()
    axios
    .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
    {
      headers:{
        authorization:`Bearer ${getToken()}`
      }
    }
    )
    .then(response => {
      Swal.fire("แจ้งเตือน","อัพเดทบทความเรียบร้อย","success")
      const {title,content,author,slug} = response.data
      setState({...state,title,author,slug})
      setContent(content)
    })
    .catch(err=>{
      Swal.fire("แจ้งเตือน",err.response.data.error,"error")
    })
    
  }

  return (
    <>
    <div className="container p-5" >
      <NavbarComponent/>
      <h1 className="text-center mt-2">แก้ไขบทความ</h1>
      <div className="container border rounded shadow-5 mt-3 p-3">
      {showUpdateForm()}
      </div>
    </div>
    <div className="position-fixed bottom-0 w-100">
    <FooterComponent/>
    </div>
    </>
  )
}

export default EditComponent