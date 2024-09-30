export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    message: string;
    first_name: string;
    last_name: string;
  }