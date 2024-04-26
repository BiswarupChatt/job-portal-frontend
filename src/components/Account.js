import { useAuth } from "../context/AuthContext"
export default function Account() {
    const { user } = useAuth()
    return (
        <>
            <h2>Account</h2>
            {user && (
                <div>
                <p>username - {user.account.username}</p>
                <p>email - {user.account.email}</p>
                <p>role - {user.account.role}</p>
            </div>
            )}
        </>
    )
} 