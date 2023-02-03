export const MINUTE = 60;
export const HOUR = MINUTE*60;
export const DAY = HOUR*24;
export const WEEK = DAY*7;
export const MONTH = DAY*31;
export const YEAR = MONTH*12;


export var TIMEDICT = {
    "MINUTE": MINUTE,
    "HOUR": HOUR,
    "DAY": [DAY, '5m'],
    "WEEK": [WEEK, '15m'],
    "MONTH": [MONTH, '1h'],
    "YEAR": [YEAR, '1d'],
    "5 YEARS": [YEAR*5, '1w']
};