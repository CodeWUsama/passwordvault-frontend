import { toByteArray, fromByteArray } from 'base64-js';

export const decrypt = (encryptedData) => {
  const decodedBytes = toByteArray(encryptedData);
  const decryptedString = new TextDecoder().decode(decodedBytes);
  return decryptedString;
};

export const encrypt = (data) => {
  const encodedBytes = new TextEncoder().encode(data);
  const encryptedData = fromByteArray(encodedBytes);
  return encryptedData;
};
