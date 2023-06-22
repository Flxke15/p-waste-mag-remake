import React, {useState,useEffect} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios, {get} from "axios";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {getValue} from "@testing-library/user-event/dist/utils";

function AddUser(){

    const navigate = useNavigate();

    //use for add data to database
    const [surname,setSurname] = useState("");
    const [lastname,setLastname] = useState("");
    const [uid,setUID] = useState(""); 
    const [address,setAddress] = useState("");

    const [userlist,setUserlist] = useState([]);

    const [lengthUID,setLengthUID] = useState([]);
    const [getuid,setGetUID] = useState([]); //use for get last uid
    const [getalluid,setGetAllUID] = useState([]); //use for get length data before scan
    const [state,setState] = useState(0);

    const [disabled, setDisabled] = useState(false);

    useEffect(() =>{
        axios.get("http://localhost:3001/getAllUID").then((response) => {
            setGetAllUID(response.data);
        })
    },[])

    useEffect(()=>{
        axios.get("http://localhost:3001/getAllUID").then((response) => {
            setLengthUID(response.data);
        })
        if (getalluid.length < lengthUID.length){
            setState(1)
        }
    },[lengthUID,state])

    useEffect(()=>{
        axios.get("http://localhost:3001/getUID").then((response) => {
            setGetUID(response.data);
        })
        getuid.map((val,key)=>{
            setUID(val.UID)
        })
    },[getuid,uid])

    // console.log(getalluid.length)
    // console.log(lengthUID.length)
    // console.log("state : " + state)
    // console.log("getuid : " + getuid)
    // console.log("uid : " + uid)

    const GETUID = (e) => {
        e.preventDefault(false)
               if (state === 1){
                       Swal.fire({
                           icon : "success",
                           title : 'Success 🎉',
                       })
                   setDisabled(true);
               }else{
                   Swal.fire({
                       icon : "error",
                       title : 'Error 💀',
                       html : 'Please Scan RFID before Press Get UID button. <br> or This tag is already exist. ',
                   })
               }
    }

    const adduser = (e) => {
        e.preventDefault(false)
        if (surname === "" || lastname === "" || address === ""){
            Swal.fire({
                icon : "error",
                title : 'กรุณากรอกข้อมูลให้ครบ'
            })
        }else {
            axios.post('http://localhost:3001/adduser', {
                surname : surname,
                lastname : lastname,
                uid : uid,
                address : address
            }).then(() => {
                setUserlist([
                    ...userlist,
                    {
                        surname : surname,
                        lastname : lastname,
                        uid : uid,
                        address : address
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
            navigate('/mainAdmin');
        }
    }

    const backMain = () => {
        if (getalluid.length === lengthUID.length){
            navigate('/mainAdmin');
        }else {
            axios.delete('http://localhost:3001/deleteUID')
            navigate('/mainAdmin');
        }
    }

    return(
        <div>
            <Navbar/>
            <div className='App container'>

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
                        <div className='mb-3'>
                            <label htmlFor='uid' className='form-label'><mark><u>Please Scan RFID before Press Get UID button</u></mark>
                                <button className='btn btn-primary' style={{marginLeft : 1 + 'em'}} onClick={GETUID} disabled={disabled}>GET UID</button>
                            </label>
                            {/*<input type="text" className='form-control' value={Object.values(uid)}/>*/}
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
                        <button className='btn btn-success' onClick={adduser} style={{width:'100px',justifyContent:"flex-end"}}>Save</button>
                    </form>
                </div>

            </div>
            {/*<Footer/>*/}
        </div>

    )
}

export default AddUser;