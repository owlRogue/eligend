var SimpleSchema = require("./simple-schema");
var Match = require("./meteor-match").Match;

SimpleSchema.extendOptions({
  index: Match.Optional(Match.OneOf(Number, String, Boolean)),
  unique: Match.Optional(Boolean),
  denyInsert: Match.Optional(Boolean),
  denyUpdate: Match.Optional(Boolean)
});
