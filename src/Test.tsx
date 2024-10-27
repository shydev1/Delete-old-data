import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Test = () => {
  const handleDeleteOldData = async () => {
    try {
      // Initialize Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyBo9CUsKlEGUkYTsjdTy5n6Q3X9i7ec-RQ",
        authDomain: "bcs-public-portal.firebaseapp.com",
        projectId: "bcs-public-portal",
        storageBucket: "bcs-public-portal.appspot.com",
        messagingSenderId: "823547668549",
        appId: "1:823547668549:web:4f556bc096f5d480e49b2c",
        measurementId: "G-VEHR0EV9P3"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Calculate the date 30 days ago
      const firestore = firebase.firestore();
    const collectionRef = firestore.collection('Attempts');

    // Get the current date and time
    const currentDate = new Date();
    console.log('Current date:', currentDate);

    // Calculate the date one month ago
    const oneMonthAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    console.log('One month ago:', oneMonthAgo);

    // Query for documents older than one month
    const querySnapshot = await collectionRef.where('createdAt', '<', oneMonthAgo).get();

    // Create a batched write operation
    const batch = firestore.batch();

    // Iterate over the result set and add each document to the batch for deletion
    querySnapshot.forEach(doc => {
      batch.delete(doc.ref);
      console.log('Document added to batch for deletion:', doc.id);
    });

    // Commit the batched write operation to delete all documents at once
    await batch.commit();

    console.log('Documents older than one month deleted successfully.');
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
  };

  return (
    <div className='mt-32'>
      <h2>Delete Old Data</h2>
      <button className='bg-red-500 p-2  text-white m-5' onClick={handleDeleteOldData}>Delete Old Data</button>
    </div>
  );
};

export default Test;