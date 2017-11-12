Static Type Checkers like Flow and TypeScript identify certain types of problems before you even run your code. They can also improve developer workflow by adding features like auto-completion. For this reason, we recommend using Flow or TypeScript instead of PropTypes for larger code bases.

``` js
  yarn add --dev babel-preset-flow
```

Then add flow to your Babel presets config

``` json
  {
    "presets": ["flow"]
  }
```

Using Flow with Create React App

`Create React App` supports Flow by default. Just install Flow and create a `.flowconfig` file by running `flow init`.

``` bash
  create-react-app my-app
  cd my-app
  yarn add --dev flow-bin
  yarn run flow init
```

Flow will now be run as part of create-react-app's scripts.