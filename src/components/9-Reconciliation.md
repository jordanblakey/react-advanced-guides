# Reconciliation

A declarative API that diffs virtual DOM changes and makes performant changes. Think git for DOM.

render() creates tree of React elements.
On state or props update, a new render tree is returned.

To be preformant at (O)n, React makes assumtions:

- Two elements of different types will produce different trees.
- Hints that an element will not update, with the `key` prop.

## Different types of elements

React compares root elements between trees first.
If they are different types, it rebuilds the tree completely (i.e. `<a>` -> `<img>`, `<Article>` -> `<Comment>`).

On update:

- componentWillUnmount() is fired and cascades down the tree.
- componentWillMount() cascades down the new tree.
- componentDidMount() cascades.

## DOM elements of same type

``` jsx
<div className="before" title="stuff">
<div className="after" title="stuff">

<div style={{color: 'red', fontWeight: 'bold'}} />
<div style={{color: 'green', fontWeight: 'bold'}} />
```

React will only update the className, and color respectively.

For component elements (not DOM), these events are fired:

- componentWillRecieveProps(), recurse
- componentWillUpdate(), recurse

## Recursing on children

``` jsx
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

Keys make updating this list much more performant.
Create them from your data. Don't use indexes as keys.

``` jsx
<li key={item.id}>{item.name}</li>
```

## Takeaways

If you see yourself alternating between two component types with very similar output, you may want to make it the same type.

Key should be stable, predictable, and unique.