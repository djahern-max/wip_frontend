// ===== frontend/src/components/layout/Layout.js =====
import React from 'react';
import Navbar from './Navbar';
import styles from '../../styles/components/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;