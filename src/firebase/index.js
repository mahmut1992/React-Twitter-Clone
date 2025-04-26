import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
// Google sağlayıcısı
export const google = new GoogleAuthProvider();
export const auth = getAuth(app);
// Veritabanı referansı
export const db = getFirestore(app);
// medya toplama alanı referansı
export const storage = getStorage(app);
