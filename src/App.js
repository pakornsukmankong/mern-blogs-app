import NavbarComponent from "./components/NavbarComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getUser, getToken } from "./services/authorize";
import FooterComponent from "./components/FooterComponent";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    //ดึงจากข้อมูล api
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div className="container p-5">
        <NavbarComponent />
        {loading 
          ? 
            blogs.map((e) => {
              return (
                <div className="mt-3" key={e._id}>
                  <div className="col pt-3 pb-2 ps-3 border rounded hover-shadow">
                    <Link className="nav-link text-primary p-0" to={`/blog/${e.slug}`}>
                      <h3 className="text-dark">{e.title}</h3>
                    </Link>
                    <div className="pt-2">{parse(e.content.substring(0, 250))}</div>
                    <p className="text-muted mt-3">
                      ผู้เขียน: {e.author} เผยแพร่:{" "}{new Date(e.createdAt).toLocaleString()}
                    </p>
                    {getUser() ? (
                      <div>
                        <Link className="btn btn-outline-success btn-rounded" to={`/blog/edit/${e.slug}`}>
                          แก้ไขบทความ
                        </Link>{" "}&nbsp;
                        <button className="btn btn-outline-danger btn-rounded" onClick={() => confirmDelete(e.slug)}>
                          ลบบทความ
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )
                    }
                  </div>
                </div>
              );
            })
          : 
            <div className="mt-5 d-flex align-items-center justify-content-center">
              <div className="spinner-border me-2 text-primary" role="status"></div>
              <span className="text-dark">Loading....</span>
            </div>
        }
      </div>
      { loading ? (<FooterComponent />) : (<div></div>)}
    </>
  );
}

export default App;
