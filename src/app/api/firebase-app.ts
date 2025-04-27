'use client';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'iminelearn.firebaseapp.com',
  databaseURL: 'https://iminelearn-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iminelearn',
  storageBucket: 'iminelearn.firebasestorage.app',
  messagingSenderId: '1007485661527',
  appId: '1:1007485661527:web:9a18e8fd76acc81cdd4e12',
};

export const firebaseApp = initializeApp(firebaseConfig);
