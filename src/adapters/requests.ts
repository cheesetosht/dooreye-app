import {fetcher} from './index';
import {
  AuthVerifyOTPResponse,
  IdentifierInput,
  AuthUserResponse,
  AuthRequestOTPResponse,
} from './types';

export const Auth = {
  requestOTP: (identifier: IdentifierInput) =>
    fetcher.post<AuthRequestOTPResponse>('/auth/request-otp', identifier),
  verifyOTP: (identifier: IdentifierInput, otp: string) =>
    fetcher.post<AuthVerifyOTPResponse>('/auth/verify-otp', {
      ...identifier,
      otp,
    }),
  verifyResident: () => fetcher.get<AuthUserResponse>('/auth/resident'),
};
