import React from 'react'
import { useForm } from 'react-hook-form'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="register">
            <div className='register-box'>
                <h3>Create Account</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('username')} placeholder='username' />
                    {errors.firstname && <p>First name is required</p>}
                    <br />
                    <input {...register('password', { required: true })} placeholder='password' />
                    {errors.lastname && <p>last name is required</p>}
                    <br />
                    <div className="buttons-container">
                        <button type="submit">Create</button>
                        <button type="">Log-in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register