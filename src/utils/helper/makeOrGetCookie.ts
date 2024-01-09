export const makeCookie = (name: string, action: string): string | void => {
  if (action === 'get') {
    const storedValue = localStorage.getItem(name);
    return storedValue || '';
  } else {
    localStorage.setItem(name, action);
  }
};