var React = require ('react');
var ReactDOM = require ('react-dom');
var ReactDOM = require ('react-dom');
var regions = require ('./regions.js');
var Search = require ('./components/search.jsx');


ReactDOM.render (<Search regions={regions}/>, document.getElementById('app'));