const debounce = (fn, interval = 300) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, interval);
  };
};

export default debounce;
