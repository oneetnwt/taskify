import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/TaskifyLogo.png'
import Input from '../components/Input'

function Signup() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="h-screen w-full bg-[var(--background)] flex flex-col items-center justify-center">
            <div className="bg-[var(--card-background)] p-10 min-w-[25em] flex flex-col rounded-md animate-fade-in">
                <img src={Logo} alt="Taskify Logo" className='w-15 mx-auto mb-5' />
                <div className='text-center my-5'>
                    <h3 className='text-2xl font-bold'>Sign up</h3>
                    <p>Create an account</p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3 mb-5'>
                    <Input type="text" placeholder="Username" name="username" onChange={handleChange} value={form.username} />
                    <Input type="password" placeholder="Password" name="password" onChange={handleChange} value={form.password} />
                    <Input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} value={form.confirmPassword} />
                    <button className='mt-3 relative bg-gradient-to-r from-[var(--light-blue)] to-[var(--dark-blue)] p-3 rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-[var(--dark-blue)] before:to-[var(--light-blue)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:ease-in-out'>
                        <span className="relative z-10">Sign up</span>
                    </button>
                </form>
                <p className='text-center text-sm'>Already have an account? <Link to="/login" className='text-[var(--link-blue)]'>Log in</Link></p>
            </div>
        </div>
    )
}

export default Signup