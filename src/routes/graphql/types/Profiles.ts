/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import MemberTypeId from "./MemberTypeId.js";
import MemberTypes from "./MemberTypes.js";
import { FastifyInstance } from "fastify";

const Profiles = new GraphQLObjectType({
  name: 'Profiles',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberTypes,
      resolve: async (obj, _, ctx: FastifyInstance) => {
        const isMember = await ctx.prisma.memberType.findUnique({
          where: {
            id: obj.memberTypeId as string
          }
        });
        if (!isMember) {
          throw ctx.httpErrors.notFound();
        } else {
          return isMember;
        }
      }
    }
  }
});
export default Profiles;
