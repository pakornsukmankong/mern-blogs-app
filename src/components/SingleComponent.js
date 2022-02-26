import axios from "axios"
import {useState,useEffect} from 'react'
import NavbarComponent from "./NavbarComponent"
import FooterComponent from './FooterComponent'
import parse from 'html-react-parser'

const SingleComponent = (props) => {
  const [blog,setBlog] = useState('')

  useEffect(()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
    .then(response=>{
      setBlog(response.data)
    })
    .catch(err=>{
      alert(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <div className="container p-5">
      <NavbarComponent/>
      {blog 
      ?
        <div className="border rounded shadow-5 mt-3 p-3">
          <h1>{blog.title}</h1>
          <div className="pt-3">{parse(blog.content)}</div>
          <br/>
          <p className="text-muted">ผู้เขียน: {blog.author} เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
      :
      <div className="mt-5 d-flex align-items-center justify-content-center">
        <div className="spinner-border me-2 text-primary" role="status"></div>
        <span className="text-dark">Loading....</span>
      </div>
      }
    </div>
      <div className="position-fixed bottom-0 w-100">
      <FooterComponent/>
      </div>
    </>
  )
}

export default SingleComponent