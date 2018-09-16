import React from 'react';

import {Header} from "../../components/header";
import {Feed} from "../../components/feed"

import styles from './style.scss';

export const MainPage = () => (
    <div className={styles.mainPage}>
        <Header/>
        <Feed/>
    </div>
);
