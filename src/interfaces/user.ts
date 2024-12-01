export interface UserSignupInput {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}
export interface UserLoginInput {
  email: string;
  password: string;
}
