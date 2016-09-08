require('source-map-support').install();

import { Graph } from 'ancient-graph/lib/adapters/object.js';
import { factoryExistedGraph, factoryNonExistedGraph } from '../';
import testRemovedGraph from './testRemoved.js';

describe('AncientSouls/GraphRemoved', function() {
  function generateRemovedGraphs() {
    var ExistedGraph = factoryExistedGraph(Graph);
    var NonExistedGraph = factoryNonExistedGraph(Graph);
    
    var existedGraph = new ExistedGraph([], { id: 'id', source: 'source', target: 'target', removed: 'removed' });
    var nonExistedGraph = new NonExistedGraph(existedGraph.collection, { id: 'id', source: 'source', target: 'target', removed: 'removed' });
    
    return { existedGraph, nonExistedGraph };
  };
  
  describe('ExistedGraph and NonExistedGraph', function() {
    testRemovedGraph(generateRemovedGraphs, ['0']);
  });
});