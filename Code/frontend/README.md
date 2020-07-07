# Stress+ Frontend

## Code structure
- Every React component should have their own folder in `src/components`.
- Other non visible functions/services should be placed inside the `src/services` folder.
- All static asserts (e.g. images) should be added in the `public` folder.
- All file and folder names should be in kebab-case: e.g. `arithmetic-test`, `progress-bar.js`

### React components
The folder structure for each component should look the following way:
```
components
└── <name>
    ├── <name>.css
    └── <name>.js
```
The file `<name>.js` contains the actual React component and the file `<name>.css` should contain all the CSS styles for that component.

### Styling with CSS
The CSS class of the root HTML element of a component must be the component's name. The selector of all CSS styles contained in `<name>.css` must start with the class of the root element to prevent conflicts with styles from other components. See the following example for the component `dialpad`:

```jsx
export default function Dialpad() {
  return (
    <div className='dialpad'>
      <div className='foo'></div>
      <button>Click Me!</button> 
    </div>
  );
}
```

The corresponding `dialpad.css` would be:
```css
.dialpad { ... }
.dialpad .foo { ... }
.dialpad button { ... }
```

The documentation of all available CSS selectors can be found [here](https://www.w3schools.com/cssref/css_selectors.asp).

## Code style and formatting
[Prettier](https://prettier.io) and [ESLint](https://eslint.org) are configured for this project to have a consistent code style and formatting.
The code formatter prettier is executed while git is commiting your files. Therefore a well formatted file is always stored in git and you do not need to worry about code formatting.

Some ESLint checks can not be fixed automatically and git will then reject the commit. You need to fix those issues manually. To check your files beforehand, you can use `npm run lint` to run the checks without changing any files.

### ESLint with Visual Studio Code
For [Visual Studio Code](https://code.visualstudio.com) users there exists an [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
which automatically shows code style and formatting violations inside Visual Studio Code. Just install the plugin, it should work out of the box.

## Imports
It is possible to use absolute imports with `src` as the base path.

An example of a relative import is:
``` jsx
import ProgressBar from './../../progress-bar/progress-bar';
```

The following is the same version as an absolute import:
``` jsx
import ProgressBar from 'components/progress-bar/progress-bar';
```
