// ===== frontend/src/pages/Home.js =====
import React from 'react';
import Button from '../components/common/Button';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
    const handleGetStarted = () => {
        console.log('Getting started!');
    };

    return (
        <div className={styles.home}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to WIP App</h1>
                <p className={styles.subtitle}>
                    A modern fullstack application with FastAPI and React
                </p>
                <Button onClick={handleGetStarted} variant="primary">
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default Home;
