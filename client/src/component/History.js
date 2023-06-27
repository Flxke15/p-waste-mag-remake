import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dateFormat from "dateformat";

function History(){
    const [historylist,setHistoryList] = useState([]);

    const [lastHistory,setLastHistory] = useState([]);
    const [roleUID,setRoleUID] = useState([]);
    const [status,setStatus] = useState([]);

    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = historylist.slice(firstIndex,lastIndex);
    const npage = Math.ceil(historylist.length/recordsPerPage)
    const numbers = [...Array(npage+1).keys()].slice(1)



    const showHistory = () =>{
        axios.get("http://localhost:3001/showHistory").then((response) =>{
            setHistoryList(response.data)
        })
    }

    const role = (uid) =>{
        if (uid === 'C'){
            return <td><p style={{color:"#27AE60"}}><i className="bi bi-person-fill"></i> เจ้าหน้าที่</p></td>
        }else if (uid === 'U'){
            return <td><p style={{color:"#F1C40F"}}><i className="bi bi-person-fill"></i> ผู้ใช้งาน </p></td>
        }
    }

    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)

        }
    }
    function changeCPage(id){
        setCurrentPage(id)

    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)

        }
    }

    return(
        <div>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>UID</th>
                    <th scope='col'>Point</th>
                    <th scope='col'>DateTime</th>
                    <th scope='col'>User</th>
                </tr>
                </thead>
                {showHistory()}
                {records.map((val,key) => {
                    return(
                        <tbody>
                        <tr>
                            <th scope='row'>{val.No}</th>
                            <td>{val.UID}</td>
                            <td>{val.Point}</td>
                            <td>{dateFormat(val.Datetime,"yyyy-mm-dd hh:mm:ss tt")}</td>
                            {role(val.Role)}
                        </tr>
                        </tbody>
                    )
                })}
            </table>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a className='page-link' onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n,i)=>(
                            <li className={`page-item ${currentPage === n ? `active` : ``}`} key={i}>
                                <a className='page-link' onClick={()=>changeCPage(n)} >{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export  default History;