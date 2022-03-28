/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@Src/(.*)": "<rootDir>/src/$1",
    "^@Database/(.*)$": "<rootDir>/src/core/database/$1",
    "^@Controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@Repositories/(.*)$": "<rootDir>/src/core/repositories/$1",
    "^@Services/(.*)$": "<rootDir>/src/core/services/$1",
    "^@Interfaces/(.*)$": "<rootDir>/src/core/interfaces/$1",
    "^@Routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@Shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@Config/(.*)$": "<rootDir>/src/config/$1",
    "^@Specs/(.*)$": "<rootDir>/specs/$1",
    "^@Mocks/(.*)$": "<rootDir>/specs/mocks/$1"
  }
};