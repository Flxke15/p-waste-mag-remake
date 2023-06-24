import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

function PointOther(){
    const [pointlist,setPointList] = useState([]);

    const [lastHistory,setLastHistory] = useState([]);
    const [roleUID,setRoleUID] = useState([]);
    const [status,setStatus] = useState([]);

    const UpdateStatus = () => {
        axios.get("http://localhost:3001/getLastHistory").then((response) => {
            setLastHistory(response.data);
        }).then((response)=>{
            lastHistory.map((val,key)=>{
                if (val.Role === 'C'){
                    axios.put(`http://localhost:3001/updateStatusC/${val.Point}`).then((response) => {
                        setStatus(response.data);
                    })
                }else if (val.Role === 'U'){
                    axios.put(`http://localhost:3001/updateStatusU/${val.Point}`).then((response) => {
                        setStatus(response.data);
                    })
                }
            })
        })
    }
    const showPoint = () =>{
        axios.get("http://localhost:3001/showPoint").then((response) =>{
            setPointList(response.data)
        })
    }

    const refreshPage = () =>{
        window.location.reload(false)
    }

    return(
        <div>
            {UpdateStatus()}
            <button className='btn btn-secondary' onClick={refreshPage}><i className="bi bi-arrow-clockwise"></i></button>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>Point</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Map</th>
                </tr>
                </thead>
                {showPoint()}
                {pointlist.map((val,key) => {
                    return(
                        <tbody>
                        <tr>
                            <th scope='row'>{val.Point}</th>
                            <td>{val.Name}</td>
                            <td>{val.Address}</td>
                            <td>{val.Status}</td>
                            <td><a href={val.Link} type='button' target='_blank' className='btn btn-primary'>Link</a></td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}
export  default PointOther;