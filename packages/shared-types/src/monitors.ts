export interface CreateMonitor {
  userId: string;
  icon: string;
  label: string;
  serviceUrl: string;
  isApi: boolean;
  endpoints?: string[];
}

export interface GetMonitors {
  userId: string;
}

export interface SelectMonitor {
  userId: string;
  slug: string;
}
