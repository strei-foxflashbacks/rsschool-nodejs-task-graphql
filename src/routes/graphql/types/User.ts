/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import Profiles from "./Profiles.js";
import { FastifyInstance } from "fastify";
import Posts from "./Posts.js";
import UsersList from "./UsersList.js";

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: Profiles,
      resolve: async (obj, _, ctx: FastifyInstance) => {
        const isProfile = ctx.prisma.profile.findUnique({
          where: {
            userId: obj.id as string
          },
        });
        if (await isProfile) {
          return isProfile;
        } else {
          return null;
        }
      },
    },
    posts: {
      type: new GraphQLList(Posts),
      resolve: async (obj, _, ctx: FastifyInstance) => {
        return await ctx.prisma.post.findMany({
          where: {
            authorId: obj.id as string,
          },
        });
      },
    },
    subscribedToUser: {
      type: UsersList,
      resolve: async (obj, _, ctx: FastifyInstance) => {
        return await ctx.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: obj.id as string
              },
            },
          },
        });
      },
    },
    userSubscribedTo: {
      type: UsersList,
      resolve: async (obj, _, ctx: FastifyInstance) => {
        return await ctx.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: obj.id as string
              },
            },
          },
        });
      },
    },
  }
});
export default User;
