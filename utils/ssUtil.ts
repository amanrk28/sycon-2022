export const ssKeys = {
  firebaseRegUserRef: 'firebase-registration-user-ref',
};
export const setSs = (key: string, value: string) =>
  sessionStorage.setItem(key, value);

export const getSs = (key: string) => sessionStorage.getItem(key);

export const clearSs = () => sessionStorage.clear();

export const removeSs = (key: string) => sessionStorage.removeItem(key);
