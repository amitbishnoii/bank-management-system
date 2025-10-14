import React from 'react'
import { useForm } from 'react-hook-form'
import "./Login.css"

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="login">
            <div className='login-box'>
                <h3>Login</h3>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <label htmlFor="">Username</label>
                    <input {...register('firstName')} />
                    {errors.firstname && <p>First name is required</p>}
                    <br />
                    <label htmlFor="">Password</label>
                    <input {...register('lastName', { required: true })} />
                    {errors.lastname && <p>last name is required</p>}
                    <br />
                    <button type="submit">Login</button>
                    <button type="">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login