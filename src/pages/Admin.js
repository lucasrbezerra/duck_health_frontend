import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../styles/pages/Admin.module.css';

export default function Admin(props){
    return (
        <div className={styles.container}>
            <Sidebar mode="extended"/>
            {props.children}
        </div>
    )
}