import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBayAA1PQB6x6xqbV5qZ7xrMOLsEcrP6d0",
  authDomain: "project-musicapp-962ab.firebaseapp.com",
  projectId: "project-musicapp-962ab",
  storageBucket: "project-musicapp-962ab.appspot.com",
  messagingSenderId: "845543380391",
  appId: "1:845543380391:web:30a94a6bc8063e15399282"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
