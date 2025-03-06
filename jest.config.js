const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const creatJestConfig = nextJest({
  dir: ".",
});
const jestConfig = creatJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
