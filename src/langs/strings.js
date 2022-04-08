/* eslint-disable */

import allowedLangs from './allowedLangs';
import base from './translationsBase.csv';

// [key: string]: [key, ru, tr][]
const normalizedBase = base.map((row) =>
  row.map((item) => item.replace(/\n/gi, ' ').replace(/\s+/g, ' ').trim()),
);

const strings = {};

allowedLangs.forEach((l) => {
  strings[l] = {};
});

normalizedBase.forEach((row) => {
  allowedLangs.forEach((l, index) => {
    const value = row[index + 1];
    if (value) {
      strings[l][row[0]] = value;
    }
  });
});

export default strings;
