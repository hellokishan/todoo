**Set up React test with Vite:**

i) Change .eslintrc.cjs with 

**module.exports = {**

 **extends: \[**

**"react-app",**

 **"react-app/jest"**

**\],**

**};**

ii) Add jest in package and add into package.json

   **yarn add-D jest**

iii\_ Add babel presets and add .babelrc to project for jsx support

**yarn add -D @babel/preset-env @babel/preset-react**

iv) Add module Mapper inside package.json jest config to support SVG and CSS files and jest SVG transformer and identity obj proxy.

**yarn add -D jest-svg-transformer identity-obj-proxy**

**Package.json:**   _**"jest": {**_

    _**"moduleNameMapper": {**_

      _**"^.+\\\\.svg$": "jest-svg-transformer",**_

      _**"^.+\\\\.(css|less|scss)$": "identity-obj-proxy"**_

    _**}**_

  _**}**_

v)  Install Jest environment jsdom into jest config:

**yarn add -D jest-environment-jsdom**

**Package.json:**_**"jest": {**_

    _**"testEnvironment": "jsdom",**_

    _**"moduleNameMapper": {**_

      _**"^.+\\\\.svg$": "jest-svg-transformer",**_

      _**"^.+\\\\.(css|less|scss)$": "identity-obj-proxy"**_

    _**}**_

  _**}**_

vi) Now add React testing library and configure

**yarn add -D jest-environment-jsdom**

**Package.json:** _**"jest": {**_

    _**"testEnvironment": "jsdom",**_

    _**"moduleNameMapper": {**_

      _**"^.+\\\\.svg$": "jest-svg-transformer",**_

      _**"^.+\\\\.(css|less|scss)$": "identity-obj-proxy"**_

    _**},**_

    _**"setupFilesAfterEnv": \[**_

      _**"/setupTests.js"**_

    _**\]**_

  _**}**_

vii) if Required for snapshot testing add react test renderer

**yarn add -D react-test-renderer**