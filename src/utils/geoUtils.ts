import { Location, ProximityResult } from '../types';

/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in meters
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Check if a point is within proximity threshold of a location
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param location Location to check against
 * @returns ProximityResult with distance and threshold check
 */
export const checkProximity = (
  userLat: number,
  userLon: number,
  location: Location
): ProximityResult => {
  const distance = calculateDistance(
    userLat,
    userLon,
    location.latitude,
    location.longitude
  );

  return {
    location,
    distance,
    isWithinThreshold: distance <= location.proximityThreshold
  };
};

/**
 * Find the nearest location within proximity threshold
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param locations Array of locations to check
 * @returns Nearest location within threshold, or null if none found
 */
export const findNearestLocation = (
  userLat: number,
  userLon: number,
  locations: Location[]
): ProximityResult | null => {
  const activeLocations = locations.filter(location => location.isActive);
  
  if (activeLocations.length === 0) {
    return null;
  }

  const proximityResults = activeLocations.map(location =>
    checkProximity(userLat, userLon, location)
  );

  // Find the nearest location within threshold
  const withinThreshold = proximityResults.filter(result => result.isWithinThreshold);
  
  if (withinThreshold.length === 0) {
    return null;
  }

  // Return the nearest one
  return withinThreshold.reduce((nearest, current) =>
    current.distance < nearest.distance ? current : nearest
  );
};

/**
 * Find the nearest location regardless of proximity threshold
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param locations Array of locations to check
 * @returns Nearest location with distance and threshold check, or null if no locations
 */
export const findNearestLocationAny = (
  userLat: number,
  userLon: number,
  locations: Location[]
): ProximityResult | null => {
  const activeLocations = locations.filter(location => location.isActive);
  
  if (activeLocations.length === 0) {
    return null;
  }

  const proximityResults = activeLocations.map(location =>
    checkProximity(userLat, userLon, location)
  );

  // Return the nearest one regardless of threshold
  return proximityResults.reduce((nearest, current) =>
    current.distance < nearest.distance ? current : nearest
  );
};

/**
 * Validate coordinates
 * @param latitude Latitude to validate
 * @param longitude Longitude to validate
 * @returns true if coordinates are valid
 */
export const validateCoordinates = (latitude: number, longitude: number): boolean => {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Check if current time is within office hours
 * @param officeHoursStart Start time in "HH:MM" format (e.g., "08:00")
 * @param officeHoursEnd End time in "HH:MM" format (e.g., "16:00")
 * @returns true if current time is within office hours
 */
export const isWithinOfficeHours = (officeHoursStart?: string, officeHoursEnd?: string): boolean => {
  if (!officeHoursStart || !officeHoursEnd) {
    return true; // If no office hours set, always allow
  }

  // Get current time in UTC+7
  const now = new Date();
  const utcPlus7 = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  const currentTime = utcPlus7.toTimeString().slice(0, 5); // Get "HH:MM" format

  return currentTime >= officeHoursStart && currentTime <= officeHoursEnd;
};

/**
 * Get current time in UTC+7 as "HH:MM" format
 * @returns Current time in "HH:MM" format
 */
export const getCurrentTimeUTC7 = (): string => {
  const now = new Date();
  const utcPlus7 = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  return utcPlus7.toTimeString().slice(0, 5);
}; 