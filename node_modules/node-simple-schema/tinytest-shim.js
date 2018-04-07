var expect = require("chai").expect;
var test = {
  equal: function(actual, expected, msg) {
    expect(actual).to.eql(expected, msg);
  },
  notEqual: function(actual, expected, msg) {
    expect(actual).to.not.eql(expected, msg);
  },
  instanceOf: function(obj, klass) {
    expect(obj).to.be.an.instanceof(klass);
  },
  matches: function(actual, regexp, msg) {
    expect(actual).to.match(regexp, msg);
  },
  notMatches: function(actual, regexp, msg) {
    expect(actual).to.not.match(regexp, msg);
  },
  throws: function(fn, expected) {
    expect(fn).to.throw(expected);
  },
  isTrue: function(actual, msg) {
    expect(actual).to.equal(true, msg);
  },
  isFalse: function(actual, msg) {
    expect(actual).to.equal(false, msg);
  },
  isNull: function(actual, msg) {
    expect(actual).to.equal(null, msg);
  },
  isNotNull: function(actual, msg) {
    expect(actual).to.not.equal(null, msg);
  },
  isUndefined: function(actual, msg) {
    expect(actual).to.equal(undefined, msg);
  },
  isNotUndefined: function(actual, msg) {
    expect(actual).to.not.equal(undefined, msg);
  },
  isNaN: function(actual, msg) {
    expect(isNaN(actual)).to.equal(true, msg);
  },
  isNotNaN: function(actual, msg) {
    expect(isNaN(actual)).to.equal(false, msg);
  },
  length: function(obj, expected_length, msg) {
    expect(obj && obj.length).to.equal(expected_length, msg);
  },
};
var Tinytest = {
  add: function(name, fn) {
    describe(name, function() {
      var wrapper = function() {
        fn(test);
      };
      it("", wrapper);
    });
  }
};
module.exports = Tinytest;
