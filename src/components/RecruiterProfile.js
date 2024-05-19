import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function RecruiterProfile() {
    const { user, dispatch } = useAuth()
    console.log(user)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user.profile)
    }

    return (
        <>
            <h2>Recruiter Profile</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="companyName">Company Name</label> <br />
                <input
                    type="text"
                    value={form.companyName}
                    onChange={handleChange}
                    id="companyName"
                    name="companyName"
                // disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="website">Website</label> <br />
                <input
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    id="website"
                    name="website"
                // disabled={!form.isEdit}
                />
                <br />
                <label htmlFor="address">Address</label> <br />
                <input
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    id="address"
                    name="address"
                // disabled={!form.isEdit}
                />
                <br />
                <br />
                <input type="submit" />
            </form>
        </>
    )
}