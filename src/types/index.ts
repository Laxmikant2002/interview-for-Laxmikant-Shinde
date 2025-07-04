// Launch Data Types
export interface LaunchData {
  id: string;
  number: number;
  date: string;
  mission: string;
  rocket: string;
  launchpad: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: LaunchLinks;
  cores: Core[];
  payloads: string[];
  rocketType?: string;
  manufacturer?: string;
  nationality?: string;
  payloadType?: string;
  orbit?: string;
}

export interface LaunchLinks {
  patch?: {
    small?: string;
    large?: string;
  };
  reddit?: {
    campaign?: string;
    launch?: string;
    media?: string;
    recovery?: string;
  };
  flickr?: {
    small?: string[];
    original?: string[];
  };
  presskit?: string;
  webcast?: string;
  youtube_id?: string;
  article?: string;
  wikipedia?: string;
}

export interface Core {
  core?: string;
  flight?: number;
  gridfins?: boolean;
  legs?: boolean;
  reused?: boolean;
  landing_attempt?: boolean;
  landing_success?: boolean;
  landing_type?: string;
  landpad?: string;
}

// SpaceX API Response Types
export interface SpaceXLaunch {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  static_fire_date_utc?: string;
  static_fire_date_unix?: number;
  tdb: boolean;
  net: boolean;
  window?: number;
  rocket: string;
  success?: boolean;
  failures: Failure[];
  upcoming: boolean;
  details?: string;
  fairings?: Fairings;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  cores: Core[];
  links: LaunchLinks;
  auto_update: boolean;
}

export interface Failure {
  time: number;
  altitude?: number;
  reason: string;
}

export interface Fairings {
  reused?: boolean;
  recovery_attempt?: boolean;
  recovered?: boolean;
  ships: string[];
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: Dimension;
  diameter: Dimension;
  mass: Mass;
  payload_weights: PayloadWeight[];
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engines;
  landing_legs: LandingLegs;
  flickr_images: string[];
  wikipedia: string;
  description: string;
}

export interface Dimension {
  meters: number;
  feet: number;
}

export interface Mass {
  kg: number;
  lb: number;
}

export interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface FirstStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec?: number;
}

export interface SecondStage {
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec?: number;
  thrust: Thrust;
  payloads: StagePayloads;
}

export interface Thrust {
  kN: number;
  lbf: number;
}

export interface StagePayloads {
  option_1: string;
  composite_fairing: CompositeFairing;
}

export interface CompositeFairing {
  height: Dimension;
  diameter: Dimension;
}

export interface Engines {
  number: number;
  type: string;
  version: string;
  layout?: string;
  engine_loss_max?: number;
  propellant_1: string;
  propellant_2: string;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  thrust_to_weight: number;
}

export interface LandingLegs {
  number: number;
  material?: string;
}

export interface Launchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  launches: string[];
  status: string;
  details: string;
}

// API Query Types
export interface LaunchQuery {
  query?: any;
  options?: {
    limit?: number;
    offset?: number;
    sort?: { [key: string]: 'asc' | 'desc' };
    populate?: string[];
  };
}

export interface ApiResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

// Component Props Types
export interface FilterProps {
  onFilterChange: (filter: FilterOptions) => void;
  currentFilter: FilterOptions;
}

export interface DateRange {
  startDate: Date | string;
  endDate: Date | string;
}

export interface FilterOptions {
  dateRange: string | DateRange;
  status: string;
  searchTerm: string;
}

export interface TableProps {
  launches: LaunchData[];
  onRowClick: (launch: LaunchData) => void;
  loading: boolean;
  error: string | null;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  launch: LaunchData | null;
}

export interface HeaderProps {
  title: string;
}

// Utility Types
export type LaunchStatus = 'success' | 'failed' | 'upcoming' | 'unknown';
