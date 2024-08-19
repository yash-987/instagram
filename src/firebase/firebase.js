import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBOS1kFjXui7YRokdWLAiRm3oZOyxPSv3k",
  authDomain: "insta-clone-f92bb.firebaseapp.com",
  projectId: "insta-clone-f92bb",
  storageBucket: "insta-clone-f92bb.appspot.com",
  messagingSenderId: "161522798713",
  appId: "1:161522798713:web:83bbd4d2593e4e4adcc4a8",
  measurementId: "G-5TTYCL6M0N"
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
