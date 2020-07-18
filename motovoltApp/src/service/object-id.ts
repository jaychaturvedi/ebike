const objectid = require("react-native-bson/lib/bson/objectid");

export default (): string => new objectid().toHexString();