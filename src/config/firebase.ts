// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDuYbx02Me1gHwY-svOOSh8GtSvDoqk3Lw',
  authDomain: 'timesheet-assistant-933c9.firebaseapp.com',
  projectId: 'timesheet-assistant-933c9',
  storageBucket: 'timesheet-assistant-933c9.appspot.com',
  messagingSenderId: '1062631379429',
  appId: '1:1062631379429:web:6c3371f0be1e95aec99f0c',
  measurementId: 'G-6WNZYRRWZ0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
