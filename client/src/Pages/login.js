import {useState , useEffect} from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

function Login() {
    //axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const cookies = new Cookies();

    const  [username,setUsername] = useState("");
    const  [password,setPassword] = useState("");
    const  [loginStatus,setLoginStatus] = useState("")

    axios.defaults.withCredentials = true;

    const login = () => {
        axios.post("http://localhost:3001/login", {
            username : username,
            password : password,
        }).then((response) => {
            if (response.data.message){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Check your Username or Password',
                    footer: '<a href="/mainUser">Login with Guest Mode</a>'
                })
                //setLoginStatus(response.data.message)
            }else {
                cookies.set('User',response.data[0],{path:'/'});
                if (response.data[0].Role === "A"){
                    navigate('/mainAdmin');
                }else {
                    navigate('/mainOwner');
                }
            }
        });

    };

    useEffect(()=>{
        axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn == true){
                setLoginStatus(response.data.user[0].username)
            }

        })
    },[])

    function GuestCookie(){
        cookies.set('Guest',"Guest",{path:'/'});
        navigate('/mainUser')
    }

    return (
        <div>
            <Navbar/>
            <div className="App container">
                <div className='information' style={{marginTop:"20vh"}}>
                    <form action=''>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>User :</label>
                            <input
                                type={'text'}
                                className={'form-control'}
                                placeholder={'Enter User'}
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='age' className='form-label'>Password :</label>
                            <input
                                type={'password'}
                                className={'form-control'}
                                placeholder={'Enter Password'}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </div>
                        <div className='login-btn' style={{display:"flex",justifyContent:"flex-end"}}>
                            <a className='btn btn-secondary' role='button' style={{marginRight: 2 + 'em'}} onClick={GuestCookie}>Login with Guest</a>
                            <a className='btn btn-success' role='button' onClick={login}>Login</a>
                            <h1>{loginStatus}</h1>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
