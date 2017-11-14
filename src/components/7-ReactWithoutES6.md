## React without ES6

Normally you would define a React component as a plain JavaScript class:

``` js
class Greeting extends React.Component {
  render() {
    return <h1> Hello, {this.props.name}</h1>;
  }
}
```

if you don't use ES6 yet, you may use the `create-react-class` module instead:

``` js
var createReactClass = recquire('create-react-class');
var Greeting = createReactClass({
  render: fucntion {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

The API of ES6 classes is similar to createReactClass() with a few exceptions.

### Declaring Default Props

With functions and ES6 classes defaultProps is defined as a property on the component itself:

``` js
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
```

With createReactClass(), you need to define getDefaultProps() as a function on the passed object:

``` js
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  };

  // ...
});
```

## Setting the Initial State
In ES6 classes, you can define the intial state by assiging this.state in the constructor:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  },
  // ...
}
```

With creatReactClass(), you have to provide a separate getInitialState method that returns the initial state:

```js
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

### Autobinding

In React components declared as ES6 classes, methods follow the same semantics as regular ES6 classes. This means that they don't automatically bind `this` to the instance. You'll have to explicitly use `.bind(this)` in the constructor:

``` js
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    )
  }
}
```

WIth createReactClass(), this is not necessary because it binds all methods:

```js
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

This means writing ES6 classes comes with a little more boilerplate code for event handlers, but the upside is slightly better performance in large applications.

If the boilerplate code is too unattractive to you, you may enable the experimental Class Properties syntax proposal with Babel:

``` js
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!!'};
  }

  // WARNING: this syntax is experimental!
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

Please note that the syntax above is experimental and the syntax may change, or the proposal might not make it into the language.

If you'd rather play it safe, you have a few options:

- Bind methods in the constructor.
- Use arrow function, e.g. onClick={(e) => this.handleClick(e)}.
- Keep using createReactClass.