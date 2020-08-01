module.exports = ({ types: t }) => ({
  visitor: {
    CallExpression(path) {
      const callee = path.node.callee;
      if (callee.type !== 'MemberExpression') {
        return;
      }

      if (!t.isIdentifier(callee.object, { name: 'Object' })) {
        return;
      }

      if (!t.isIdentifier(callee.property, { name: 'defineProperty' })) {
        return;
      }

      if (path.node.arguments.length !== 3) {
        return;
      }

      const [updating, property, configuration] = path.node.arguments;
      if (!t.isIdentifier(updating, { name: 'exports' })) {
        return;
      }

      if (!t.isStringLiteral(property)) {
        return;
      }

      if (!t.isObjectExpression(configuration)) {
        return;
      }

      if (2 !== configuration.properties.length) {
        return;
      }

      const [enumerable, getter] = configuration.properties;

      if (!t.isIdentifier(enumerable.key, { name: 'enumerable' })) {
        return;
      }

      if (!t.isIdentifier(getter.key, { name: 'get' })) {
        return;
      }

      if (!t.isFunctionExpression(getter.value)) {
        return;
      }

      if (!t.isBlockStatement(getter.value.body)) {
        return;
      }

      const body = getter.value.body.body;
      if (1 !== body.length) {
        return;
      }

      const ret = body[0];

      if (!t.isReturnStatement(ret)) {
        return;
      }

      path.replaceWith(
        t.assignmentExpression(
          '=',
          t.memberExpression(updating, property, true),
          ret.argument,
        ),
      );
    },
  },
});
