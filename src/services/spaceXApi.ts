import axios from 'axios';
import { LaunchData } from '../types';

const API_BASE_URL = 'https://api.spacexdata.com/v4';

export class SpaceXApiService {
  static async filterLaunches(options: {
    upcoming?: boolean;
    success?: boolean;
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    launches: LaunchData[];
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> {
    try {
      const query: any = {};
      
      if (options.upcoming !== undefined) {
        query.upcoming = options.upcoming;
      }
      
      if (options.success !== undefined) {
        query.success = options.success;
      }
      
      if (options.dateFrom || options.dateTo) {
        query.date_utc = {};
        if (options.dateFrom) {
          query.date_utc.$gte = options.dateFrom;
        }
        if (options.dateTo) {
          query.date_utc.$lte = options.dateTo;
        }
      }
      
      if (options.searchTerm) {
        query.name = { $regex: options.searchTerm, $options: 'i' };
      }

      const response = await axios.post(`${API_BASE_URL}/launches/query`, {
        query,
        options: {
          page: options.page || 1,
          limit: options.limit || 10,
          sort: { date_utc: 'desc' },
          populate: ['rocket', 'launchpad']
        }
      });

      const { docs, totalPages, page: currentPage, hasNextPage, hasPrevPage } = response.data;

      return {
        launches: docs.map(this.transformLaunchData),
        totalPages,
        currentPage,
        hasNextPage,
        hasPrevPage
      };
    } catch (error) {
      console.error('Error filtering launches:', error);
      throw new Error('Failed to filter launches from SpaceX API');
    }
  }

  private static transformLaunchData(launch: any): LaunchData {
    return {
      id: launch.id,
      number: launch.flight_number,
      date: launch.date_utc,
      mission: launch.name,
      rocket: launch.rocket?.name || 'Falcon 9',
      launchpad: launch.launchpad?.name || 'Unknown',
      success: launch.success ?? null,
      upcoming: launch.upcoming,
      details: launch.details || null,
      links: {
        patch: {
          small: launch.links?.patch?.small || undefined,
          large: launch.links?.patch?.large || undefined
        },
        webcast: launch.links?.webcast || undefined,
        article: launch.links?.article || undefined,
        wikipedia: launch.links?.wikipedia || undefined
      },
      cores: launch.cores || [],
      payloads: launch.payloads || [],
      rocketType: launch.rocket?.type || undefined,
      manufacturer: 'SpaceX',
      nationality: 'USA',
      payloadType: launch.payloads?.[0]?.type || undefined,
      orbit: launch.payloads?.[0]?.orbit || undefined
    };
  }
}