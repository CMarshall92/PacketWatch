export interface CreateMonitor {
  userId: string;
  serviceUrl: string;
  isApi: boolean;
  endpoints?: string[];
}
