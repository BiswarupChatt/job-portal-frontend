import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddJob() {
    const { dispatch } = useAuth();

    const jobTypes = [
        { name: 'Work from home', value: 'wfh' },
        { name: 'Work from office', value: 'wfo' },
        { name: 'Hybrid', value: 'hybrid' }
    ]

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        openings: 0,
        location: "",
        jobType: "",
        experience: { minExp: "", maxExp: "" },
        skills: "",
        dueDate: "",
        salary: { minSalary: "", maxSalary: "" },
        serverErrors: null,
        clientErrors: {}
    });

    const runValidations = () => {
        const errors = {};
        if (formData.title.trim().length === 0) {
            errors.title = 'Title is required';
        }
        if (formData.description.trim().length === 0) {
            errors.description = 'Description is required';
        }
        if (formData.location.length === 0) {
            errors.location = 'Location is required';
        }
        if (formData.openings === 0) {
            errors.openings = 'Openings is required';
        }
        if (formData.jobType.trim().length === 0) {
            errors.jobType = 'JobType is required';
        }
        if (formData.experience.minExp.trim().length === 0) {
            errors.minExp = 'Min experience is required';
        }
        if (formData.experience.maxExp.trim().length === 0) {
            errors.maxExp = 'Max experience is required';
        }
        if (formData.skills.length === 0) {
            errors.skills = 'Skills is required';
        }
        if (formData.salary.minSalary.trim().length === 0) {
            errors.minSalary = 'Min salary is required';
        }
        if (formData.salary.maxSalary.trim().length === 0) {
            errors.maxSalary = 'Max salary is required';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'skills') {

            const skillsArray = value.split(',').map(ele => ele.trim())
            setFormData({
                ...formData,
                [name]: skillsArray,

            });
        }
        else if (name === 'location') {
            const locationsArray = value.split(',').map(ele => ele.trim())
            setFormData({
                ...formData,
                [name]: locationsArray,

            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,

                experience: {
                    ...formData.experience,
                    [name]: value
                },
                salary: {
                    ...formData.salary,
                    [name]: value
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form submitted'); 
        const errors = runValidations();
        // console.log('Errors:', errors); 

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3333/api/jobs', formData, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                dispatch({ type: 'JOB', payload: response.data });
                alert('Job Created');
                setFormData({
                    title: "",
                    description: "",
                    openings: 0,
                    location: "",
                    jobType: "",
                    experience: { minExp: "", maxExp: "" },
                    skills: "",
                    dueDate: "",
                    salary: { minSalary: "", maxSalary: "" },
                    serverErrors: null,
                    clientErrors: {}
                })
            } catch (error) {
                console.log(error);
                setFormData({ ...formData, serverErrors: error.response.data.errors, clientErrors: {} })
            }
        } else {
            setFormData({ ...formData, clientErrors: errors });
        }
    };

    return (
        <div>
            <h2>Add Job</h2>
            {formData.serverErrors && (
                <>
                    <h3>These error/s prohibited the form from being saved: </h3>
                    <ul>
                        {formData.serverErrors.map((err, i) => {
                            return <li key={i}> {err.msg} </li>
                        })}
                    </ul>
                </>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Enter title</label><br />
                <input type="text" id="title" value={formData.title} name="title" onChange={handleChange} />
                {formData.clientErrors.title && <span style={{ color: 'red' }}>{formData.clientErrors.title} </span>}
                <br />


                <label htmlFor="description">Description</label><br />
                <textarea id="description" value={formData.description} name="description" onChange={handleChange}></textarea>
                {formData.clientErrors.description && <span style={{ color: 'red' }}>{formData.clientErrors.description} </span>}
                <br />

                <label htmlFor="openings">Openings</label><br />
                <input type="text" id="openings" value={formData.openings} name="openings" onChange={handleChange} />
                {formData.clientErrors.openings && <span style={{ color: 'red' }}>{formData.clientErrors.openings} </span>}
                <br />

                <label htmlFor="location">Location</label><br />
                <input type="text" id="location" value={formData.location} name="location" onChange={handleChange} />
                {formData.clientErrors.location && <span style={{ color: 'red' }}>{formData.clientErrors.location} </span>}
                <br />

                <label htmlFor="jobType">JobType</label><br />
                <select id="jobType" value={formData.jobType} name="jobType" onChange={handleChange}>
                    <option value="">Select Type</option>
                    {jobTypes.map((ele, i) => {
                        return <option key={i} value={ele.value}>{ele.name}</option>
                    })}
                </select>
                {formData.clientErrors.jobType && <span style={{ color: 'red' }}>{formData.clientErrors.jobType} </span>}
                <br />
                

                <label htmlFor="minExp">Min Experience</label><br />
                <input type="text" id="minExp" value={formData.experience.minExp} name="minExp" onChange={handleChange} />
                {formData.clientErrors.minExp && <span style={{ color: 'red' }}>{formData.clientErrors.minExp} </span>}
                <br />

                <label htmlFor="maxExp">Max Experience</label><br />
                <input type="text" id="maxExp" value={formData.experience.maxExp} name="maxExp" onChange={handleChange} />
                {formData.clientErrors.maxExp && <span style={{ color: 'red' }}>{formData.clientErrors.maxExp} </span>}
                <br />

                <label htmlFor="skills">Skills</label><br />
                <input type="text" id="skills" value={formData.skills} name="skills" onChange={handleChange} />
                {formData.clientErrors.skills && <span style={{ color: 'red' }}>{formData.clientErrors.skills} </span>}
                <br />

                <label htmlFor="dueDate">dueDate</label><br />
                <input type="Date" id="dueDate" value={formData.dueDate} name="dueDate" onChange={handleChange} />
                {formData.clientErrors.dueDate && <span style={{ color: 'red' }}>{formData.clientErrors.dueDate} </span>}
                <br />


                <label htmlFor="minSalary">Min Salary</label><br />
                <input type="text" id="minSalary" value={formData.salary.minSalary} name="minSalary" onChange={handleChange} />
                {formData.clientErrors.minSalary && <span style={{ color: 'red' }}>{formData.clientErrors.minSalary} </span>}
                <br />

                <label htmlFor="maxSalary">Max Salary</label><br />
                <input type="text" id="maxSalary" value={formData.salary.maxSalary} name="maxSalary" onChange={handleChange} />
                {formData.clientErrors.maxSalary && <span style={{ color: 'red' }}>{formData.clientErrors.maxSalary} </span>}
                <br />

                <input type="submit" />
            </form>
        </div>
    );
}