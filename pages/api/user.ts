import { UserApiPayload } from 'components/types';
import { firestore } from 'lib/firebase';
import { cors } from 'lib/middleware';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  function generateNumber() {
    return Math.floor(Math.random() * 9001 + 1000);
  }

  if (req.method === 'POST') {
    const userDoc = doc(firestore, 'users', req.body.uid);
    const adminsRef = query(collection(firestore, 'admins'));

    try {
      const adminsDocs = await getDocs(adminsRef);
      const isUserAdmin = adminsDocs.docs
        .map(x => x.id)
        .includes(req.body.email);
      const userDocData: UserApiPayload = {
        email: req.body.email,
        fullName: req.body.fullName,
        phone: req.body.phone,
        referral_code: isUserAdmin ? null : generateNumber(),
        branch: req.body.branch,
        year: parseInt(req.body.year, 10),
        registrations: isUserAdmin ? null : 0,
        isAdmin: isUserAdmin,
      };

      await setDoc(userDoc, userDocData);
      res.status(200).send({
        message: 'User created successfully',
        fullName: req.body.fullName,
        isAdmin: userDocData.isAdmin,
        referralCode: userDocData.referral_code,
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
    const userRef = doc(firestore, 'users', uid as string);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        res.status(200).send({ ...userData });
      }
    } catch (err) {
      res.status(404).send({
        message: 'Not found',
        error: err as Error,
      });
    }
  }
}
