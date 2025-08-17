// ===== frontend/src/pages/Users.js =====
import React, { useState, useEffect } from 'react';
import UserCard from '../components/common/UserCard';
import Button from '../components/common/Button';
import { getUsers, createUser } from '../services/api';
import styles from '../styles/pages/Users.module.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userData = await getUsers();
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            setFormData({ username: '', email: '', password: '' });
            fetchUsers(); // Refresh the users list
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.users}>
            <h1 className={styles.title}>Users</h1>

            <div className={styles.create_form}>
                <h2>Create New User</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    />
                    <Button type="submit" variant="primary">
                        Create User
                    </Button>
                </form>
            </div>

            <div className={styles.users_grid}>
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Users;