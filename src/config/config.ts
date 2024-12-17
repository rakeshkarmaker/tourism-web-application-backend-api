
//v1.4.2- Added security and guard

export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '120s',
  },
  database: {
    connectionString: process.env.Postgredsql,
  },
});
