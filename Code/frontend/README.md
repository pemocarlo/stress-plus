# Stress App Frontend

## Development workflow
1. The Frontend requires [NodeJS](https://nodejs.org/en/) to be installed on your computer
2. Run `npm install` to install all dependencies like ReactJS
3. Run `npm run start` to start the frontend development server
4. Apply your changes and watch the browser automatically reloading after editing and saving a file

## Code structure
- Every React component should have their own folder in `src/components`.
- Other non visible functions/services should be placed inside the `src/services` folder.
- All static asserts (e.g. images) should be added in the `public` folder.

## Code style and formatting
[ESLint](https://eslint.org) is configured to check for some code style and formatting rules.
Use `npm run lint` to run the checks and see your violations.

### ESLint with Visual Studio Code
For [Visual Studio Code](https://code.visualstudio.com) users there exists an [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
which automatically shows code style and formatting violations inside Visual Studio Code. Just install the plugin, it should work out of the box.

## Imports
It is possible to use absolute imports with `src` as the base path.

An example of a relative import is:
``` jsx
import ProgressBar from './../../progressBar/ProgressBar';
```

The following is the same version as an absolute import:
``` jsx
import ProgressBar from 'components/progressBar/ProgressBar';
```
