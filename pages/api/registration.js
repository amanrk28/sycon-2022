import { firestore } from 'lib/firebase';
import { cors } from 'lib/middleware';
import { doc, writeBatch } from 'firebase/firestore';

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
      hasPaidOnline,
    } = req.body;

    const registrationDoc = doc(firestore, 'registrations', username);

    const batch = writeBatch(firestore);

    try {
      batch.set(registrationDoc, {
        email: email,
        fullName: fullName,
        registerNumber: registerNumber,
        year: year,
        degree: degree,
        branch: branch,
        phone: phone,
        referral_code: referralCode,
        hasPaidOnline: hasPaidOnline,
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
    const { username, hasPaidOnline, customer } = req.body;
    const registrationDoc = doc(firestore, 'registrations', username);
    const paymentDoc = doc(firestore, 'payments', username);
    const batch = writeBatch(firestore);
    try {
      batch.update(registrationDoc, {
        hasPaidOnline: hasPaidOnline,
        customer: customer, //to be updated later
      });
      batch.set(paymentDoc, {
        customer: customer, // to be updated later
      });
    } catch (err) {
      res.status(400).send({
        message: 'Bad Request',
        error: 'One or more body parameters are missing',
      });
      return;
    }
    try {
      await batch.commit();
      res.status(200).send({
        message: 'Registration updated successfull',
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
    const { username } = req.query;
    const registrationRef = doc(firestore, 'registration', username);
    try {
      const registrationData = (await registrationRef.get()).data();
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
