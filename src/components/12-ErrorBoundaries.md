# Error Boundaries

A way to handle external Javascript errors affecting React components.

- UI js errors don't have to break the whole app.

Error boundaries are React components that catch JavaScript errors anywhere in their
child component tree, log those errors, and display a fallback UI instead of the
component tree that crashed.

They do not catch errors for:

- Event handlers
- Asynchronous code
- Servers side rendering
- Errors thrown in the error boundary itself

## Example

``` jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false };
  }
  componentDidCatch(error,info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error,info);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

componentDidCatch() method works like a JavaScript catch{} block, but for
components. Only class components can be error boundarie. In practice, most
of the time you'll want to declare an error boundary component once and use it
throughout your application.

componentDidCatch() only catches errors in components below them in the tree.
This is similar to the catch {} behavior.

info is an object with componentStack key. The property has information about
component stack during thrown error.

``` jsx
componentDidCatch(error, info) {
  /* Example stack information
     in ComponentThatThrows (created by App)
     in ErrorBoundary (created by App)
     in div (created by App)
     in App
  */
  logComponentStackToMyService(info.componentStack);
}
```

## New Behavior for Uncaught Error

## How About try/catch
try/catch is great but it only works for imperative code:

``` js
  try {
    showButon();
  } catch (error) {
    //...
  }
```

But, React components are declarative.
For example, if an error occurs in a componentDidUpdate hook caused by a setState
somewhere deep in the tree, it will still correctly propagate to the closest error boundary.

React doesn't need to catch event handler errors, because these don't happen during rendering.

If you need to catch errors in an event handler, use the reguaar try/catch

``` jsx
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }

    handleClick = () => {
      try {
        // Do something that could throw
      } catch (error) {
        this.setState({ error });
      }
    }

    render() {
      if (this.state.error) {
        return <h1>Caught an error.</h1>
      }
      return <div onClick={this.handleClick}>Click Me</div>
    }
  }
```