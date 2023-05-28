export const LocalStorage = {
  set: function (key, value) {
    value = typeof value === 'string' ? String(value) : JSON.stringify(value);

    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error_text) {
      console.error('Out of local store');
      return false;
    }
  },
  get: function (key) {
    const value = localStorage.getItem(key);

    if (value !== null) {
      return value.indexOf('{') !== -1 || value.indexOf('[') !== -1 ? JSON.parse(value) : value;
    } else {
      return undefined;
    }
  },
  remove: function (key) {
    return localStorage.removeItem(key);
  },
  clear: function () {
    localStorage.clear();
  }
};
