export type Response<T> = {
  success: boolean | null;
  data: T;
  error: string | null;
};

export type IdentifierInput = {email?: string; phone_number?: string};

export type UserInfo = {
  id: number;
  name: string;
  email: null;
  phone_number: string;
  residence_id: number;
  society_id: null;
  created_at: Date;
  residence_number: number;
  block: string;
  society_name: string;
  city_name: string;
};

export type AuthRequestOTPResponse = Response<{
  otp: string;
}>;

export type AuthVerifyOTPResponse = Response<{
  isValid: boolean;
  token: string;
}>;

export type AuthUserResponse = Response<{
  user_info: UserInfo;
}>;
