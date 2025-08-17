// ===== frontend/src/components/auth/LoginForm.js =====
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import styles from '../../styles/components/LoginForm.module.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await login(formData.username, formData.password);

        if (!result.success) {
            setError(result.error);
        }

        setIsLoading(false);
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2 className={styles.title}>Login</h2>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username or Email"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;