import React from "react";
import CustomButton from "./CustomButton";

function WarningButton() {
  //return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

// Wrong! This is a component and should ohave been capitalized:
function hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hell {props.toWhat}</div>;
}

function HelloWorld() {
  // Wrong! React thinks <hello />
}

////////////////////////////////////////////////////////////////////////////////

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}

////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { PhotoStrory, VideoStory } from "./stories";

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}

////////////////////////////////////////////////////////////////////////////////

<MyComponent foo={1 + 2 + 3 + 4} />;

function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return (
    <div>
      {props.number} is an {description} number
    </div>
  );
}

<MyComponent message={'hello world'} />
<MyComponent message={'<3'} />
<MyTextBox autocomplete={true} />

function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
  return <Greeting {...props} />;
}

const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
}


const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};

// You can pass a string literal as a prop. These two JSX expressions are equivalent.
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