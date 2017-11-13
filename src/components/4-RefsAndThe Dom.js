# Refs and the DOM
In the typical React dataflow, props are the only way that parent commponents iteract with their children. To modify a child, you re-render it with new props. However, there are a few casese where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

When to Use Refs:
There are a few good use cases for refs:
- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

Avoid using refs for anythin that can be done declaratively.

For example instead of exposing open() and close() methods on a Dialog component, pass an isOpen prop to it.

Don't Overuse Refs
Your first inclination may be to use refs to "make things happen" in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. Often, it becomes clear that the proper place to "own" that state is at a higher level in the hierarchy. See the Lifting State Up guide for examples of this.

Adding a Ref to a DOM Element
React supports a special attribute that you can attach to any component. the ref attribute takes a callback function, and the calback will be executed immediately after the component is mounted or unmounted.

When the ref attribute is used on HTML element, the ref callback receives the underlying DOM element as its argument. For example, this code usese the ref callback to store a reference to a DOM node:

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
          ref={(input) => { this.textInput = input; }}
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

Here, the ref callback is first specified by Grandparent. It is passed to the Parent as a regular prop called inputRef, and the Parent passes it to the CustomTextInput as a prop too. Finally, the CustomTextInput reads the inputRef prop and attaches the passed function as a ref attribute to the <input>. As a result, this.inputElement in Grandparent will be set to the DOM node corresponding to the <input> element in the CustomTextInput.

All things considered, we advise agains exposing DOM nodes whenever possible, but this can be a useful escape hatch. Not that this approach requires you to add some code to the child component. if you have absolutely no control over the child component implementation, your last option is to use findDOMNode(), but it is discouraged.

Legacy API: String Refs
If you worked with React before, you might be familiar with an older API where the ref attribute is a string, like "textInput", and the DOM node is accessed as this.refs.text.Input. We advise agains it because string refs have some issues, are considered legacy, and are likely to be removed in one ooof the future releases. If you're currently using this.refs.textInput to access refs, we recommend the callback pattern instead.