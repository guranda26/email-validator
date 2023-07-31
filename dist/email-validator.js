const VALID_EMAIL_ENDINGS = [
  "gmail.com",
  "GMAIL.COM",
  "outlook.com",
  "yandex.ru",
];

const isValid = (email) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const endingEl of VALID_EMAIL_ENDINGS) {
    if (email.endsWith(endingEl)) {
      return true;
    }
  }
  return false;
};
export default isValid;
