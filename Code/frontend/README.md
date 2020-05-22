# Stress App Frontend

## Development workflow
Please refer to the following steps every time you start developing a new feature.
1. The Frontend requires [NodeJS](https://nodejs.org/en/) to be installed on your computer (if you have already installed NodeJS, skip this step)
2. `git checkout master`
3. `git pull origin master`
4. Create a merge request from an issue in GitLab. Add the label `In Progress` to the corresponding issue. No need to add a label to the merge request at this step.
5. `git fetch`
6. `git checkout <branch-name>` Checks out the branch of the merge request created in step 4. `<branch-name>` must be replaced with the branch name of the merge request. The branch name will start with the corresponding issue number.
7. Run `npm install` to install or update all dependencies like ReactJS
8. Run `npm run start` to start the frontend development server
9. Apply your changes and watch the browser automatically reloading the page after editing and saving a file
10. Commit your changes
11. Push your changes with `git push origin <branch-name>`
12. Tag your merge request with the label `Waiting for review` and update the issue with the completed tasks. 
13. Wait for review and update your merge request if changes are requested. It will be indicated with the label `Review: Needs Change`.
14. IMPORTANT: Do not merge your changes into master on your own! Instead, after applying the requested changes, switch the label to `Waiting for review` again
15. If there are important new changes on master that you need in your implementation, or if there is a merge conflict (indicated by the reviewer):
    1. `git fetch origin master:master`
    2. `git rebase master`
    3. Resolve potential conflicts and check if your code still works.
    4. `git push origin <branch-name> --force-with-lease`
16. Once the branch is merged
    1. `git checkout master`
    2. `git branch -D <branch-name>`

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
[ESLint](https://eslint.org) is configured to check for some code style and formatting rules.
Use `npm run lint` to run the checks and see your violations.

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
