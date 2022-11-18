import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

const administrator = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default administrator;