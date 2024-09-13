import dotenv from 'dotenv'
dotenv.config()
export default {
  serviceAccount: JSON.parse(process.env.FIREBASE_CONFIG as string),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}
