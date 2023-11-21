import CryptoJS from 'crypto-js';

const KEY: string = 'rj44at1jd+oE6+mLNkWugeOeTJLoq+f5d++XgAmvytg=';

export const decryptData = (encryptedData: string) => {
  const key = CryptoJS.enc.Base64.parse(KEY);
  const dataBytes = CryptoJS.enc.Base64.parse(encryptedData);
  const iv = CryptoJS.lib.WordArray.create(dataBytes.words.slice(0, 4));
  const ciphertext = CryptoJS.lib.WordArray.create(dataBytes.words.slice(4));
  const decryptedBytes = CryptoJS.AES.decrypt(
    ciphertext.toString(CryptoJS.enc.Base64),
    key,
    { iv: iv }
  );
  const decryptedText = CryptoJS.enc.Utf8.stringify(decryptedBytes);
  return JSON.parse(decryptedText);
};
