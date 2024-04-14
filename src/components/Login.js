import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import _ from 'lodash'

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = _.pick(form, ['email', 'password'])
        //todo client side validation

        try {
            const response = await axios.post('http://localhost:3333/users/login', formData)
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (err) {
            setForm({ ...form, serverErrors: err.response.data.errors })
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
                <br />
                <label htmlFor="password">Enter Password</label> <br />
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                    }}
                    id="password"
                /> <br /> <br />
                <input type="submit" />
            </form>
        </div>
    )
}