"use strict";

const { name, version } = require("../package.json");

const preferNodePrefix = require("./prefer-node-prefix");
const plugin = {
  meta: {
    name,
    version,
  },
  rules: { "prefer-node-prefix": preferNodePrefix },
};
module.exports = plugin;
