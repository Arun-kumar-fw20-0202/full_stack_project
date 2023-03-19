import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers, userRegistration } from '../redux/registration/action.register'
import "../styles/register.css"

let userData = {
    phone: '',
    gender: '',
    name: '',
    gmail: '',
    password: '',
    avatar: '',
    id: null,
}

export const Register = () => {
    const dispatch = useDispatch()
    const {users,isLoading,isError} = useSelector((store) => {
        return{
            isLoading: store.reducer.isLoading,
            users: store.reducer.users,
            isError: store.reducer.isError
        }
    })

    const [data, setData] = useState(userData);

    const { phone, gender, name, gmail, password , id} = data

    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value })
    }

    // console.log(Math.floor(Math.random() + Date.now()))


    const handleRegister = (e) => {
        e.preventDefault()
        data.id = Math.floor(Math.random() + Date.now())
        dispatch(userRegistration(data))
    }

    useEffect(() => {
        if(!isLoading){
            setData(userData)
            dispatch(fetchUsers)
        }
    },[isLoading])
    

  return (
    <>
        <div className="Rmain">
            <div className="box">
                <div className="imgBx">
                    <h1>Register</h1>
                    <img src="../../public/loginimg.jpg" />
                    <h3><a href="#">Term Policy & Term of Service</a></h3>
                </div>
                {/* <!--  --> */}
                <div className="box2">
                    {/* <!-- form --> */}
                    <form onSubmit={(e) => handleRegister(e)}>
                    <div className="inputBx">
                        <input required="required" type="text" value={name} name="name" minLength="0" maxLength="25" onChange={(e) => handleChange(e)} />
                        <span className="text">Name</span>
                        <span className="line"></span>
                    </div>
                    {/* <!--  --> */}
                    <div className="inputBx">
                        <input required="required" type="tel" name="phone" value={phone}  minLength="0" maxLength="10" onChange={(e) => handleChange(e)} />
                        <span className="text">Phone No:</span>
                        <span className="line"></span>
                    </div>
                    {/* <!--  -->				 */}
                    <div className="inputBx">
                        <input required="required" type="email" value={gmail} name="gmail" onChange={(e) => handleChange(e)} />
                        <span className="text">Gmail</span>
                        <span className="line"></span>
                    </div>	
                    {/* <!--  --> */}
                    <div className="inputBx">
                        <input required="required" type="password" value={password} name="password" onChange={(e) => handleChange(e)} />
                        <span className="text">password</span>
                        <span className="line"></span>
                    </div>
                    {/* <!--  --> */}
                    <div className="inputBx">
                        <select name="gender" value={gender} onChange={(e) => handleChange(e)} >
                            <option disabled="" required value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div className="btnBx">
                        <input disabled={isLoading} type="submit" value="Register" /> 
                        or <Link to="/login">Sign In</Link>
                        {isLoading ? <p>Please wait...</p> : ""}
                        {isError ? <h5>Something went wrong</h5>: ""}
                    </div>
                </form>
                </div>
            </div>
        </div>
    </>
  )
}
