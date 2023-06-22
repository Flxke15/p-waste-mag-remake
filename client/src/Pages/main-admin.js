import React from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios from "axios";
import {useState,useEffect} from "react";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import ".//pages.css"
import Cookies from 'universal-cookie';
import Point from "../component/admin/Point";
import Information from "../component/Information";
import UserList from "../component/admin/UserList";
import History from "../component/History";

function MainAdmin(){
    const navigate = useNavigate();
    const [show,toggleShow] = useState(true)
    const [userList,setUserList] = useState([]);
    const cookies = new Cookies();
    const [name,setName] = useState({});
    const logout = () =>{
         cookies.remove('User',{path:'/'})
         navigate('/login');
    }

    useEffect(()=>{
        const login = async () =>{
            if (cookies.get('User') == undefined){
                navigate('/login');
            }else {
                await setName(cookies.get('User'));
                //window.location.reload(true);
            }
            console.log(cookies.get('User'));
        }
        login();

    },[])

        return(
            <div>
                <Navbar/>
                <div className="App container">

                    <div style={{justifyContent:"flex-end",display:"flex"}}>
                        <div className='profile-box' style={{marginTop:'10px'}}>
                            <p>Admin : {name.Surname} </p>
                            <button className='btn btn-secondary' onClick={logout}>Logout</button>
                        </div>
                    </div>

                    <div className='row border'>

                        <div className='row '>
                            <div className='col'>
                                <h1>จุดให้บริการ</h1>
                            </div>
                            <div className='col' style={{display:"flex",justifyContent:"flex-end"}}>
                                <a className='btn btn-success' href='/addPoint' role='button' style={{display:"flex",marginTop:'10px'}}>เพิ่มจุดให้บริการ</a>
                            </div>
                        </div>

                        <div className='row'>
                            <Point/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col border' >
                            <h1 className='admin-point'>History</h1>
                            <History/>
                        </div>
                        <div className='col border'>
                            <h1>Information</h1>
                            <Information/>
                        </div>
                    </div>

                    <div className='row border' style={{marginBottom:'20px'}}>
                        <div className='row' style={{padding:'20px'}}>
                            <h1>User</h1>
                        </div>
                        <div className='row'>
                            <div>
                                <a className='btn btn-success' href='/addUser' role='button' style={{width:'150px',marginRight:'10px'}}>AddUser</a>
                                <button className={'btn btn-primary'} onClick={() =>toggleShow(!show)} style={{textAlign:"center",width:'150px'}}>
                                    {show ? "Show User" : "Hide" }
                                </button>
                            </div>

                            <br/><br/>
                            {!show &&
                                <UserList/>
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>

        )
}

export default MainAdmin;