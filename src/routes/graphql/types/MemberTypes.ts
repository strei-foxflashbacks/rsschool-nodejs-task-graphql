import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";
import MemberTypeId from "./memberTypeId.js";

const MemberTypes = new GraphQLObjectType({
  name: 'MemberTypes',
  fields: {
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }
});
export default MemberTypes;
