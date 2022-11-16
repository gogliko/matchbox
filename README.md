# Matchbox Game

Matchbox is a matching game where players compete to see who can find the most pairs of matching cards. The game is
setup by shuffling a card set that contains pairs of identical cards and randomly arranging these into a grid with each
card face-down.

## Installation and Development

### Installation

Prerequisites: [Node.js](https://nodejs.org/) >= 14.

You can use [NVM](https://github.com/nvm-sh/nvm#installation) (macOS/Linux)
/ [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node version.

The project already contains `.nvmrc` file which includes the working version of the node.

------
First you need to run
`
npm install
`
then `npm start` and  http://localhost:3000 will be opened by default in the browser.

### Development

#### Project structure

General structure of all components

```
 Component // Component folder
         ├─ __tests__ // Test files.
         ├─ hooks // Contains all related hooks.
         ├─ types // Contains all related types.
         ├─ Component.tsx/ts // Component file.
         ├─ index.ts // Exporting all component related things.
         └─ style.ts // Contains all related styles for the component.
```

Folder structure in the project

```
📦 
├─ __mocks__ // Mock files for testing usage.
├─ assets // Includes images and other assets for the project.
├─ components // Includes reusable UI components .
├─ game // Includes game logic.
├─ hoc // Includes High-Order components.
├─ hooks // Includes global hooks.
├─ pages // Includes pages for the project.
├─ styles // Includes global styles for project. 
├─ test // Test utils folder. 
└─ utils // Includes global util functions and constants. 
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm lint`

Identifying problematic patterns found.

### `npm lint-fix`

Fix problematic patterns.

### `npm format`

Prettier enforces a consistent code style

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

