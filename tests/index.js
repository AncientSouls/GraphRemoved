'use strict';

var _object = require('ancient-graph/lib/adapters/object.js');

var _ = require('../');

var _testRemoved = require('./testRemoved.js');

var _testRemoved2 = _interopRequireDefault(_testRemoved);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('source-map-support').install();

describe('AncientSouls/GraphRemoved', function () {
  function generateRemovedGraphs() {
    var ExistedGraph = (0, _.factoryExistedGraph)(_object.Graph);
    var NonExistedGraph = (0, _.factoryNonExistedGraph)(_object.Graph);

    var existedGraph = new ExistedGraph([], { id: 'id', source: 'source', target: 'target', removed: 'removed' });
    var nonExistedGraph = new NonExistedGraph(existedGraph.collection, { id: 'id', source: 'source', target: 'target', removed: 'removed' });

    return { existedGraph: existedGraph, nonExistedGraph: nonExistedGraph };
  };

  describe('ExistedGraph and NonExistedGraph', function () {
    (0, _testRemoved2.default)(generateRemovedGraphs, ['0']);
  });
});
//# sourceMappingURL=index.js.map