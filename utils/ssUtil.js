export const ssKeys = {
  firebaseRegUserRef: 'firebase-registration-user-ref',
};
export const setSs = (key, value) => sessionStorage.setItem(key, value);

export const getSs = key => sessionStorage.getItem(key);

export const clearSs = () => sessionStorage.clear();

export const removeSs = key => sessionStorage.removeItem(key);
