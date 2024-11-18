import crypto from 'crypto';

/**
 * Prepares Single data for response
 * @param payload;
 */
export const itemResponse = (payload: any, message = 'success'): any => ({
  status: true,
  message,
  data: payload
});

/**
 * Generate Random Safe Bytes
 * @param length;
 */
export const safeRandomBytes = (length: number): Buffer => {
  return crypto.randomBytes(length);
};

/**
 * Generate Random string (alphanumeric, numeric, alphabetic, hex)
 * @param length;
 * @param type;
 */
export const getRandomString = (_length = 15, type = 'alphanumeric', smallLettersOnly = false): string => {
  let chars;
  let string = '';

  const numbers = '0123456789';
  const charsLower = 'abcdefghijklmnopqrstuvwxyz';
  const charsUpper = charsLower.toUpperCase();
  const hexChars = 'abcdef';

  if (type === 'alphanumeric') {
    chars = numbers + (smallLettersOnly ? charsLower : charsLower + charsUpper);
  } else if (type === 'numeric') {
    chars = numbers;
  } else if (type === 'alphabetic') {
    chars = charsLower + charsUpper;
  } else if (type === 'hex') {
    chars = numbers + hexChars;
  } else {
    chars = type;
  }

  const unreadableChars = /[0OIl]/g;
  chars = chars.replace(unreadableChars, '');

  // Generate the string
  const charsLen = chars.length;
  const maxByte = 256 - (256 % charsLen);
  let length = _length;
  while (length > 0) {
    const buf = safeRandomBytes(Math.ceil((length * 256) / maxByte));
    for (let i = 0; i < buf.length && length > 0; i += 1) {
      const randomByte = buf.readUInt8(i);
      if (randomByte < maxByte) {
        string += chars.charAt(randomByte % charsLen);
        length -= 1;
      }
    }
  }

  return string;
};
