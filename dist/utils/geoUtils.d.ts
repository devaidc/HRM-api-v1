import { Location, ProximityResult } from '../types';
/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in meters
 */
export declare const calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
/**
 * Check if a point is within proximity threshold of a location
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param location Location to check against
 * @returns ProximityResult with distance and threshold check
 */
export declare const checkProximity: (userLat: number, userLon: number, location: Location) => ProximityResult;
/**
 * Find the nearest location within proximity threshold
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param locations Array of locations to check
 * @returns Nearest location within threshold, or null if none found
 */
export declare const findNearestLocation: (userLat: number, userLon: number, locations: Location[]) => ProximityResult | null;
/**
 * Validate coordinates
 * @param latitude Latitude to validate
 * @param longitude Longitude to validate
 * @returns true if coordinates are valid
 */
export declare const validateCoordinates: (latitude: number, longitude: number) => boolean;
//# sourceMappingURL=geoUtils.d.ts.map