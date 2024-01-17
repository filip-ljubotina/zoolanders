const STATION_KEY = 'stationName';

const StationService = {
    getStation: () => localStorage.getItem(STATION_KEY),
    setStation: (stationName) => localStorage.setItem(STATION_KEY, stationName),
    removeStation: () => localStorage.removeItem(STATION_KEY),
};

export default StationService;