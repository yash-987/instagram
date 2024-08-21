import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app)
const firestore = getFirestore(app)

export { app, auth, storage, firestore };

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
// 	apiKey: 'AIzaSyAlmBT396zpGDhsEhFaRrh5ggqwEut70ZQ',
// 	authDomain: 'instaclonebyaryan.firebaseapp.com',
// 	projectId: 'instaclonebyaryan',
// 	storageBucket: 'instaclonebyaryan.appspot.com',
// 	messagingSenderId: '1099108806247',
// 	appId: '1:1099108806247:web:cd0f8f185091831ce72ec2',
// 	measurementId: 'G-WR52P60R5F',
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);
// const storage = getStorage(app);

// export { app, auth, firestore, storage };
