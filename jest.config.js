const {defaults} = require('jest-config');
module.exports = {
    "preset": 'ts-jest',
    "testEnvironment": 'node',
    "globals": {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        "ts-jest": {
            tsConfig: "tsconfig.jest.json"
        }
    },
    "moduleFileExtensions": [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    "roots": [
        '<rootDir>/src',
    ],
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "transform": {
        "^.+\\.(ts|js)x?$": "ts-jest"
    },
    "transformIgnorePatterns": [
        "<rootDir>/node_modules/(?!(quill-mention)/)"
    ],
    "setupFiles": ["<rootDir>/mock/localStorage.js"],
    "moduleNameMapper": { '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mock/fileMock.js', '\\.(css|less)$': 'identity-obj-proxy', },
    // "resolver": "C:\\Users\\Viktor\\Projects\\hunghost-react\n"
};