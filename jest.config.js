export default {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@app/(.*)$': '<rootDir>/src/app/api/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
};
