import React, {useState,useEffect, useContext} from 'react'
import { AuthContext, useFormContext } from '../../context/index';
import SignUpImage from '../../assets/images/register.svg';
import './auth.scss';
import {Link, Redirect} from 'react-router-dom';
const SignUp = ()=> {
    const { isLoggedIn, signUp } = useContext(AuthContext);
    const [emailDirty, setEmaiDirty] = useState(false);
    const [PasswordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email is empty !");
    const [passwordError, setPasswordError] = useState("password less than 8 symbols !");
    const [isFormValid, setIsFormValid] = useState(false)
    const [user,setUser]= useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'' 
    })

    const inputHandler=(e)=>{
        setUser({...user, [e.target.name]:e.target.value })
        if (e.target.name==='email'){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const error = !re.test(String(e.target.value).toLowerCase())?'Incorrect email':'';
            setEmailError(error)
        }
        else if (e.target.name==='password'){
            const passwordErr = e.target.value.length < 8 ?'the password must be more than 8 characters long' : ''
            setPasswordError(passwordErr)
        }
    }

    useEffect(()=>{
        if (emailError || passwordError){
            setIsFormValid(false)
        } else{
            setIsFormValid(true)
        }
    },[emailError,passwordError])

    const blurHandle = (e) =>{
        switch(e.target.name){
            case 'email':
                setEmaiDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const submitHanlder = async(e)=>{
        e.preventDefault();
    
  
      try{

        if (!user.email || !user.password ){
            console.log("error")
        }

        const res = await signUp(user);
      } catch (error) {
      }
}
    if (isLoggedIn) {
    return <Redirect to="/notes" />;
  }

    return (
        <div id="auth-container">
            <div id="auth-card">
            <div className="card-shadow">
            <div id="image-section">
                <img src={SignUpImage} alt="Login" />
            </div>
            <div id="form-section">
            <h4>Registration</h4>

                <form onSubmit={submitHanlder}>
                <div className="input-field mb-1">
                    <input placeholder="first name" name="firstname"  onChange={inputHandler} />
                </div>
                <div className="input-field mb-1">
                    <input placeholder="last name" name="lastname"  onChange={inputHandler} />
                </div>
                <div className="input-field mb-1">
                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                    <input onBlur={(e)=>blurHandle(e)} placeholder="login" name="email"  onChange={inputHandler} />
                </div>
                <div className="input-field mb-2">
                {(PasswordDirty && PasswordDirty) && <div style={{color:'red'}}>{passwordError}</div>}
                    <input onBlur={(e)=>blurHandle(e)} placeholder="password" type="password" name="password"  onChange={inputHandler} />
                </div>
                <button disabled={!isFormValid}>Register</button>
                </form>

                <p className="redirect">
                Already have an account?{"  "}
                <Link to="/login" style={{marginLeft:'5px'}}>
                Login
                </Link>
                </p>
            </div>
            </div>
            </div>         
        </div>
    )
}

export default SignUp
