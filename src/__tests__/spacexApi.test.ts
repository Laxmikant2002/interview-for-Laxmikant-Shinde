import { spacexApi, formatLaunchData, getDateRange } from '../services/spacexApi';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SpaceX API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLaunches', () => {
    test('fetches launches successfully', async () => {
      const mockResponse = {
        data: {
          docs: [
            {
              id: '1',
              flight_number: 1,
              name: 'Test Mission',
              date_utc: '2023-01-01T12:00:00.000Z',
              rocket: 'rocket1',
              success: true,
              upcoming: false,
              details: 'Test details'
            }
          ],
          totalDocs: 1,
          limit: 50,
          totalPages: 1,
          page: 1
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await spacexApi.getLaunches(50, 0);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.spacexdata.com/v5/launches/query',
        {
          options: {
            limit: 50,
            offset: 0,
            sort: { date_utc: 'desc' }
          }
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    test('handles API errors', async () => {
      const errorMessage = 'API Error';
      mockedAxios.post.mockRejectedValue(new Error(errorMessage));

      await expect(spacexApi.getLaunches()).rejects.toThrow(errorMessage);
    });
  });

  describe('formatLaunchData', () => {
    test('formats launch data correctly', () => {
      const launches = [
        {
          id: '1',
          flight_number: 1,
          name: 'Test Mission',
          date_utc: '2023-01-01T12:00:00.000Z',
          rocket: 'rocket1',
          launchpad: 'pad1',
          success: true,
          upcoming: false,
          details: 'Test details',
          links: {},
          cores: [],
          payloads: []
        }
      ];

      const rockets = [
        { id: 'rocket1', name: 'Falcon 9' }
      ];

      const launchpads = [
        { id: 'pad1', name: 'KSC LC-39A' }
      ];

      const result = formatLaunchData(launches as any, rockets as any, launchpads as any);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '1',
        number: 1,
        mission: 'Test Mission',
        rocket: 'Falcon 9',
        launchpad: 'KSC LC-39A',
        success: true,
        upcoming: false
      });
    });
  });

  describe('getDateRange', () => {
    test('returns correct date range for Past 6 Months', () => {
      const result = getDateRange('Past 6 Months');
      
      expect(result).toBeTruthy();
      expect(result?.startDate).toBeTruthy();
      expect(result?.endDate).toBeTruthy();
    });

    test('returns null for All Launches', () => {
      const result = getDateRange('All Launches');
      
      expect(result).toBeNull();
    });

    test('returns null for unknown range', () => {
      const result = getDateRange('Unknown Range');
      
      expect(result).toBeNull();
    });
  });
});
