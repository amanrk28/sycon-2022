import { firestore } from 'lib/firebase';
import { cors } from 'lib/middleware';
import { doc, getDoc, writeBatch } from 'firebase/firestore';

export default async function handler(req, res) {
  await cors(req, res);

  function generateNumber() {
    return Math.floor(Math.random() * 9001 + 1000);
  }

  if (req.method === 'POST') {
    const { uid, email, fullName, phone, registerNumber, year, department } =
      req.body;

    const userDoc = doc(firestore, 'users', uid);

    const batch = writeBatch(firestore);

    try {
      batch.set(userDoc, {
        email: email,
        fullName: fullName,
        registerNumber: registerNumber,
        year: year,
        department: department,
        phone: phone,
        referral_code: generateNumber(),
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

  if (req.method == 'GET') {
    const { uid } = req.query;
    const userRef = doc(firestore, 'users', uid);
    try {
      const userData = (await getDoc(userRef)).data();
      res.status(200).send({ ...userData });
    } catch (err) {
      res.status(404).send({
        message: 'Not found',
        error: err.toString(),
      });
    }
  }
}
