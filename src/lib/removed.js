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
  class ExistedGraph extends ParentClassGraph {
    
    /**
     * Standard graph insert, but with locked removed field.
     * 
     * @param {Link} link
     * @param {ExistedGraph~insertCallback} [callback]
     * @param {Object} [context]
     * @return {string} [id]
     */
    insert(link, callback, context) {
      if (link.hasOwnProperty('removed')) delete link.removed;
      return super.insert(link, callback, context);
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
    update(selector, modifier, callback, context) {
      if (context) {
        if (!context.removed) {
          if (modifier.hasOwnProperty('removed')) {
            delete modifier.removed;
          }
        } else {
          modifier.removed = true;
        }
      }
      return super.update(selector, modifier, callback, context);
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
     */
    remove(selector, callback, context) {
      if (!context) var context = {};
      context.removed = true;
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
    query(selector) {
      var _selector;
      if (typeof(selector) != 'object') {
        _selector = {};
        if (typeof(selector) != 'undefined') {
          _selector.id = selector;
        }
      }
      else _selector = selector;
      _selector.removed = undefined;
      return super.query(_selector);
    }
    
    /**
     * Standard graph on method, but considering substitution the remove to the update.
     * 
     * @param {string} event - name
     * @param {ExistedGraphonCallback} callback
     */
    on(event, callback) {
      if (event == 'insert') super.on(event, callback);
      if (event == 'update') {
        super.on('update', function(oldLink, newLink, context) {
          if (!newLink.removed) {
            callback(...arguments);
          }
        });
      }
      if (event == 'remove') {
        super.on('update', function(oldLink, newLink, context) {
          if (newLink.removed) {
            callback(oldLink, undefined, context);
          }
        });
      }
      if (event == 'link') super.on(event, callback);
      if (event == 'unlink') super.on(event, callback);
    }
    
    /**
     * @callback ExistedGraph~onCallback
     * @param {Link} [oldLink] - can be undefined on link and insert events
     * @param {Link} [newLink] - can be undefined on unlink and remove events
     * @param {Object} [context] - additional app information, such as context.userId
     */
  };
  
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
  class NonExistedGraph extends ParentClassGraph {
    
    /**
     * Illegal operation!
     */
    insert() { throw new Error('Illegal operation.'); }
    
    /**
     * Standard graph update, but with locked removed field in modifier.
     * 
     * @param {string|LinkSelector} selector
     * @param {LinkModifier} modifier
     * @param {ExistedGraph~updateCallback} [callback]
     * @param {Object} [context]
     * @return {number} [count]
     */
    update(selector, modifier, callback, context) {
      if (modifier.hasOwnProperty('removed')) delete modifier.removed;
      return super.update(selector, modifier, callback, context);
    }
    
    /**
     * Standard graph query, but visible only links where removed is undefined.
     * 
     * @param {string|LinkSelector} selector
     * @return {*} query
     */
    query(selector) {
      var _selector;
      if (typeof(selector) != 'object') {
        _selector = {};
        if (typeof(selector) != 'undefined') {
          _selector.id = selector;
        }
      }
      else _selector = selector;
      _selector.removed = true;
      return super.query(_selector);
    }
    
    /**
     * Standard graph on method, but considering substitution the remove to the update.
     * 
     * @param {string} event - name
     * @param {ExistedGraphonCallback} callback
     */
    on(event, callback) {
      if (event == 'insert') {
        // Impossible on object adapter of graph, but in real db
        super.on('update', function(oldLink, newLink, context) {
          if (!oldLink.removed && newLink.removed) {
            callback(...arguments);
          }
        });
      }
      if (event == 'update') {
        super.on('update', function(oldLink, newLink, context) {
          if (oldLink.removed && newLink.removed) {
            callback(...arguments);
          }
        });
      }
      if (event == 'remove') super.on(event, callback);
      if (event == 'link') super.on(event, callback);
      if (event == 'unlink') super.on(event, callback);
    }
    
    /**
     * @callback ExistedGraph~onCallback
     * @param {Link} [oldLink] - can be undefined on link and insert events
     * @param {Link} [newLink] - can be undefined on unlink and remove events
     * @param {Object} [context] - additional app information, such as context.userId
     */
  };
  
  return NonExistedGraph;
}

export { factoryExistedGraph, factoryNonExistedGraph };