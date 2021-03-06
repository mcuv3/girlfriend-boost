import axios from 'axios';
import { GenerateTokenParams, RefreshCredentialsParams } from '../types/token';
import generateAccessToken from './generateAccessToken';


export default async function generateToken({
  facebookEmailAddress,
  facebookPassword,
}:GenerateTokenParams):Promise<RefreshCredentialsParams> {
  const facebookAccessToken = await generateAccessToken({
    email: facebookEmailAddress,
    password: facebookPassword,
  });

  const response = await axios.post(
    'https://api.gotinder.com/v2/auth/login/facebook',
    {
      token: facebookAccessToken,
    },
  );

  return {
    apiToken: response.data.data.api_token,
    refreshToken: response.data.data.refresh_token,
  };
}

