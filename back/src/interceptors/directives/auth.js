// directives/auth.js
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';

export function isAuthenticatedDirectiveTransformer(schema, directiveName = 'isAuth') {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (directive) {
        const { role } = directive; // Get the optional `role` argument
        const originalResolver = fieldConfig.resolve || ((parent, args, context, info) => info.fieldName);

        // Wrap the resolver to check authentication and role
        fieldConfig.resolve = async (parent, args, context, info) => {
          // Check authentication
          if (!context.user) {
            throw new GraphQLError('Not authenticated', {
              extensions: { code: 'UNAUTHENTICATED' },
            });
          }

          if (role && context.user.role !== role) {
            throw new GraphQLError('Insufficient permissions', {
              extensions: { code: 'FORBIDDEN' },
            });
          }

          return originalResolver(parent, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
}
