import React, {useState,useEffect} from "react";
import Navbar from "../navbar";
import axios, {get} from "axios";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

function AddAdmin(){
    const cookies = new Cookies();
    const [nameCookie,setNameCookie] = useState({});
    useEffect(()=>{
        if (cookies.get('User') == undefined){
            navigate('/login');
        }else {
            setNameCookie(cookies.get('User'));
            //window.location.reload(true);
        }
    },[])

    const navigate = useNavigate();

    //use for add data to database
    const [surname,setSurname] = useState("");
    const [lastname,setLastname] = useState("");
    const [uid,setUID] = useState(""); 
    const [address,setAddress] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [userlist,setUserlist] = useState([]);

    const [lengthUID,setLengthUID] = useState([]);
    const [getuid,setGetUID] = useState([]); //use for get last uid
    const [getalluid,setGetAllUID] = useState([]); //use for get length data before scan
    const [state,setState] = useState(0);

    const [disabled, setDisabled] = useState(false);

    const addadmin = (e) => {
        e.preventDefault(false)
        if (surname === "" || lastname === "" || address === "" || username === "" || password === ""){
            Swal.fire({
                icon : "error",
                title : 'กรุณากรอกข้อมูลให้ครบ'
            })
        }else {
            axios.post('http://localhost:3001/addadmin', {
                surname : surname,
                lastname : lastname,
                uid : uid,
                address : address,
                username : username,
                password : password
            }).then(() => {
                setUserlist([
                    ...userlist,
                    {
                        surname : surname,
                        lastname : lastname,
                        uid : uid,
                        address : address,
                        username : username,
                        password : password
                    }
                ])
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/mainOwner');
        }
    }

    const backMain = () => {
        if (getalluid.length === lengthUID.length){
            navigate('/mainOwner');
        }else {
            axios.delete('http://localhost:3001/deleteUID')
            navigate('/mainOwner');
        }
    }

    return(
        <div>
            <Navbar/>
            <div className='App container'>
                <h1>Add Admin</h1>
                <a role='button' className='btn btn-primary' onClick={backMain} style={{marginTop:'20px'}}>Back to home</a>
                <div className='adduser' style={{marginTop:'50px'}}>
                    <form action='' >
                        <div className='mb-3'>
                            <label htmlFor='surname' className='form-label'>Surname :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Surname...'
                                onChange={(event) => {
                                    setSurname(event.target.value)
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='lastname' className='form-label'>Lastname :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Lastname...'
                                onChange={(event) => {
                                    setLastname(event.target.value)
                                }}
                            />
                        </div>

                        {/*<div className='mb-3'>*/}
                        {/*    <label htmlFor='uid' className='form-label'><mark><u>Please Scan RFID before Press Get UID button</u></mark>*/}
                        {/*        <button className='btn btn-primary' style={{marginLeft : 1 + 'em'}} onClick={GETUID} disabled={disabled}>GET UID</button>*/}
                        {/*    </label>*/}
                        {/*    /!*<input type="text" className='form-control' value={Object.values(uid)}/>*!/*/}
                        {/*</div>*/}

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
                            <label htmlFor='user' className='form-label'>Username :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter username...'
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password :</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Password...'
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </div>
                        <button className='btn btn-success' onClick={addadmin} style={{width:'100px',justifyContent:"flex-end"}}>Save</button>
                    </form>
                </div>

            </div>
            {/*<Footer/>*/}
        </div>

    )
}

export default AddAdmin;