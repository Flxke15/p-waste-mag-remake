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
            lastHistory.map((val)=>{
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

    const ColorStatus = (status) => {
        if (status === 'รอการดำเนินการ'){
            return <td><p style={{color:"#F1C40F"}}>{status} <i className="bi bi-hourglass-split"></i></p></td>
        }else if (status === 'ดำเนินการเสร็จเรียบร้อยแล้ว'){
            return <td><p style={{color:"#27AE60"}}>{status} <i className="bi bi-check-square-fill"></i></p></td>
        }else {
            return <td><p>{status} <i className="bi bi-trash-fill"></i></p></td>
        }
    }

    return(
        <div>
            {UpdateStatus()}
            {/*<button className='btn btn-secondary' onClick={refreshPage}><i className="bi bi-arrow-clockwise"></i></button>*/}
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
                {pointlist.map((val) => {
                    return(
                        <tbody>
                        <tr>
                            <th scope='row'>{val.Point}</th>
                            <td>{val.Name}</td>
                            <td>{val.Address}</td>
                            {ColorStatus(val.Status)}
                            <td><a href={val.Link} type='button' target='_blank' className='btn btn-primary' style={{color:"black"}}>Link</a></td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}
export  default PointOther;