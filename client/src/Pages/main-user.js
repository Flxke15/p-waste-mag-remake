import React, {useEffect, useState} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Cookies from 'universal-cookie';
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserList from "../component/admin/UserList";
import History from "../component/History";
import Information from "../component/Information";
import PointOther from "../component/PointOther";
import Graph from "../component/owner/graph";
import HistoryGuest from "../component/Guest/History-Guest";

function MainUser(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [name,setName] = useState({});

    const login = () =>{
        cookies.remove('Guest',{path:'/'})
        navigate('/login');
    }

    useEffect(()=>{
        const login = async () =>{
            if (cookies.get('Guest') == undefined){
                navigate('/login');
            }else {
                await setName(cookies.get('Guest'));
                //window.location.reload(true);
            }
            console.log(cookies.get('User'));
        }
        login();

    },[])

    return(
        <div>
            <Navbar/>
            <div className='App container' style={{marginBottom:'20px'}}>
                <div style={{justifyContent:"flex-end",display:"flex",marginTop:'10px',marginBottom:'10px'}}>
                    <button className='btn btn-secondary' onClick={login} style={{width:'100px'}}>Login</button>
                </div>


                <div className='row border' style={{padding:"20px"}}>
                    <h1>Point</h1>
                    <PointOther/>
                </div>

                <div className='row border style={{padding:"20px"}}'>
                    <div className='col border' style={{padding:"20px"}}>
                        <h1>History</h1>
                        <HistoryGuest/>
                    </div>
                    <div className='col border' style={{padding:"20px"}}>
                        <h1>เวลาการทำงาน</h1>
                        <Information/>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default MainUser;