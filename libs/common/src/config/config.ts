const devConfig = {
  FRONTEND_URL: 'http://localhost:3000',
  MODEL_AI_URL: 'http://localhost:3002',
};

const prodConfig = {
  FRONTEND_URL: '',
  MODEL_AI_URL: '',
};

export const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
