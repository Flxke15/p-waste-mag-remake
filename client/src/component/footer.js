import React from "react";
function Footer(){
    return(
        <div className='footer'>

            <div className='row' style={{}}>
                <h3><u>About us</u></h3>
            </div>

            <div className='row'>

                <div className='col'>
                    <div className='row'>
                        <p>Danaipong Sangarun (Fluke)</p>
                    </div>
                    <div className='row' style={{marginTop:'17px'}}>
                        <p>Chanasorn Somthong (New)</p>
                    </div>
                </div>

                <div className='col'>
                    <div className='row'>
                        <a href='https://www.facebook.com/flukk.danaipong.7/' className='footer-social'><i className="bi bi-facebook"></i>  Fluke Danaipong</a>
                        <a href='https://www.instagram.com/flukedanaii/' className='footer-social'><i className="bi bi-instagram"></i>  flukedanaii</a>
                    </div>
                    <div className='row' style={{marginTop:'10px'}}>
                        <a href='https://www.facebook.com/profile.php?id=100009493626458' className='footer-social'><i className="bi bi-facebook"></i>  Chanasorn New</a>
                        <a href='https://www.instagram.com/new_chanasorn/' className='footer-social'><i className="bi bi-instagram"></i>  new_chanasorn</a>
                    </div>
                </div>

                <div className='col'>
                    <div className='row'>
                        <a><i className="bi bi-envelope"></i>  fluke.danaipong@gmail.com</a>
                        <a><i className="bi bi-telephone"></i>  096-669-6247</a>
                    </div>
                    <div className='row' style={{marginTop:'10px'}}>
                        <a><i className="bi bi-envelope"></i>  chanasorn.new@hotmail.com</a>
                        <a><i className="bi bi-telephone"></i>  086-406-8632</a>
                    </div>
                </div>

                <div className='col'>
                    <h5><u>เวลาการทำงาน</u></h5>
                    <p>วันจันทร์ - ศุกร์ 8:30 - 22:00</p>
                </div>

            </div>

        </div>
    )
}
//export  default Footer;
export default Footer;