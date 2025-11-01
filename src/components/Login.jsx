// ...existing code...
import "../styles/auth.css"

const Login = () => {
    return (
        <div className="auth-page">
            <div className="auth-content">
                <div className="auth-card">
                    <h2 className="auth-title">Login</h2>
                    <form className="auth-form">
                        <div className="auth-form-group">
                            <label htmlFor="email">Email</label>
                            <input className="auth-input" type="email" id="email" name="email" placeholder="you@example.com" required />
                        </div>
                        <div className="auth-form-group">
                            <label htmlFor="password">Password</label>
                            <input className="auth-input" type="password" id="password" name="password" placeholder="••••••••" required />
                        </div>
                        <div className="auth-actions">
                            <button className="auth-btn auth-btn--primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
// ...existing code...