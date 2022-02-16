export const lsKeys = {
  firebaseRegUserRef: 'firebase-registration-user-ref',
  refCode: 'referral-code',
};
export const setLs = (key, value) => localStorage.setItem(key, value);

export const getLs = key => localStorage.getItem(key);

export const clearLs = () => localStorage.clear();

export const removeLs = key => localStorage.removeItem(key);
