export function setLocalStorageObject(key, value) {
    localStorage.setItem(key, value);
  }
  
  export function getLocalStorageObject(key) {
    return localStorage.getItem(key);
  }
  
  export function removeLocalStorageObject(key) {
    return localStorage.removeItem(key);
  }

  export function getDateFormate(date) {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
  }