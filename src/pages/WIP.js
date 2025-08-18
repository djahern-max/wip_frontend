import React, { useState, useEffect } from 'react';
import { getWIPItems, uploadWIPCSV, downloadCSVTemplate } from '../services/api';
import Button from '../components/common/Button';
import styles from '../styles/pages/WIP.module.css';

const WIP = () => {
    const [wipItems, setWipItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWipItems();
    }, []);

    const fetchWipItems = async () => {
        try {
            const items = await getWIPItems();
            setWipItems(items);
        } catch (error) {
            console.error('Error fetching WIP items:', error);
            setError('Failed to load WIP items');
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
                setError('Please select a CSV file');
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError('');
            setUploadResult(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a CSV file first');
            return;
        }

        setUploading(true);
        setError('');
        setUploadResult(null);

        try {
            const result = await uploadWIPCSV(selectedFile);
            setUploadResult(result);
            setSelectedFile(null);

            // Clear the file input
            const fileInput = document.getElementById('csvFileInput');
            if (fileInput) fileInput.value = '';

            // Refresh the WIP items list
            fetchWipItems();
        } catch (error) {
            console.error('Error uploading CSV:', error);
            setError(error.response?.data?.detail || 'Failed to upload CSV file');
        } finally {
            setUploading(false);
        }
    };

    const handleDownloadTemplate = async () => {
        try {
            await downloadCSVTemplate();
        } catch (error) {
            console.error('Error downloading template:', error);
            setError('Failed to download CSV template');
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading WIP items...</div>;
    }

    return (
        <div className={styles.wipContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>WIP Dashboard</h1>
                <p className={styles.subtitle}>Work in Progress Projects</p>
            </div>

            <div className={styles.uploadSection}>
                <h3>Upload Job Numbers & Project Names</h3>
                <p className={styles.uploadDescription}>
                    Upload a CSV file with job_number and project_name columns to bulk import WIP items.
                </p>

                <div className={styles.uploadControls}>
                    <Button onClick={handleDownloadTemplate} variant="secondary">
                        Download CSV Template
                    </Button>
                </div>

                <div className={styles.fileUpload}>
                    <input
                        id="csvFileInput"
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className={styles.fileInput}
                    />
                    <label htmlFor="csvFileInput" className={styles.fileLabel}>
                        {selectedFile ? selectedFile.name : 'Choose CSV file...'}
                    </label>

                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className={styles.uploadButton}
                    >
                        {uploading ? 'Uploading...' : 'Upload CSV'}
                    </Button>
                </div>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {uploadResult && (
                    <div className={styles.uploadResult}>
                        <h4>Upload Complete!</h4>
                        <p>{uploadResult.message}</p>
                        <ul>
                            <li>✅ Created: {uploadResult.created_count} items</li>
                            {uploadResult.error_count > 0 && (
                                <li>⚠️ Errors: {uploadResult.error_count} items</li>
                            )}
                        </ul>

                        {uploadResult.errors && uploadResult.errors.length > 0 && (
                            <div className={styles.errors}>
                                <h5>Errors:</h5>
                                <ul>
                                    {uploadResult.errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.currentItems}>
                <h3>Current WIP Items ({wipItems.length})</h3>

                <table className={styles.wipTable}>
                    <thead>
                        <tr className={styles.headerRow}>
                            <th className={styles.headerCell}>Job #</th>
                            <th className={styles.headerCell}>Project Name</th>
                            <th className={styles.headerCell}>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wipItems.length > 0 ? (
                            wipItems.map((item) => (
                                <tr key={item.id} className={styles.dataRow}>
                                    <td className={styles.dataCell}>{item.job_number}</td>
                                    <td className={styles.dataCell}>{item.project_name}</td>
                                    <td className={styles.dataCell}>
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.emptyRow}>
                                <td colSpan="3" className={styles.emptyMessage}>
                                    No WIP projects yet. Upload a CSV file to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WIP;