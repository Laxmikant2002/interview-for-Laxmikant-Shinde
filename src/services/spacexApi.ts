import axios from 'axios';
import { 
  SpaceXLaunch, 
  Rocket, 
  Launchpad, 
  LaunchData, 
  ApiResponse, 
  LaunchQuery,
  DateRange 
} from '../types';

const BASE_URL = 'https://api.spacexdata.com/v5';

export const spacexApi = {
  // Get all launches with optional query parameters
  getLaunches: async (limit: number = 50, offset: number = 0): Promise<ApiResponse<SpaceXLaunch>> => {
    try {
      const response = await axios.post<ApiResponse<SpaceXLaunch>>(`${BASE_URL}/launches/query`, {
        options: {
          limit,
          offset,
          sort: { date_utc: 'desc' }
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching launches:', error);
      throw error;
    }
  },

  // Get launches with date filter
  getLaunchesWithDateFilter: async (
    startDate: string, 
    endDate: string, 
    limit: number = 50, 
    offset: number = 0
  ): Promise<ApiResponse<SpaceXLaunch>> => {
    try {
      const query: any = {};
      if (startDate && endDate) {
        query.date_utc = {
          $gte: startDate,
          $lte: endDate
        };
      }

      const response = await axios.post<ApiResponse<SpaceXLaunch>>(`${BASE_URL}/launches/query`, {
        query,
        options: {
          limit,
          offset,
          sort: { date_utc: 'desc' }
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered launches:', error);
      throw error;
    }
  },

  // Get launch by ID
  getLaunchById: async (id: string): Promise<SpaceXLaunch> => {
    try {
      const response = await axios.get<SpaceXLaunch>(`${BASE_URL}/launches/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching launch details:', error);
      throw error;
    }
  },

  // Get rockets data
  getRockets: async (): Promise<Rocket[]> => {
    try {
      const response = await axios.get<Rocket[]>(`${BASE_URL}/rockets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rockets:', error);
      throw error;
    }
  },

  // Get launchpads data
  getLaunchpads: async (): Promise<Launchpad[]> => {
    try {
      const response = await axios.get<Launchpad[]>(`${BASE_URL}/launchpads`);
      return response.data;
    } catch (error) {
      console.error('Error fetching launchpads:', error);
      throw error;
    }
  }
};

// Helper functions for data processing
export const formatLaunchData = (
  launches: SpaceXLaunch[], 
  rockets: Rocket[] = [], 
  launchpads: Launchpad[] = []
): LaunchData[] => {
  return launches.map((launch, index) => ({
    id: launch.id,
    number: launch.flight_number || index + 1,
    date: launch.date_utc,
    mission: launch.name,
    rocket: rockets.find(r => r.id === launch.rocket)?.name || 'Unknown',
    launchpad: launchpads.find(lp => lp.id === launch.launchpad)?.name || 'Unknown',
    success: launch.success ?? null,
    upcoming: launch.upcoming,
    details: launch.details || null,
    links: launch.links,
    cores: launch.cores,
    payloads: launch.payloads
  }));
};

export const getDateRange = (range: string): DateRange | null => {
  const now = new Date();
  const endDate = now.toISOString();
  let startDate: string;

  switch (range) {
    case 'Past 6 Months':
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      startDate = sixMonthsAgo.toISOString();
      break;
    case 'Past Year':
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      startDate = oneYearAgo.toISOString();
      break;
    case 'Past 3 Years':
      const threeYearsAgo = new Date(now);
      threeYearsAgo.setFullYear(now.getFullYear() - 3);
      startDate = threeYearsAgo.toISOString();
      break;
    default:
      return null;
  }

  return { startDate, endDate };
};
