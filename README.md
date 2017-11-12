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