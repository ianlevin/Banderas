'use client'
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { useTimer } from './hooks/timer.js'; 

const Page = () => {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
      </div>
    </main>
  );
};

export default Page;
