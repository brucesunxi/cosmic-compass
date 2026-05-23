const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^lucide-react$": "<rootDir>/src/__tests__/__mocks__/lucide-react.tsx",
  },
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/__tests__/__mocks__/",
    "<rootDir>/src/__tests__/test-utils.ts",
  ],
  collectCoverageFrom: [
    "src/lib/astrology/**/*.ts",
    "src/components/**/*.tsx",
    "!**/*.d.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
