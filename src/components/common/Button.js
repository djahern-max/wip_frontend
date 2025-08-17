// ===== frontend/src/components/common/Button.js =====
import React from 'react';
import styles from '../../styles/components/Button.module.css';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = ''
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;