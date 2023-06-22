import React, {useState,useEffect} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios from "axios";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {getValue} from "@testing-library/user-event/dist/utils";

function AddUser(){

    const navigate = useNavigate();

    const [point,setPoint] = useState("");
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [link,setLink] = useState("");

    const [pointList,setPointList] = useState([]);

    const addpoint = (e) => {
        e.preventDefault(false)
        if (point === "" || name === "" || address === "" || link === ""){
            Swal.fire({
                icon : "error",
                title : 'กรุณากรอกข้อมูลให้ครบ'
            })
        }else {
            axios.post('http://localhost:3001/addPoint', {
                point : point,
                name : name,
                address : address,
                link : link
            }).then(() => {
                setPointList([
                    ...pointList,
                    {
                        point : point,
                        name : name,
                        address : address,
                        link : link
                    }
                ])
            })
            navigate('/mainAdmin');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    return(
        <div>
            <Navbar/>
            <div className='App container'  >
                <a href='/mainAdmin' role='button' className='btn btn-primary' style={{marginTop:'20px'}}>Back to home</a>
                <div className='adduser' style={{marginTop:"10px"}}>
                    <form action='' >
                        <div className='mb-3'>
                            <label htmlFor='point' className='form-label'>Point :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Point...(number)'
                                onChange={(event) => {
                                    setPoint(event.target.value)
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>Name :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name...'
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='address' className='form-label'>Address :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Address...'
                                onChange={(event) => {
                                    setAddress(event.target.value)
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='link' className='form-label'>Link :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Link...(From Google Map)'
                                onChange={(event) => {
                                    setLink(event.target.value)
                                }}
                            />
                        </div>
                        <button className='btn btn-success' onClick={addpoint} style={{width:'100px'}}>Save</button>
                    </form>
                </div>
                {/*<Footer/>*/}
            </div>
        </div>

    )
}

export default AddUser;