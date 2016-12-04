'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factoryNonExistedGraph = exports.factoryExistedGraph = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This method allows you to use ExistedGraph class to its inheritance chain.
 *
 * @param {Class} ParentClassGraph
 * @return {Class} Graph
 * @description `import { factoryExistedGraph } from 'ancient-graph-removed';`
 */
function factoryExistedGraph(ParentClassGraph) {

  /**
   * Class to inherit. It must be used after adapting to the database..
   * Distorts graph logic so that the use of two-stage removal.
   * It is a public, not a removed part of the graph.
   * 
   * @class
   * @description `var ExistedGraph = factoryExistedGraph(Graph);`
   */
  var ExistedGraph = function (_ParentClassGraph) {
    _inherits(ExistedGraph, _ParentClassGraph);

    function ExistedGraph() {
      _classCallCheck(this, ExistedGraph);

      return _possibleConstructorReturn(this, (ExistedGraph.__proto__ || Object.getPrototypeOf(ExistedGraph)).apply(this, arguments));
    }

    _createClass(ExistedGraph, [{
      key: 'insert',


      /**
       * Standard graph insert, but with locked removed field.
       * 
       * @param {Link} link
       * @param {ExistedGraph~insertCallback} [callback]
       * @param {Object} [context]
       * @return {string} [id]
       */
      value: function insert(link, callback, context) {
        if (link.hasOwnProperty(this.config.aliases['removed'])) delete link[this.config.aliases['removed']];
        return _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'insert', this).call(this, link, callback, context);
      }

      /**
       * Optional callback. If present, called with an error object as the first argument and, if no error, the unique id of inserted link as the second.
       *
       * @callback ExistedGraph~insertCallback
       * @param {Error} [error]
       * @param {string} [id]
       */

      /**
       * Standard graph update, but with locked removed field in modifier, if context.removed is not true.
       * 
       * @param {string|LinkSelector} selector
       * @param {LinkModifier} modifier
       * @param {ExistedGraph~updateCallback} [callback]
       * @param {Object} [context]
       * @return {number} [count]
       */

    }, {
      key: 'update',
      value: function update(selector, modifier, callback, context) {
        if (modifier.hasOwnProperty(this.config.aliases['removed'])) {
          delete modifier[this.config.aliases['removed']];
        }
        if (context) {
          if (context.modifier) {
            modifier = _lodash2.default.assign(modifier, context.modifier);
          }
        }
        return _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'update', this).call(this, selector, modifier, callback, context);
      }

      /**
       * Optional callback. If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
       *
       * @callback ExistedGraph~updateCallback
       * @param {Error} [error]
       * @param {number} [count]
       */

      /**
       * Instead of removing the changes remove field to true.
       * 
       * @param {string|LinkSelector} selector
       * @param {ExistedGraph~removeCallback} [callback]
       * @param {Object} [context]
       * @param {Object} [context.modifier] - update modifier
       */

    }, {
      key: 'remove',
      value: function remove(selector, callback, context) {
        if (!context) var context = {};
        if (!context.modifier) context.modifier = {};
        context.modifier[this.config.aliases['removed']] = true;
        this.update(selector, {}, callback, context);
      }

      /**
       * Optional callback. If present, called with an error object as the first argument.
       *
       * @callback ExistedGraph~removeCallback
       * @param {Error} [error]
       * @param {number} [count]
       */

      /**
       * Standard graph query, but visible only links where removed is undefined.
       * 
       * @param {string|LinkSelector} selector
       * @return {*} query
       */

    }, {
      key: 'query',
      value: function query(selector) {
        var _selector;
        if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) != 'object') {
          _selector = {};
          if (typeof selector != 'undefined') {
            _selector[this.config.aliases['id']] = selector;
          }
        } else _selector = selector;
        _selector[this.config.aliases['removed']] = undefined;
        return _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'query', this).call(this, _selector);
      }

      /**
       * Standard graph on method, but considering substitution the remove to the update.
       * 
       * @param {string} event - name
       * @param {ExistedGraphonCallback} callback
       */

    }, {
      key: 'on',
      value: function on(event, callback) {
        if (event == 'insert') _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'on', this).call(this, event, callback);
        if (event == 'update') {
          _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'on', this).call(this, 'update', function (oldLink, newLink, context) {
            if (!newLink[this.config.aliases['removed']]) {
              callback.apply(undefined, arguments);
            }
          });
        }
        if (event == 'remove') {
          _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'on', this).call(this, 'update', function (oldLink, newLink, context) {
            if (newLink[this.config.aliases['removed']]) {
              callback(newLink, undefined, context);
            }
          });
        }
        if (event == 'link') _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'on', this).call(this, event, callback);
        if (event == 'unlink') _get(ExistedGraph.prototype.__proto__ || Object.getPrototypeOf(ExistedGraph.prototype), 'on', this).call(this, event, callback);
      }

      /**
       * @callback ExistedGraph~onCallback
       * @param {Link} [oldLink] - can be undefined on link and insert events
       * @param {Link} [newLink] - can be undefined on unlink and remove events
       * @param {Object} [context] - additional app information, such as context.userId
       */

    }]);

    return ExistedGraph;
  }(ParentClassGraph);

  ;

  return ExistedGraph;
}

