import { useAuth } from "../context/AuthContext"
export default function Account() {
    const { user } = useAuth()
    return (
        <>
            <h2>Account</h2>
            {user && (
                <div>
                <p>username - {user.username}</p>
                <p>email - {user.email}</p>
                <p>role - {user.role}</p>
            </div>
            )}
        </>
    )
} 