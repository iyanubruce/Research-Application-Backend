import crypto from 'crypto';
import { Response } from 'express';
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

export const exportResponse = (res: Response, format: string, fileContent: Buffer): Response => {
  res.setHeader('Content-disposition', `attachment; filename=export.${format}`);
  res.setHeader(
    'Content-type',
    format === 'csv' ? 'text/csv' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  return res.send(fileContent);
};

export const pagingResponse = (payload: any, total: number, page: number, limit: number, _url: string): any => {
  const pageUrl = new URL(_url);

  let next;
  if (Math.ceil(total / limit) > page) {
    next = page + 1;
  }

  let previous;
  if (page > 1) {
    previous = page - 1;
  }

  // for data
  const data: any[] = payload === undefined || payload.length === 0 ? [] : payload;

  // for paging
  const paging: any = {};
  paging.total_items = total;
  paging.page_size = limit;
  paging.current = page;
  paging.count = data.length;
  paging.next = next;
  paging.previous = previous;

  // for links
  // --previous
  const links = [];
  if (previous !== undefined) {
    const prevUrl = pageUrl;
    prevUrl.searchParams.set('page', previous.toString());
    const prev = {
      href: prevUrl.href,
      rel: 'prev',
      method: 'GET'
    };
    links.push(prev);
  }

  // --current
  const currentUrl = pageUrl;
  currentUrl.searchParams.set('page', page.toString());
  const current = {
    href: currentUrl.href,
    rel: 'current',
    method: 'GET'
  };
  links.push(current);

  // --next
  if (next !== undefined) {
    const nextUrl = pageUrl;
    nextUrl.searchParams.set('page', next.toString());
    const nextPage = {
      href: nextUrl.href,
      rel: 'next',
      method: 'GET'
    };
    links.push(nextPage);
  }

  return {
    data,
    paging,
    links
  };
};
