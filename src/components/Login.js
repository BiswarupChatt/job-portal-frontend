import { useState } from "react"
import { useNavigate } from "react-router-dom"
import validator from "validator"
import axios from "axios"
import _ from 'lodash'

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null,
        clientErrors: {}
    })
    const errors = {}

    const runValidation = () => {
        if (form.email.trim().length === 0) {
            errors.email = 'email is required'
        } else if (!validator.isEmail(form.email)) {
            errors.email = 'email should be in a valid format'
        }
        if (form.password.trim().length === 0) {
            errors.password = 'password is required'
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'password should be between 8 to 128 characters'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = _.pick(form, ['email', 'password'])

        runValidation()

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3333/users/login', formData)
                localStorage.setItem('token', response.data.token)
                navigate('/')
            } catch (err) {
                setForm({ ...form, serverErrors: err.response.data.errors, clientErrors: {} })
            }
        } else {
            setForm({ ...form, clientErrors: errors })
        }
    }

    const displayErrors = () => {
        if (typeof form.serverErrors == 'string') {
            return (
                <p>{form.serverErrors}</p>
            )
        } else {
            return (
                <div>
                    <h3>These errors prohibited the form from being saved:</h3>
                    <ul>
                        {form.serverErrors.map((ele, i) => {
                            return (
                                <li key={i}>{ele.msg}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {form.serverErrors && displayErrors()}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label> <br />
                <input
                    type="text"
                    value={form.email}
                    onChange={(e) => {
                        setForm({ ...form, email: e.target.value })
                    }}
                    id="email"
                />
                {form.clientErrors.email && <span>{form.clientErrors.email}</span>}
                <br />
                <label htmlFor="password">Enter Password</label> <br />
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                    }}
                    id="password"
                />
                {form.clientErrors.password && <span>{form.clientErrors.password}</span>}
                <br /> <br />
                <input type="submit" />
            </form>
        </div>
    )
}