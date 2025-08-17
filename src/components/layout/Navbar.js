// ===== frontend/src/components/layout/Navbar.js =====
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import styles from '../../styles/components/Navbar.module.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    {/* <img
                        src="/images/logo.png"
                        alt="WIP App"
                        className={styles.logoImage}
                    /> */}
                    <span className={styles.logoText}>WIP App</span>
                </Link>

                <div className={styles.nav_content}>
                    <div className={styles.nav_links}>
                        <Link to="/" className={styles.nav_link}>Home</Link>
                        <Link to="/users" className={styles.nav_link}>Users</Link>
                    </div>

                    <div className={styles.user_section}>
                        <span className={styles.username}>
                            {user?.username}
                        </span>
                        <Button
                            onClick={handleLogout}
                            variant="secondary"
                            className={styles.logoutButton}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;