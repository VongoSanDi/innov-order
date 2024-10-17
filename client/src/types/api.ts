export interface ApiResponse {
  data: Record<string, any>;
  statusCode: number;
  message: string;
  timestamp: Date;
}

export interface EditProfilDto {
  username: string;
  actualPassword: string;
  newPassword: string;
}
