
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAM_6TFGZLbP_xasgNfbbPGLjSJwSMQ-9Q",
  authDomain: "react-3-my-project.firebaseapp.com",
  projectId: "react-3-my-project",
  storageBucket: "react-3-my-project.appspot.com",
  messagingSenderId: "218293474645",
  appId: "1:218293474645:web:56b3a1184c9d17f7560bdc",
  measurementId: "G-CT5GKH7YCT",
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();









// // src/firebase.js
// import { initializeApp, getApps, getApp } from "firebase/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   GithubAuthProvider,
//   FacebookAuthProvider,
// } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// // ✅ Firebase config
// const firebaseConfig = {
//   apiKey: "IzaSyAM_6TFGZLbP_xasgNfbbPGLjSJwSMQ-9Q",
//   authDomain: "react-3-my-project.firebaseapp.com",
//   projectId: "react-3-my-project",
//   storageBucket: "react-3-my-project.appspot.com",
//   messagingSenderId: "218293474645",
//   appId: "1:218293474645:web:56b3a1184c9d17f7560bdc",
//   measurementId: "G-CT5GKH7YCT",
// };

// // ✅ Initialize app once (avoids reinitializing during hot reloads)
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // ✅ Firebase services
// export const auth = getAuth(app);
// export const analytics = getAnalytics(app);

// // ✅ OAuth providers
// export const googleProvider = new GoogleAuthProvider();
// export const githubProvider = new GithubAuthProvider();
// export const facebookProvider = new FacebookAuthProvider();
