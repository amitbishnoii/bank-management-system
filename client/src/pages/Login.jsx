import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import "../CSS/Login.css"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [error, seterror] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        let res = await fetch("https://bank-management-system-4l0o.onrender.com/user/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        let r = await res.json()
        console.log(r);
        if(r.admin) {
            navigate(`/adminPage`);
        }
        else if (r.success) {
            navigate(`/${r.user.username}/dashboard`)
        }
        else {
            seterror(r.message);
        }
    }

    return (
        <div className="login">
            <div className='login-box'>
                <h3>Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('username', {
                        required: true,
                        minLength: 4,
                    })} placeholder='username' />
                    {errors.firstname?.type === "required" && <p className='error-message'>First name is required</p>}
                    {errors.firstname?.type === "minLength" && <p className='error-message'>Min Length is 4</p>}
                    {error && <p className='error-message'>{error}</p>}
                    <br />

                    <input {...register('password', {
                        required: true,
                        minLength: 8,
                    })} placeholder='password' />
                    {errors.password?.type === "required" && <p className='error-message'>Password is required</p>}
                    {errors.password?.type === "minLength" && <p className='error-message'>Min Length is 8</p>}
                    <br />
                    <div className="buttons-container">
                        <button type="submit">Login</button>
                        <button onClick={() => navigate("/register")}>Open Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login