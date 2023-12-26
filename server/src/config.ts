const config = {
  PORT: process.env.PORT ?? 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  // JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",
  HR_BASE_URL: process.env.HR_BASE_URL,
};

export default config;
