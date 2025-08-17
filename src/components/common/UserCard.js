// ===== frontend/src/components/common/UserCard.js =====
import React from 'react';
import styles from '../../styles/components/UserCard.module.css';

const UserCard = ({ user }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.username}>{user.username}</h3>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.status}>
                Status: {user.is_active ? 'Active' : 'Inactive'}
            </p>
            <p className={styles.date}>
                Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
        </div>
    );
};

export default UserCard;