/**
 * This method allows you to use NonExistedGraph class to its inheritance chain.
 *
 * @param {Class} ParentClassGraph
 * @return {Class} Graph
 * @description `import { factoryNonExistedGraph } from 'ancient-graph-removed';`
 */
function factoryNonExistedGraph(ParentClassGraph) {

  /**
   * Class to inherit. It must be used after adapting to the database..
   * Distorts graph logic so that the use of two-stage removal.
   * It is a private, a removed part of the graph.
   * 
   * @class
   * @description `var NonExistedGraph = factoryNonExistedGraph(Graph);`
   */
  var NonExistedGraph = function (_ParentClassGraph2) {
    _inherits(NonExistedGraph, _ParentClassGraph2);

    function NonExistedGraph() {
      _classCallCheck(this, NonExistedGraph);

      return _possibleConstructorReturn(this, (NonExistedGraph.__proto__ || Object.getPrototypeOf(NonExistedGraph)).apply(this, arguments));
    }

    _createClass(NonExistedGraph, [{
      key: 'insert',


      /**
       * Illegal operation!
       */
      value: function insert() {
        throw new Error('Illegal operation.');
      }

      /**
       * Standard graph update, but with locked removed field in modifier.
       * 
       * @param {string|LinkSelector} selector
       * @param {LinkModifier} modifier
       * @param {ExistedGraph~updateCallback} [callback]
       * @param {Object} [context]
       * @return {number} [count]
       */

    }, {
      key: 'update',
      value: function update(selector, modifier, callback, context) {
        if (modifier.hasOwnProperty(this.config.aliases['removed'])) delete modifier[this.config.aliases['removed']];
        return _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'update', this).call(this, selector, modifier, callback, context);
      }

      /**
       * Standard graph query, but visible only links where removed is undefined.
       * 
       * @param {string|LinkSelector} selector
       * @return {*} query
       */

    }, {
      key: 'query',
      value: function query(selector) {
        var _selector;
        if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) != 'object') {
          _selector = {};
          if (typeof selector != 'undefined') {
            _selector[this.config.aliases['id']] = selector;
          }
        } else _selector = selector;
        _selector[this.config.aliases['removed']] = true;
        return _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'query', this).call(this, _selector);
      }

      /**
       * Standard graph on method, but considering substitution the remove to the update.
       * 
       * @param {string} event - name
       * @param {ExistedGraphonCallback} callback
       */

    }, {
      key: 'on',
      value: function on(event, callback) {
        if (event == 'insert') {
          // Impossible on object adapter of graph, but in real db
          _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'on', this).call(this, 'update', function (oldLink, newLink, context) {
            if (!oldLink[this.config.aliases['removed']] && newLink[this.config.aliases['removed']]) {
              callback(undefined, newLink, context);
            }
          });
        }
        if (event == 'update') {
          _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'on', this).call(this, 'update', function (oldLink, newLink, context) {
            if (oldLink[this.config.aliases['removed']] && newLink[this.config.aliases['removed']]) {
              callback.apply(undefined, arguments);
            }
          });
        }
        if (event == 'remove') _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'on', this).call(this, event, callback);
        if (event == 'link') _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'on', this).call(this, event, callback);
        if (event == 'unlink') _get(NonExistedGraph.prototype.__proto__ || Object.getPrototypeOf(NonExistedGraph.prototype), 'on', this).call(this, event, callback);
      }

      /**
       * @callback ExistedGraph~onCallback
       * @param {Link} [oldLink] - can be undefined on link and insert events
       * @param {Link} [newLink] - can be undefined on unlink and remove events
       * @param {Object} [context] - additional app information, such as context.userId
       */

    }]);

    return NonExistedGraph;
  }(ParentClassGraph);

  ;

  return NonExistedGraph;
}

exports.factoryExistedGraph = factoryExistedGraph;
exports.factoryNonExistedGraph = factoryNonExistedGraph;
//# sourceMappingURL=removed.js.map