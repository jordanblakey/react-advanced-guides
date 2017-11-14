# React Advanced Guides
JSX in Depth, PropTypes, Static Types, Refs &amp; DOM, Uncontrolled Components, Perf, Sans-ES6/JSX, Reconciliation, Context, Portals, Err Boundaries, Web Components, Higher-Order Components, Integration with other Libraries, Accessibility

---
## JSX in Depth

``` JSX
//These two JSX expressions are equivalent.
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />

// When you pass a string literal, it's value is HTML-unescaped. So, these expressions are equivalent.
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />

// If you pass no value for a prop, it defaults to true. These two JSX expressions are equivalent.
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />

// Spread Attributes: If you alterady have props as an object, and you want to pass it in JSX, you can use ... as a "spread" operator to pass the whole props object.
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2(){
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />
}

const Button = props => {
  const { kind, ...other } = props;
  const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};

// In the example above, the kind prop is safely consumed and is not passed on to the button element in the DOM.
// All other props are passed via the ...other object making this component really flexible. You can see that it passes an onClick and children props.


// You can put a string between the opening and closing tags and props.children will just be that string
// JSX trims all whitespace.
<MyComponent>Hello world!</MyComponent>
<div>This is valid HTML &amp; JSX at the same time</div>

// You can nest components in JSX.
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>

<div>
  Here is a list.
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>

render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key='A'>First Item</li>,
    <li key='B'>Second Item</li>,
    <li key='C'>Third Item</li>,
  ];
}

// You can pass any Javascript expression as children, by enclosing it within {}
<MyComponent>foo</MyComponent>
<MyComponent>{foo}</MyComponent>



// This is often useful for rendering a list of JSX expressions of arbitrary length. For example, this renders an HTML list:
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  )
}

//
function Hello(props) {
  return <div>Hello {props.addressee}!</div>
}


// Functions as Children
function Repeat(props) {
  let items = [];
  for (let i=0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}


// false, null, undefined, and true are valid children. They simply don't render. These JSX expressions will all render to the same thing:
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>


// This can be useful to conditionally render React elements. This JSX only renders a <Header /> if showHeader is true:
<div>
  {showHeader && <Header />}
  <Content />
</div>

// 0 will still be rendered by React. To fix this, make sure that the expression before && is always boolean:
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>

// Conversely, if you want a value like false, true, null, or undefined to appear in the output, you have to convert it to a string first:
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```

## Typechecking with PropTypes

You can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow
or TypeScript to typecheck your whole application. If you don't use those, React has some built in typechecking abilities.
To run typechecking on the props for a component, you can assign the special propTypes property:

``` js
  import PropTypes from 'prop-types';

  class Greeting extends React.Component {
    render() {
      return (
        <h1>Hello, {this.props.name}</h1>
      );
    }
  }

  Greeting.propTypes = {
    name: PropTypes.string
  };
```

PropTypes exports a range of validators that can be used to make sure that the datae you receive is valid. In this example, we're using PropTypes.string. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, propTypes is only checked in development mode.

Requiring Single Child
With Proptypes.element you can specify that only a single child can be passed on to a component as children.

``` js
import PropTypes from 'prop-types'

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

Default Prop Values
You can define default values for your props by assigning to the special defaultProps property:

``` js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

If you are using a Babel transform like transform-class-properties, you can also declare defaultProps as static property within a React component class. This syntax has not yet been finalized though and will require a compilation step to work within a browser. For more information, see the class fields proposal.

``` js
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render () {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

The defaultProps will be used to ensure that this.props.name will have a value if it was not specified by the parent component. The propTypes typechecking happens after defaultProps are resolved, so typechecking will also apply to the defaultProps.

## Static Type Checking

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

# Refs and the DOM
In the typical React dataflow, props are the only way that parent commponents iteract with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

When to Use Refs:
There are a few good use cases for refs:
- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

Avoid using refs for anything that can be done declaratively.

For example instead of exposing open() and close() methods on a Dialog component, pass an isOpen prop to it.

## Don't Overuse Refs
Your first inclination may be to use refs to "make things happen" in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. Often, it becomes clear that the proper place to "own" that state is at a higher level in the hierarchy. See the `Lifting State Up` guide for examples of this.

## Adding a Ref to a DOM Element
React supports a special attribute that you can attach to any component. the ref attribute takes a callback function, and the calback will be executed immediately after the component is mounted or unmounted.

When the ref attribute is used on HTML element, the ref callback receives the underlying DOM element as its argument. For example, this code usese the ref callback to store a reference to a DOM node:

``` jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.text.Input.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          // ref={(input) => { this.textInput = input; }}
          ref={input => this.textInput = input}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

## Adding a Ref to a Class Component
When the ref attribute is used on a custom component declared as a class, the ref callback receives the mounted instance of the component as its argument. For example, if we wanted to wrap the CustomTextInput above to simulate it being clicked immediately after mounting:

