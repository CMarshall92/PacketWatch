export interface SiteLocation {
  slug: string;
  isApi: boolean;
  href: string;
  label: string;
  icon: string;
}

export interface SiteLocationResponse {
  data: SiteLocation[];
  prevSelectedSlug: string;
}
