const devConfig = {
  FRONTEND_URL: 'http://localhost:3000',
};

const prodConfig = {
  FRONTEND_URL: '',
};

export const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
