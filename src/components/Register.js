import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [serverErrors, setServerErrors] = useState(null)

    // create a state variable
    const [clientErrors, setClientErrors] = useState(null)
    //create a local variable
    const errors = {}

    const runValidation = () => {
        if (username.trim().length === 0) {
            errors.username = 'username is required'
        }

        if (email.trim().length === 0) {
            errors.email = 'email is required'
        }

        if (password.trim().length === 0) {
            errors.password = 'password is required'
        } else if (
            password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password should be between 8-128 characters'
        }
        if (role.trim().length === 0) {
            errors.role = 'role is required'
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            username: username,
            email: email,
            password: password,
            role: role
        }

        runValidation()

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3333/users/register', formData)
                console.log(response.data)
                navigate('/login')
            } catch (err) {
                setServerErrors(err.response.data.errors)
            }
        } else {
            setClientErrors(errors)
        }



    }

    return (
        <div>
            <h2>Register With us</h2>

            {serverErrors && (
                <div>
                    <h3>These errors prohibited the form from being saved:</h3>
                    <ul>
                        {serverErrors.map((ele, i) => {
                            return (
                                <li key={i}>{ele.msg}</li>
                            )
                        })}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Enter User Name</label> <br />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }}
                    id="username"
                />
                {clientErrors && clientErrors.username && <span>{clientErrors.username}</span>}
                <br />
                <label htmlFor="email">Enter Email</label> <br />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    id="email"
                />
                {clientErrors && clientErrors.email && <span>{clientErrors.email}</span>}

                <br />
                <label htmlFor="password">Enter Password</label> <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    id="password"
                />
                {clientErrors && clientErrors.password && <span>{clientErrors.password}</span>}

                <br />
                <label htmlFor="">Select Role</label> <br />
                <input
                    type="radio"
                    value='candidate'
                    onChange={(e) => {
                        setRole(e.target.value)
                    }}
                    checked={role === 'candidate'}
                    id="candidate"
                    name="role"
                />
                <label htmlFor="candidate">Candidate</label>
                <input
                    type="radio"
                    value='recruiter'
                    onChange={(e) => {
                        setRole(e.target.value)
                    }}
                    checked={role === 'recruiter'}
                    id="recruiter"
                    name="role"
                />
                <label htmlFor="recruiter">Recruiter</label> {' '}
                {clientErrors && clientErrors.role && <span>{clientErrors.role}</span>}

                <br />
                <input type="submit" />
            </form>

        </div>
    )
}