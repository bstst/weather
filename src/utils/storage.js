const storage = window.localStorage;

const getItem = (name) => JSON.parse(storage.getItem(name));
const setItem = (name, value) => storage.setItem(name, JSON.stringify(value));
const clear = () => storage.clear();

export {
  getItem,
  setItem,
  clear,
};
