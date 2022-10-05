import { RegistrationApiPayload } from 'components/types';
import { firestore, functions } from 'lib/firebase';
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
  setDoc,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method === 'POST') {
    const registrationDoc = doc(firestore, 'registrations', req.body.username);

    const batch = writeBatch(firestore);

    const payload: RegistrationApiPayload = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      registerNumber: req.body.registerNumber,
      year: req.body.year,
      degree: req.body.degree,
      branch: req.body.branch,
      college: req.body.college,
      referral_code: req.body.referralCode,
      hasPaid: false,
      isEntry: false,
      isLunch: false,
      emailSent: false,
      updatedAt: serverTimestamp(),
    };

    try {
      batch.set(registrationDoc, payload);
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
        fullName: req.body.fullName,
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server error',
        error: err as Error,
      });
      return;
    }
  }

  if (req.method == 'PUT') {
    const { username, referralCode, paymentId } = req.body;
    const parsedRC = parseInt(referralCode, 10);
    const registrationDoc = doc(firestore, 'registrations', username);
    const usersQuery = query(
      collection(firestore, 'users'),
      where('referral_code', '==', parsedRC)
    );
    const batch = writeBatch(firestore);
    try {
      const regSnapshot = await getDoc(registrationDoc);
      if (!regSnapshot.exists()) {
        console.log('No such document exists');
        return;
      }
      const payload: Pick<
        RegistrationApiPayload,
        'referral_code' | 'hasPaid' | 'paymentLink' | 'updatedAt'
      > = {
        referral_code: parsedRC,
        hasPaid: true,
        paymentLink: `https://dashboard.razorpay.com/app/payments/${paymentId}`,
        updatedAt: serverTimestamp(),
      };
      batch.update(registrationDoc, payload);
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
      const regData = regSnapshot.data();
      // Email sent on calling the firebase function
      const sendEmail = httpsCallable(functions, 'sendEmailForRegistration');
      sendEmail({
        docId: username,
        fullName: regData.fullName,
        email: regData.email,
      })
        .then(async () => {
          await setDoc(registrationDoc, { emailSent: true }, { merge: true });
          console.log('Email sent successfully');
        })
        .catch(err => {
          console.log(err.message, err.code);
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
        message: 'Registration updated successfully',
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server error',
        error: err as Error,
      });
      return;
    }
  }

  if (req.method == 'GET') {
    const { username } = req.query;
    const registrationRef = doc(firestore, 'registrations', username as string);
    try {
      const registrationDoc = await getDoc(registrationRef);
      if (registrationDoc.exists()) {
        const registrationData = registrationDoc.data();
        registrationData['updatedAt'] = registrationData['updatedAt'].seconds;
        res.status(200).send({ ...registrationData });
      }
      //res.status(200).send(registrationData);
    } catch (err) {
      res.status(404).send({
        message: 'Not found',
        error: err as Error,
      });
    }
  }
}
