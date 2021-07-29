const store = {};
const localStoragemock = {
  getItem: (key) => store[key],
  setItem: (key, value) => {
    store[key] = value;
  },
};

export default localStoragemock;
