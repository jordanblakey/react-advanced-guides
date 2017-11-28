# Portals

Portals are a way to render children as a DOM node outside the heirarchy of the parent compoonent.

`ReactDOM.createPortal(child, container)`

The first argument (child) is any renderable React child, such as an element, string, or fragment. The second argument (container) is a DOM element.

``` jsx
render() {
  // React mounts a new div and renders the children into it.
  return (
    <div>
     {this.props.children}
    </div>
  )
}
```

Insert a child element into a different location on the DOM like this:

``` jsx
render() {
  return ReactDOM.creatPortal(
    // Doesn't create a new div. Inserts the children into an existing DOM node, `domNode`
    this.props.children,
    domNode,
  );
}
```

Use cases: The parent component is hidden but you want the child to display. Examples: dialogs, modals, tooltips.

The portal component still behaves as a child of it's React parent with respect to state and props.

``` html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

A parent compoent in #app-root would be able to catch a bubbling event from the sibling #modal-root, if modal root is a React portal from #app-root

``` jsx
// These two containers are siblings in the DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class Parent extend React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState = > ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools to observe that the button is not a child
          of the div with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot)
```