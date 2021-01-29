var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.insert("testing", { test: "test" });
  return null;
};

exports.down = async function(db) {
  await db.dropCollection("testing");
  return null;
};

exports._meta = {
  version: 1
};
