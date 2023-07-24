import { GraphQLList } from "graphql";
import User from "./User.js";

const UsersList = new GraphQLList(User);
export default UsersList;
