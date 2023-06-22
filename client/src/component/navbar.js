import React, {useEffect} from "react";
import axios from "axios";
import './component.css'
function Navbar(){

    return(
        <div className='navbarTab'>
                <h1 className='navbarEng'>Waste Management</h1>
                <h3 className='navbarThai'>ระบบการจัดการขยะ</h3>
        </div>
    )
}
export  default Navbar;