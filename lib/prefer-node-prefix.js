"use strict";

const { builtinModules } = require("module");

/**
 * @type {import("eslint").Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer using the `node:` protocol when importing Node.js builtin modules.",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [{}],
    messages: {
      preferNodeProtocol: "Should add 'node:' to module name",
    },
  },
  create: (context) => ({
    ImportDeclaration(node) {
      const { source } = node;

      if (source?.type === "Literal" && typeof source.value === "string") {
        const moduleName = source.value;

        if (builtinModules.includes(moduleName) && !/node:/.test(moduleName)) {
          context.report({
            node: source,
            message: `Prefer use "node:" prefix for importing built-in Node.js module "${moduleName}".`,
            fix: (fixer) => fixer.replaceText(source, `"node:${moduleName}"`),
          });
        }
      }
    },
    ExportNamedDeclaration(node) {
      const { source } = node;

      if (source?.type === "Literal" && typeof source.value === "string") {
        const moduleName = source.value;

        if (builtinModules.includes(moduleName) && !/node:/.test(moduleName)) {
          context.report({
            node: source,
            message: `Prefer use "node:" prefix for importing built-in Node.js module "${moduleName}".`,
            fix: (fixer) => fixer.replaceText(source, `"node:${moduleName}"`),
          });
        }
      }
    },
    VariableDeclaration(node) {
      const { declarations } = node;
      const require = declarations[0].init;
      if (require.callee.name === "require") {
        const moduleName = require.arguments[0].value;

        if (builtinModules.includes(moduleName) && !/node:/.test(moduleName)) {
          context.report({
            node: source,
            message: `Prefer use "node:" prefix for importing built-in Node.js module "${moduleName}".`,
            fix: (fixer) => fixer.replaceText(source, `"node:${moduleName}"`),
          });
        }
      }
    },
  }),
};
