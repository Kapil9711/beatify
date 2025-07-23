const pathVariable = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "production",
  MONGO_URL: process.env.MONGO_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "3533434343fddfdgdsgdsgs",
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || "30d",
  BASE_API_JIO: process.env.BASE_API_JIO || "",
};

export default pathVariable;
