// ...existing code...
import "../styles/auth.css"
import { AuthContext } from '../context/AuthContext.js'
import { useNavigate } from "react-router";
import { useContext, useState } from "react";

const Login = () => {
    const [user, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    //useNavigate hook de react-router
        const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user === 'admin' && password === '1234') {
            login(user);
            navigate('/dashboard');
        } else if ( user === 'user' && password === '1234') {
            login(user);
            navigate('/');
        }else {
            alert('Credenciales incorrectas');
        }

    }

    return (
        <div className="auth-page">
            <div className="auth-content">
                <div className="auth-card">
                    <h2 className="auth-title">Login</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-form-group">

                            <label htmlFor="text">Username</label>
                            <input
                                className="auth-input"
                                type="text"
                                id="text"
                                name="text"
                                placeholder="Johe Doe"
                                required
                                value={user}
                                onChange={(e) => setUsuario(e.target.value)} />
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="auth-input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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