``` js
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    this.textInput.focusTextInput();
  }

  render() {
    return(
      <CustomTextInput
        ref={(input) => {this.textInput = input; }} />
    );
  }
}
```

Note that this only works if CustomTextInput is declared as a class:

``` js
  class CustomTextInput extends React.Component {
    // ...
  }
```

### Refs and Functional Components
You may not use the ref attribute on functional components because they don't have instances.

``` js
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  return() {
    // This will *not* work!
    return (
      <MyFunctionalComponent
        ref={(input) => {this.textInput = input; }} />
    );
  }
}
```

You should convert the component to a class if you need to use a ref to it, just like you do when you need lifecycle methods or state.

You can, hoever, use the ref attribute instide a functional component as long as you refer to a DOM element or a class component:

``` js
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handle Click() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => {textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

### Exposing DOM Refs to Parent Components
In rare cases, you might want to have access to a child's DOM node from a parent component. This is generally not recommended because it breaks component encapsulation, but it can occasionally be useful for triggering focus or measuring the size or position of a child DOM node.

While you could add a ref to the child component, this is not an ideal solution, as you would only get a component instance rather than a DOM node. Additionally, this wouldn't work with functional components.

Instead, in such cases we recommend exposing a special prop on the child. The child would take a function prop with an arbitrary name (e.g. inputRef) and attach it to the DOM node as a ref attribute. This lets the parent pass its ref callback to the child's DOM node through the component in the middle.

This works both for classes and for functional components.

``` js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

In the example above, Parent passes its ref callback as an inputRef prop to the CustomTextInput,
and the CustomTextInput passes the same function as a special ref attribute to the <input>. As a result,
this.inputElement in Parent will be set to the DOM node corresponding to the <input> element in the CustomTextInput.

Note that the name of the inputRef prop in the above example has no special meaning, as it is a regular component prop. However, using the ref attribute on the <input> itself is important, as it tells React to attach a ref to its DOM node.

This works event though CustomTextInput is a functional component. Unlike the special ref attribute which can only be specified for DOM elements and for class components, there are no restrictions on regular component props like inputRef.

Another benefit of this pattern is that it works several components deep. For example, imagine Parent didn't need that DOM node, but a component that rendered Parent (let's call it Grandparent) needed access to it. Then we could let the Grandparent specify the inputRef prop to the Parent, and let Parent "forward" it to the CustomTextInput.

``` js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

function Parent(props) {
  return(
    <div>
      My input: <CustomTextInput inputRef={props.inputRef} />
    </div>
  );
}

class Grandparent extends React.Component {
  render() {
    return (
      <Parent
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

Here, the ref callback is first specified by Grandparent. It is passed to the Parent as a regular prop called inputRef, and the Parent passes it to the CustomTextInput as a prop too. Finally, the CustomTextInput reads the inputRef prop and attaches the passed function as a ref attribute to the <input>. As a result, this.inputElement in Grandparent will be set to the DOM node corresponding to the <input> element in the CustomTextInput.

All things considered, we advise agains exposing DOM nodes whenever possible, but this can be a useful escape hatch. Not that this approach requires you to add some code to the child component. if you have absolutely no control over the child component implementation, your last option is to use findDOMNode(), but it is discouraged.

### Legacy API: String Refs
If you worked with React before, you might be familiar with an older API where the ref attribute is a string, like "textInput", and the DOM node is accessed as this.refs.text.Input. We advise agains it because string refs have some issues, are considered legacy, and are likely to be removed in one ooof the future releases. If you're currently using this.refs.textInput to access refs, we recommend the callback pattern instead.

### Caveats
If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOMm element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by definingin the ref callback as a bound method on the class, but not that it shouldn't matter in most cases.


## Uncontrolled Componenents
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

To write an uncontrolled component, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM. For example, this code accepts a single name in an uncontrolled component:

``` js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slighttly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.

If it's still not clear which type of compoonent you should use for a particular situation, you might find this article on controlled versus uncontrolled inputs to be helpful.

## Default values
In the React rendering lifecycle, the value attribute on form elements will override the value in the DOM. With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. To handle this case, you can specify a defualtValue attribute instead of value.

``` js
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Likewise, <input type="checkbox"> and <input type="radio"> support defaultChecked, and <select> and <textarea> supports defaultValue.

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
```

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

The problem is `PureComponent` will do a simple comparison between the old and new values of `this.props.words`. Since this code mutates the `words` array in the `handleClick` method of `WordAdder`, the old and new values of `this.props.words` will compare as equal, even though the actual words in the array have changed. The `ListOfWords` will thus not update even though it has new words that should be rendered.

## The Power of Not Mutating Data

The simplest way to avoid this problem is to avoid mutating values that you are using as props or state. For example, the `handleClick` method above could be rewritten using concat as:

``` js
handleCliick() {
  this.setState(prevState => ({
    words: prevState.words.concat(['marklar'])
  }));
}
```

ES6