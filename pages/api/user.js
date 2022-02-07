import { firestore } from 'lib/firebase';
import { cors } from '../../lib/middleware';
import { doc, writeBatch } from 'firebase/firestore';

export default async function handler(req, res) {
  await cors(req, res);

  function generateNumber() {
    return Math.floor(Math.random() * 9001 + 1000);
  }

  if (req.method === 'POST') {
    const {
      uid,
      email,
      username,
      fullName,
      phone,
      registerNumber,
      year,
      department,
    } = req.body;

    const userDoc = doc(firestore, 'users', username);
    const usernameDoc = doc(firestore, 'usernames', uid);
    const paymentDoc = doc(firestore, 'payments', username);

    const batch = writeBatch(firestore);

    try {
      batch.set(usernameDoc, {
        email: email,
        username: username,
      });

      batch.set(userDoc, {
        email: email,
        username: username,
        fullName: fullName,
        registerNumber: registerNumber,
        year: year,
        department: department,
        phone: phone,
        referral_code: generateNumber(),
      });

      batch.set(paymentDoc, {
        paid: false,
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
        message: 'User created successfully',
        username,
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
    const userRef = doc(firestore, 'users', username);
    const paymentRef = doc(firestore, 'payments', username);
    try {
      const userData = (await userRef.get()).data();
      const paymentData = (await paymentRef.get()).data();
      userData['updatedAt'] = userData['updatedAt'].seconds;
      paymentData['updatedAt'] = paymentData['updatedAt'].seconds;
      res.status(200).send({ ...userData, paid: paymentData });
      //res.status(200).send(userData);
    } catch (err) {
      res.status(404).send({
        message: 'Not found',
        error: err.toString(),
      });
    }
  }
}
