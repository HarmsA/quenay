
import { useState } from 'react';

function useCookie(cookieName) {
  // Get the cookie value when the hook initializes
  const getCookie = () => {
    const nameEQ = `${cookieName}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
  };

  const [cookieValue, setCookieValue] = useState(getCookie());

  // Set a cookie with expiration days
  const setCookie = (value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cookieName}=${value};${expires};path=/`;
    setCookieValue(value);
  };

  // Delete a cookie
  const deleteCookie = () => {
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    setCookieValue('');
  };

  return [cookieValue, setCookie, deleteCookie];
}

export default useCookie;