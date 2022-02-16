import { firestore } from 'lib/firebase';
import { cors } from 'lib/middleware';
import {
  doc,
  serverTimestamp,
  writeBatch,
  getDoc,
  query,
  collection,
  getDocs,
  where,
} from 'firebase/firestore';

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === 'POST') {
    const {
      email,
      fullName,
      phone,
      registerNumber,
      year,
      degree,
      branch,
      referralCode,
      username,
      hasPaid,
    } = req.body;

    const registrationDoc = doc(firestore, 'registrations', username);

    const batch = writeBatch(firestore);

    try {
      batch.set(registrationDoc, {
        email,
        fullName,
        registerNumber,
        year,
        degree,
        branch,
        phone,
        hasPaid,
        referral_code: referralCode,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      res.status(400).send({
        message: 'Bad request',
        error: 'One or more body parameters are missing',
      });
      return;
    }

    try {
      await batch.commit();
      res.status(200).send({
        message: 'Registration successfull',
        fullName,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server error',
        error: err.toString(),
      });
      return;
    }
  }

  if (req.method == 'PUT') {
    const { username, hasPaid, customer, referralCode, link } = req.body;
    const registrationDoc = doc(firestore, 'registrations', username);
    const paymentDoc = doc(firestore, 'payments', username);
    const usersQuery = query(
      collection(firestore, 'users'),
      where('referral_code', '==', parseInt(referralCode, 10))
    );
    const batch = writeBatch(firestore);
    try {
      batch.update(registrationDoc, {
        referral_code: parseInt(referralCode, 10),
        hasPaid,
        customer: customer.id,
        link,
        updatedAt: serverTimestamp(),
      });
      batch.set(paymentDoc, {
        customer: customer.id,
        updatedAt: serverTimestamp(),
      });
      const usersQuerySnap = await getDocs(usersQuery);
      usersQuerySnap.forEach(docu => {
        if (docu.data()) {
          const userDoc = doc(firestore, 'users', docu.id);
          let registrations = 1;
          if (docu.data().registrations)
            registrations = docu.data().registrations + 1;
          batch.update(userDoc, { registrations });
        }
      });
    } catch (err) {
      res.status(400).send({
        message: 'Bad Request',
        error: `One or more body parameters are missing ${err}`,
      });
      return;
    }

    try {
      await batch.commit();
      res.status(200).send({
        message: 'Registration updated successfull',
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server error',
        error: err.toString(),
      });
      return;
    }
  }

  if (req.method == 'GET') {
    const { username } = req.query;
    const registrationRef = doc(firestore, 'registrations', username);
    try {
      const registrationData = (await getDoc(registrationRef)).data();
      registrationData['updatedAt'] = registrationData['updatedAt'].seconds;
      res.status(200).send({ ...registrationData });
      //res.status(200).send(registrationData);
    } catch (err) {
      res.status(404).send({
        message: 'Not found',
        error: err.toString(),
      });
    }
  }
}
