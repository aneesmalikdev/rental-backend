import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import { getMessaging } from 'firebase-admin/messaging'

import firebaseConfig from '../configs/firebase.js'
import Logger from '../utils/logger.js'

const app = initializeApp({
  credential: cert(firebaseConfig.serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
})

const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const messaging = getMessaging(app)

Logger.success(`Connected with firebase: ${firebaseConfig.serviceAccount.project_id}`)

export const firebase = {
  auth,
  firestore,
  storage,
  messaging,
}
