## React Withoud JSX

JSX is not a requirement for using React. Using React without JSX is especially convenient when you don't want to set up compilation in your build environment.

Each JSX element is just syntactic sugar for calling React.createElement(component, props, ...children). So, anything you can do with JSX can also be done with just plain JavaScript.

For example, this code written with JSX:

```js
class Hello extends React.Component {
  render() {
    return <div> Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

can be compiled to this code that does not use JSX:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

If you're curious to see more examples of how JSX is converted to JavaScript, you can try out the online Babel compiler.

The component can either be provided as a string, or as a subclass of React.Component, or a plain function for stateless components.

If you get tired of typing React.createElement so much, one common pattern is to assign a shorthand:

``` js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```