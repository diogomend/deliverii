export interface Payload {
    id: String,
    email: string;
    isManager: boolean;
    iat?: number;
    expiresIn?: string;
  }