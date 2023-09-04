"use strict";

const { outdent } = require("outdent");

const { RuleTester } = require("eslint");
const rule = require("./prefer-node-prefix");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" },
});
const errors = [{ messageId: "preferNodeProtocol" }];

ruleTester.run("prefer-node-prefix", rule, {
  valid: [
    {
      code: "import fs from './fs'",
      errors,
    },
    {
      code: 'import fs from "unknown-builtin-module";',
      errors,
    },
    {
      code: 'import fs from "node:fs";',
      errors,
    },
    {
      code: 'export {default as promises} from "node:fs";',
      errors,
    },
    {
      code: 'import "node:buffer";',
      errors,
    },
    {
      code: 'const fs = require("node:fs");',
      errors,
    },
    {
      code: 'const fs = Require123("fs");',
      errors,
    },
  ],
  invalid: [
    {
      code: 'import fs from "fs"',
      output: 'import fs from "node:fs"',
      errors: [
        {
          message: 'Prefer use "node:" prefix for importing built-in Node.js module "fs".',
        },
      ],
    },
    {
      code: 'import fs from "fs/promises";',
      output: 'import fs from "node:fs/promises";',
      errors: [
        {
          message: 'Prefer use "node:" prefix for importing built-in Node.js module "fs/promises".',
        },
      ],
    },
    {
      code: 'import {promises} from "fs";',
      output: 'import {promises} from "node:fs";',
      errors: [
        {
          message: 'Prefer use "node:" prefix for importing built-in Node.js module "fs".',
        },
      ],
    },
    {
      code: 'export {default as promises} from "fs";',
      output: 'export {default as promises} from "node:fs";',
      errors: [
        {
          message: 'Prefer use "node:" prefix for importing built-in Node.js module "fs".',
        },
      ],
    },
    {
      code: 'import "buffer";',
      output: 'import "node:buffer";',
      errors: [
        {
          message: 'Prefer use "node:" prefix for importing built-in Node.js module "buffer".',
        },
      ],
    },
  ],
});

console.log("All tests passed!");
