import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";

const SubscribedToUser = new GraphQLObjectType({
  name: 'subscribedToUser',
  fields: {
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
});
export default SubscribedToUser;
