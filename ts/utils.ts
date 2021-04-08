export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatTwoDigits(number: number) {
    let numberString = number.toString();
    if (numberString.length === 1) {
        return `0${numberString}`
    }
    else return numberString
}

export function millisToHourMinSecString(millis: number) {
    let times = millisToHourMinSec(millis);
    let hour = times[0];
    let minute = times[1];
    let second = times[2];
    let hourString = (hour > 0 ? hour.toString() + ':' : '');
    let minuteString = (minute > 0 ? minute.toString() + ':' : '');
    let secondString = (minute > 0 ? formatTwoDigits(second): second.toString());
    return `${hourString}${minuteString}${secondString}`
}

export function millisToHourMinSec(millis: number) {
    let hour = Math.floor(millis / 3.6e+6);
    let minute = Math.floor(millis / 60000) % 60;
    let second = Math.floor(millis / 1000) % 60;
    return [hour, minute, second];
}