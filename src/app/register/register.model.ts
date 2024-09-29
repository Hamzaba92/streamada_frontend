export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  }
  
  export interface RegisterResponse {
    message: string;
  }