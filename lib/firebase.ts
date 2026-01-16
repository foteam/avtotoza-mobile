import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDYxLAYuF2Mcn3UX9LytlFhnASQZhC2vo8",
    authDomain: "avtotoza.firebaseapp.com",
    projectId: "avtotoza",
    storageBucket: "avtotoza.firebasestorage.app",
    messagingSenderId: "714074524261",
    appId: "1:714074524261:web:452ee7fe2a70a73c7dd48c",
    measurementId: "G-Q7NZMT77E1"
}

export const firebaseApp = initializeApp(firebaseConfig)
