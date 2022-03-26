import { firestore } from 'lib/firebase';
import { cors } from 'lib/middleware';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  await cors(req, res);

  function generateNumber() {
    return Math.floor(Math.random() * 9001 + 1000);
  }

  if (req.method === 'POST') {
    const { uid, email, fullName, phone, admin } = req.body;

    const userDoc = doc(firestore, 'users', uid);

    try {
      let userDocData = {
        email: email,
        fullName: fullName,
        phone: phone,
      };
      if (admin === false) {
        userDocData = {
          ...userDocData,
          referral_code: generateNumber(),
          registrations: 0,
        };
      }
      await setDoc(userDoc, userDocData);
      res.status(200).send({
        message: 'User created successfully',
        fullName,
      });
    } catch (err) {
      res.status(400).send({
        message: 'Bad request',
        error: `One or more body parameters are missing ${err}`,
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
