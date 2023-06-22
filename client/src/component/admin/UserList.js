import React, {useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function UserList(){

    const navigate = useNavigate();
    const [userList,setUserList] = useState([]);
    const showUsers = () => {
        axios.get("http://localhost:3001/showUser").then((response) => {
            setUserList(response.data);
        })
    }
    const deleteUser = (id,uid) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/deleteUIDFromUser/${uid}`).then((response)=>{
                    window.location.reload(false);
                })
                    axios.delete(`http://localhost:3001/deleteUser/${id}`).then((response) => {
                    setUserList(
                        userList.filter((val) => {
                            return val.id != id;
                        })
                    )
                        window.location.reload(false);
                    })

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Delete Success',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not delete', '', 'info')
            }
        })
    }
    return(
        <div className='showUser'>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>Surname</th>
                    <th scope='col'>Lastname</th>
                    <th scope='col'>UID</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Delete</th>
                </tr>
                </thead>
            {showUsers()}
            {userList.map((val,key) =>{
                return(
                            <tbody>
                            <tr>
                                <td scope='row'>{val.Surname}</td>
                                <td>{val.Lastname}</td>
                                <td>{val.UID}</td>
                                <td>{val.Address}</td>
                                <td><button className='btn btn-danger' onClick={() => {deleteUser(val.ID,val.UID)}} style={{marginBottom:2 +'em'}}>Delete</button></td>
                            </tr>
                            </tbody>
                )
            })}
            </table>
        </div>

    )
}
export  default UserList;