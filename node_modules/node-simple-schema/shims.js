var _ = require("lodash");
module.exports = {
  Meteor: require("./meteor-shim"),
  Random: {
    id: function() {
      throw new Error("not implemented");
    }
  },
  Deps: {
    autorun: function(fn) {
      fn();
    },
    Dependency: function() {
      this.changed = function() {
        return false;
      };
      this.depend = function() {};
    }
  }
};
_.extend(module.exports, require("./meteor-match"));
