import axios from 'axios';
import { RefreshCredentialsParams } from '../types/token';

export default async function refreshCredentials({ apiToken, refreshToken }:RefreshCredentialsParams):Promise<RefreshCredentialsParams | null> {
  try {
    
    const response = await axios.post(
      'https://api.gotinder.com/v2/auth',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      {
        headers: {
          'X-Auth-Token': apiToken,
        },
      },
    );
  
    return {
      apiToken: response.data.data.api_token,
      refreshToken: response.data.data.refresh_token,
    };
  } catch (error) {
      return null
  }
}