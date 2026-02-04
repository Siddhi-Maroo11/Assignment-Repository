export function getFromStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function setToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
