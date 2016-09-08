import { assert } from 'chai';

export default function testRemoved(generateGraphs, ids) {
  it('#remove #fetch #remove #fetch', function(done) {
    var { existedGraph, nonExistedGraph } = generateGraphs();
    existedGraph.insert({ source: ids[0] }, function(error, id1) {
      assert.ifError(error);
      existedGraph.fetch(undefined, undefined, (error, results) => {
        assert.ifError(error);
        assert.deepEqual(results, [
          { id: id1, source: ids[0] }
        ]);
        nonExistedGraph.fetch(undefined, undefined, (error, results) => {
          assert.ifError(error);
          assert.deepEqual(results, []);
          existedGraph.remove(id1, (error, count) => {
            assert.ifError(error);
            existedGraph.fetch(undefined, undefined, (error, results) => {
              assert.ifError(error);
              assert.deepEqual(results, []);
              nonExistedGraph.fetch(undefined, undefined, (error, results) => {
                assert.ifError(error);
                assert.deepEqual(results, [
                  { id: id1, source: ids[0], removed: true }
                ]);
                done();
              });
            });
          });
        });
      });
    });
  });
};