import React from 'react';
import styles from './styles.scss';

import logo from '../../assets/media/logo.png'


export const Header = () => (
    <div className={styles.header}>
        <img src={logo} alt='logo' className={styles.headerLogo}/>
        <div className={styles.title}>
            Display Board
        </div>
    </div>

);

