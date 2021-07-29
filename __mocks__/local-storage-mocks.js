const store = {};
const localStoragemock = {
  getItem: (key) => store[key],
  setItem: (key, value) => {
    store[key] = value;
  },
  key: (key) => key,
};

export default localStoragemock;
