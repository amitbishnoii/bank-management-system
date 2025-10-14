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
                    <input {...register('username', {
                        required: true,
                        minLength: 4,
                        pattern: /^[a-zA-Z0-9_]+$/
                    })} placeholder='username' />
                    {errors.firstname?.type === "required" && <p>First name is required</p>}
                    {errors.firstname?.type === "minLength" && <p>Min Length is 4</p>}
                    {errors.firstname?.type === "pattern" && <p>Username can only contain letters, numbers, or underscore</p>}
                    <br />

                    <input {...register('password', {
                        required: true,
                        minLength: 8,
                        pattern:  /^(?=.*\d).{6,}$/
                    })} placeholder='password'/>
                    {errors.password?.type === "required" && <p>Password is required</p>}
                    {errors.password?.type === "minLength" && <p>Min Length is 8</p>}
                    {errors.password?.type === "pattern" && <p>Password must contain 1 number</p>}
                    <br />
                    <div className="buttons-container">
                        <button type="submit">Login</button>
                        <button>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login