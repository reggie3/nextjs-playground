const getNewComponentGenerator = require("./generators/plop/scripts/newComponent");

const plopFunction = (plop) => {
  getNewComponentGenerator(plop);
};

module.exports = plopFunction;
