import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import "./Register.css"

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log('received data:', data);
        let res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        let r = await res.json()
        console.log(r);
    }

    return (
        <div className="register">
            <div className='register-box'>
                <h3>Create Account</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('firstName', {
                        required: true,
                        pattern: /^[A-Za-z]+$/,
                        minLength: 2,
                        maxLength: 15
                    })}
                        placeholder='First Name' />
                    {errors.firstName?.type === 'required' && <p className="error-message">First name is required</p>}
                    {errors.firstName?.type === 'pattern' && <p className="error-message">First name should be only</p>}
                    {errors.firstName?.type === 'minLength' && <p className="error-message">Min length is 2</p>}
                    {errors.firstName?.type === 'maxLength' && <p className="error-message">Max length is 15</p>}

                    <br />
                    <input {...register('lastName', {
                        required: true,
                        pattern: /^[A-Za-z]+$/,
                        minLength: 2,
                        maxLength: 15
                    })} placeholder='Last Name' />
                    {errors.lastName?.type === 'required' && <p className="error-message">Last Name is required</p>}
                    {errors.lastName?.type === 'pattern' && <p className="error-message">Last Name should be only</p>}
                    {errors.lastName?.type === 'minLength' && <p className="error-message">Min length is 2</p>}
                    {errors.lastName?.type === 'maxLength' && <p className="error-message">Max length is 15</p>}
                    <br />

                    <input {...register('username', {
                        required: true,
                        minLength: 4,
                        maxLength: 15,
                        pattern: /^[a-zA-Z0-9_]+$/
                    })} placeholder='Username' />
                    {errors.username?.type === 'required' && <p className="error-message">Username is required</p>}
                    {errors.username?.type === 'pattern' && <p className="error-message">Username can only contain letters, numbers, or underscore</p>}
                    {errors.username?.type === 'minLength' && <p className="error-message">Min length is 4</p>}
                    {errors.username?.type === 'maxLength' && <p className="error-message">Max length is 15</p>}
                    <br />

                    <input {...register('email', {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    })} placeholder='Email' />
                    {errors.email?.type === 'required' && <p className="error-message">Email is required</p>}
                    {errors.email?.type === 'pattern' && <p className="error-message">Please enter a valid email address</p>}
                    <br />

                    <input {...register('phone', {
                        required: true,
                        pattern: /^[0-9]{10}$/
                    })} placeholder='Phone Number' />
                    {errors.phone?.type === 'required' && <p className="error-message">Phone Number is required</p>}
                    {errors.phone?.type === 'pattern' && <p className="error-message">Enter Numbers only</p>}
                    <br />

                    <input {...register('password', {
                        required: true,
                        minLength: 8,
                        pattern: /^(?=.*\d).{6,}$/
                    })} placeholder='Password' />
                    {errors.password?.type === 'required' && <p className="error-message">Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className="error-message">Password should be at least 8 characters</p>}
                    {errors.password?.type === 'pattern' && <p className="error-message">Password should include at least one number</p>}
                    <br />

                    <div className="buttons-container">
                        <button type="submit">Create Accont</button>
                        <button onClick={() => navigate("/login")}>Log-in</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Register