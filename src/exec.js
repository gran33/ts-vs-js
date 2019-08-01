const cp = require('child_process');
const _ = require('lodash');

module.exports = {
  exec
};

function exec(command) {
  const normalized = normalizeSpace(command);
  // console.log(normalized);
  return cp.execSync(normalized);
}

const WHITESPACE_REGEX = /\s+/g;

function normalizeSpace(str) {
  if (!_.isString(str)) {
    return undefined;
  }
  return _.replace(_.trim(str), WHITESPACE_REGEX, ' ');
}
