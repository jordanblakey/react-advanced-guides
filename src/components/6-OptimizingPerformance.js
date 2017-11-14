# Optimizing Performance

Internally, React uses several clever techniques to minimize the number of costly DOM operations required to update the UI. For man applications, using React will lead to a fast user interface without doing much work to specifically optimize for performance. Nevertheless, there are several ways you can speed up your React application.

## Use the Production Build

If you're benchmarking or experiencing performance problems in your React apps, make sure you're testing with the minfied production build. By default, React includes many helpful warnings. These warnings are very useful in development. However, they make React larger and slower so you should make sure to use the production version when you deploy the app.

If you aren't sure whethere your build process is set up correctly, you can check it by installing React Developer Tools for Chrome. If you visit a site with React in Production mode, the icon will have a dark background. If you visit a site with React in development mode, the icon will have a red background:

It is expected that you use the development mode when working on your app, and the production mode when deploying your app to the users.

You can find instructions for building your app for production below.

### Create React app

If your project is build with Create React App, run:

`npm run build`

This will create a production build of your app in the `build/` folder of your project.

Remember that this is only necessary before deploying to production. For normal development, use `npm start`.

### Single-File Builds
We offer production-ready versions of React and React DOM as single files:

``` html
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

Remember that only React files ending with `.production.min.js` are suitable for production.

### Brunch
For the most efficient Brunch production build, install the `ugilify-js-brunch` plugin:

``` bash
# If you use npm
npm install --save-dev uglify-js-brunch

# If you use Yarn
yarn add --dev uglify-js-brunch
```

Then, to create a production build, add the `-p` flag to the `build` command:

``` bash
brunch build -4
```

Rememeber that you only need to do this for production builds. You shouldn't pass -p flag or apply this plygin in development because it will hide useful React warnings, and make the builds much slower.

### webpack

Note: If you're using Create React App, plaese follow the instructions above. This section is only relevant if you configure webpack directly.

For the most efficient webpack production build, make sure to include these plugins in your production configuration:

```
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}),
new webpack.optimixe.UglifyJsPlugin()
```

You can learn more about this in webpack documentation.

Remember that you only need to do this for production builds. You shouldn't apply UglifyJsPlugin or DefinePlugin with `'production'` value in development because they will hide useful React warnings, and make the builds much slower.

## Profiling Components with the Chrome Performance Tab

In the development mode, you can visualize how components mount, update, and unmount, using the performance tools in supported browsers. For example:

To do this in Chrome:
1. Load your app with ?react_perf in the query string (for example, http://localhost:3000/?react_perf).
2. Open the Chrome DevTools Performance tab and press Record.
3. Perform the actions you want to profile. Don't record more than 20 seconds or Chrome might hang.
4. Stop Recording.
5. React events will be grouped under the User Timing label.

Note that the numbers are relative so components will render faster in production. Still, this shoudl help you realize when unrelated UI gets updated by mistake, and how deep and how often your UI updates occur.

Currently Chrome, Edge, and IE are the only browsers supporting this feature, but we use the standard User Timing API so we expect more browsers to add support for it.

## Avoid Reconciliation
React builds and maintains an internal representation of the rendered UI. It includes the React elements you return from your compooonents. This reprensentation lets React avoid creating DOM nodes and accessing existing ones beyond necessity, as that can be slower than operations on JavaScript objects. Somtimes it is referred to as a "virtual DOM", but it works the same way on React Native.

When a component's props or state change, React decides whether an actual DOM update is necessay by comparing the newly returned element with the previosly rendered one. When they are not equal, React will update the DOM.

In some cases, your component can speed all of this up by overriding the lifecycle function shouldComponentUpdate, which is triggered before the re-rendering process starts. The default implementation fo this function returns true, leaving React to perform the update:

``` javascript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

### Examples

If the only way your component ever changes is when the props.color or the state.count variable changes, you could have shouldComponentUpdate check that:

``` javascript
class CounterButton extends React.Components {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return(
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}

In this code, `shouldComponentUpdate` is just checking if there is any change in props.color or state.count. If those values don't change, the component doesn't update. If your component got more complex, you could ues a similar pattern of doing a "shallow comparison" between all the fields of props and state to determine if the component should update. This pattern is common enough that React provides a helper to use this logic - just inherit from React.PureComponent. So this code is a simpler way to achieve the same thing:

``` javascript
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {count:1}
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

Most of the time, you can use React.PureComponent instead of writing your own shouldComponentUpdate. It only does a shallow comparison, so you can't use it if the props or state may have been mutated in a way that a shallow comparison would miss.

This can be a problem with more complex data structures. For example, let's say you want a ListOfWords component to render a comma-seperated list of words, with a parent WordAdder component that lets you click a button to add a word to the list. This code does not work correctly:

``` javascript
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // this section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```