import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import RootQueryType from './types/RootQueryType.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const schema = new GraphQLSchema({
        query: RootQueryType,
      })
      // req.body
      // then take variables and place in graphpql fn
      // pass schema, souce and optional shit
      return await graphql({
        schema: schema,
        source: query.toString(),
        contextValue: fastify,
        variableValues: variables,
      });
    },
  });
};

export default plugin;
