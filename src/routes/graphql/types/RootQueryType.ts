/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLList, GraphQLObjectType } from "graphql";
import { FastifyInstance } from "fastify";
import MemberTypes from "./MemberTypes.js";
import Profiles from "./Profiles.js";
import Posts from "./Posts.js";
import UsersList from "./UsersList.js";
import MemberTypeId from "./MemberTypeId.js";
import { UUIDType } from "./uuid.js";
import User from "./User.js";

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberTypes),
      resolve: async (_, _2, ctx: FastifyInstance) => {
        await ctx.prisma.memberType.findMany();
      },
    },
    profiles: {
      type: new GraphQLList(Profiles),
      resolve: async (_, _2, ctx: FastifyInstance) => {
        await ctx.prisma.profile.findMany();
      },
    },
    posts: {
      type: new GraphQLList(Posts),
      resolve: async (_, _2, ctx: FastifyInstance) => {
        await ctx.prisma.post.findMany();
      },
    },
    users: {
      type: UsersList,
      resolve: async (_, _2, ctx: FastifyInstance) => {
        await ctx.prisma.user.findMany();
      },
    },
    memberType: {
      type: MemberTypes,
      args: { id: {
          type: MemberTypeId,
        },
      },
      resolve: async (_, args, ctx: FastifyInstance) => {
        const isMember = await ctx.prisma.memberType.findUnique({
          where: {
            id: args.id as string,
          },
        });
        if (!isMember) {
          throw ctx.httpErrors.notFound();
        } else {
          return isMember;
        }
      },
    },
    profile: {
      type: Profiles,
      args: {
        id: {
          type: UUIDType,
        }
      },
      resolve: async (_, args, ctx: FastifyInstance) => {
        const isProfile = await ctx.prisma.profile.findUnique({
          where: {
            id: args.id as string,
          },
        });
        if (isProfile) {
          return isProfile;
        } else {
          return null
        }
      },
    },
    post: {
      type: Posts,
      args: {
        id: {
          type: UUIDType,
        }
      },
      resolve: async (_, args, ctx: FastifyInstance) => {
        const isPost = await ctx.prisma.post.findUnique({
          where: {
            id: args.id as string,
          },
        });
        if (isPost) {
          return isPost;
        } else {
          return null
        }
      },
    },
    user: {
      type: User,
      args: {
        id: {
          type: UUIDType,
        }
      },
      resolve: async (_, args, ctx: FastifyInstance) => {
        const isUser = await ctx.prisma.user.findUnique({
          where: {
            id: args.id as string,
          },
        });
        if (isUser) {
          return isUser;
        } else {
          return null
        }
      },
    }
  }
});
export default RootQueryType;
