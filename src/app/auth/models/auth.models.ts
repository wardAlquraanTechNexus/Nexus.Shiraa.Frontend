export interface RegistrationRequest {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email: string;
  userName?: string;
  password: string;
}

export interface RegistrationResponse {
  userId: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  userName: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}
