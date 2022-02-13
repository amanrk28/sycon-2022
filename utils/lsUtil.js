export const lsKeys = { firebaseRegUserRef: 'firebase-registration-user-ref' };
export const setLs = (key, value) => localStorage.setItem(key, value);

export const getLs = key => localStorage.getItem(key);

export const clearLs = () => localStorage.clear();
