"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoordinates = exports.findNearestLocation = exports.checkProximity = exports.calculateDistance = void 0;
/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in meters
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.calculateDistance = calculateDistance;
/**
 * Check if a point is within proximity threshold of a location
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param location Location to check against
 * @returns ProximityResult with distance and threshold check
 */
const checkProximity = (userLat, userLon, location) => {
    const distance = (0, exports.calculateDistance)(userLat, userLon, location.latitude, location.longitude);
    return {
        location,
        distance,
        isWithinThreshold: distance <= location.proximityThreshold
    };
};
exports.checkProximity = checkProximity;
/**
 * Find the nearest location within proximity threshold
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param locations Array of locations to check
 * @returns Nearest location within threshold, or null if none found
 */
const findNearestLocation = (userLat, userLon, locations) => {
    const activeLocations = locations.filter(location => location.isActive);
    if (activeLocations.length === 0) {
        return null;
    }
    const proximityResults = activeLocations.map(location => (0, exports.checkProximity)(userLat, userLon, location));
    // Find the nearest location within threshold
    const withinThreshold = proximityResults.filter(result => result.isWithinThreshold);
    if (withinThreshold.length === 0) {
        return null;
    }
    // Return the nearest one
    return withinThreshold.reduce((nearest, current) => current.distance < nearest.distance ? current : nearest);
};
exports.findNearestLocation = findNearestLocation;
/**
 * Validate coordinates
 * @param latitude Latitude to validate
 * @param longitude Longitude to validate
 * @returns true if coordinates are valid
 */
const validateCoordinates = (latitude, longitude) => {
    return (latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180);
};
exports.validateCoordinates = validateCoordinates;
//# sourceMappingURL=geoUtils.js.map