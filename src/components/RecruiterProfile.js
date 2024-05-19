import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function RecruiterProfile() {
    const { user, dispatch } = useAuth()

    const [form, setForm] = useState({
        companyName: user.profile ? user.profile.companyName : "",
        website: user.profile ? user.profile.website : "",
        address: user.profile ? user.profile.address : "",
        isEdit: false
    })

    const handleChange = (e) => {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleToggle = () => {
        setForm({...form, isEdit: !form.isEdit})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user.profile) {
            const response = await axios.put('http://localhost:3333/api/recruiter/profile', form, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            alert('profile updated')
            dispatch({ type: "SET_PROFILE", payload: response.data })
        } else {
            const response = await axios.post('http://localhost:3333/api/recruiter/profile', form, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            alert('profile created')
            dispatch({ type: "SET_PROFILE", payload: response.data })
        }
    }

    return (
        <>
            <h2>Recruiter Profile</h2>
            <button onClick={handleToggle}>{form.isEdit ? 'Cancel' : 'Edit'}</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor="companyName">Company Name</label> <br />
                <input
                    type="text"
                    value={form.companyName}
                    onChange={handleChange}
                    id="companyName"
                    name="companyName"
                    disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="website">Website</label> <br />
                <input
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    id="website"
                    name="website"
                disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="address">Address</label> <br />
                <input
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    id="address"
                    name="address"
                disabled={!form.isEdit}
                />
                <br />
                <br />
                { form.isEdit && <input type="submit" />}
            </form>
        </>
    )
}