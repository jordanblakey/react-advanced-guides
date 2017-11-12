////////////////////////////////////////////////////////////////////////////////
// npm install --save prop-types

import PropTypes from "prop-types"; // ES6
var PropTypes = require("prop-types"); // ES5 with npm

// <!-- development version -->
// <script src="https://unpkg.com/prop-types/prop-types.js"></script>

// <!-- production version -->
// <script src="https://unpkg.com/prop-types/prop-types.min.js"></script>

import Raect from "react";
import PropTypes from "proptypes";

class myComponent extends React.Component {
  render() {
    // ...do things with the props
  }
}

myComponent.propTypes = {
  // you can declare that a prop is a specific JS primitive. By default they are all optional.

  optionalArray: PropTypes.array,
  optionalBool: Proptypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values
  optionalEnum: PropTypes.oneOf(["News", "Photos"]),

  // Anobject that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error object if the validation fails.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Valid failed."
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and objectOf`
  // It should return an Error object if the validation fails. The validator will be called for each key in the array or object. The first two arguments of the validator are the array or object itself, and the current item's key.

  customArrayProp: PropTypes.arrayOf(function(
    propValue,
    key,
    componentName,
    location,
    propFullName
  ) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        "Invalid prop `" +
          propFullName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed."
      );
    }
  })
};
