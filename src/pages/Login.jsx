import React from 'react'
import { useForm } from 'react-hook-form'
import "./Login.css"

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        let res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        let r = await res.json()
        console.log("response", r);
    }

    return (
        <div className="login">
            <div className='login-box'>
                <h3>Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('username')} placeholder='username' />
                    {errors.firstname && <p>First name is required</p>}
                    <br />
                    <input {...register('password', { required: true })} placeholder='password'/>
                    {errors.lastname && <p>last name is required</p>}
                    <br />
                    <div className="buttons-container">
                        <button type="submit">Login</button>
                        <button type="">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login