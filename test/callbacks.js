const assert = require('assert');
const isObject = require('lodash/isObject');
const defer = require('lodash/defer');
const client = require('../');

describe('Test Stratum client[callbacks]', () => {
  // Test for onConnect getting called
  it('onConnect', (done) => {
    const handle = client({
      server: "grlcgang.com",
      port: 3333,
      worker: "KorkyMonster.testing",
      password: "x",
      onConnect: () => {
        handle.shutdown();
        done();
      },
    });
  });

  // Test for onClose getting called
  it('onClose', (done) => {
    const handle = client({
      server: "grlcgang.com",
      port: 3333,
      worker: "KorkyMonster.testing",
      password: "x",
      onConnect: () => handle.shutdown(),
      onClose: () => done(),
    });
  });

  // Test for onClose getting called TODO
  it('onAuthorize', (done) => {
    const handle = client({
      server: "grlcgang.com",
      port: 3333,
      worker: "KorkyMonster.testing",
      password: "x",
      onAuthorize: (error, result) => {
        console.log(result);
        console.log(error);
        assert.ok(result !== null);
        handle.shutdown();
      },
      onClose: () => done(),
    });
  });

  // Test for onNewDifficulty getting called
  it('onNewDifficulty', (done) => {
    const handle = client({
      server: "grlcgang.com",
      port: 3333,
      worker: "KorkyMonster.testing",
      password: "x",
      onNewDifficulty: newDiff => {
        assert.ok(newDiff > 0);
        handle.shutdown();
      },
      onClose: () => done(),
    });
  });

  // Test for onSubscribe getting called
  it('onSubscribe', (done) => {
    let doneCalled = false;
    const handle = client({
      id: 'onSubscribeTest',
      server: "grlcgang.com",
      port: 3333,
      worker: "KorkyMonster.testing",
      password: "x",
      onSubscribe: (result) => {
        assert.ok(isObject(result) && result !== null);
        defer(handle.shutdown);
      },
      onClose: () => {
        if (!doneCalled) {
          doneCalled = true;
          done();
        }
      },
    });
  });

  // // Test for onNewMiningWork getting called
  it('onNewMiningWork', (done) => {
    const handle = client({
      server: "grlcgang.com",
      port: 3333,
      worker: "KorkyMonster.testing",
      password: "x",
      onNewMiningWork: (workObject) => {
        assert.ok(isObject(workObject) && workObject !== null);
        handle.shutdown();
      },
      onClose: () => done(),
    });
  });

});
