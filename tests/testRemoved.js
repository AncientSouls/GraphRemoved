'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = testRemoved;

var _chai = require('chai');

function testRemoved(generateGraphs, ids) {
  it('#remove #fetch #remove #fetch', function (done) {
    var _generateGraphs = generateGraphs();

    var existedGraph = _generateGraphs.existedGraph;
    var nonExistedGraph = _generateGraphs.nonExistedGraph;

    existedGraph.insert({ source: ids[0] }, function (error, id1) {
      _chai.assert.ifError(error);
      existedGraph.fetch(undefined, undefined, function (error, results) {
        _chai.assert.ifError(error);
        _chai.assert.deepEqual(results, [{ id: id1, source: ids[0] }]);
        nonExistedGraph.fetch(undefined, undefined, function (error, results) {
          _chai.assert.ifError(error);
          _chai.assert.deepEqual(results, []);
          existedGraph.remove(id1, function (error, count) {
            _chai.assert.ifError(error);
            existedGraph.fetch(undefined, undefined, function (error, results) {
              _chai.assert.ifError(error);
              _chai.assert.deepEqual(results, []);
              nonExistedGraph.fetch(undefined, undefined, function (error, results) {
                _chai.assert.ifError(error);
                _chai.assert.deepEqual(results, [{ id: id1, source: ids[0], removed: true }]);
                done();
              });
            });
          });
        });
      });
    });
  });
};
//# sourceMappingURL=testRemoved.js.map