import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function CandidateProfile() {
    const { user, dispatch } = useAuth()
    const [form, setForm] = useState({
        firstName: user.profile ? user.profile.firstName : '',
        lastName: user.profile ? user.profile.lastName : '',
        mobile: user.profile ? user.profile.mobile : '',
        address: user.profile ? user.profile.address : '',
        clientSideErrors: {},
        isEdit: false,
        serverSideErrors: null
    })
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.profile) {
            //api to update
            const response = await axios.put("http://localhost:3333/api/candidate/profile", form, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            alert('profile updated')
            dispatch({ type: 'SET_PROFILE', payload: response.data })
        } else {
            // api to create
            const response = await axios.post("http://localhost:3333/api/candidate/profile", form, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            alert('profile created')
            dispatch({ type: 'SET_PROFILE', payload: response.data })
        }
    }
    const handleToggle = ()=>{
        setForm({...form, isEdit: !form.isEdit})
    }

    return (
        <div>
            <h2>Candidate Profile</h2>
            <button onClick={handleToggle}> {form.isEdit? 'Cancel': 'Edit'}</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label> <br />
                <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => {
                        setForm({ ...form, firstName: e.target.value })
                    }}
                    id="firstName"
                    name="firstName"
                    disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="lastName">Last Name</label> <br />
                <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => {
                        setForm({ ...form, lastName: e.target.value })
                    }}
                    id="lastName"
                    name="lastName"
                    disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="mobile">Mobile</label> <br />
                <input
                    type="text"
                    value={form.mobile}
                    onChange={(e) => {
                        setForm({ ...form, mobile: e.target.value })
                    }}
                    id="mobile"
                    name="mobile"
                    disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="address">Address</label> <br />
                <input
                    type="text"
                    value={form.address}
                    onChange={(e) => {
                        setForm({ ...form, address: e.target.value })
                    }}
                    id="address"
                    name="address"
                    disabled={!form.isEdit}
                />
                {form.isEdit && <input type="submit" />}
            </form>
        </div>
    )
}