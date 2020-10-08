const mystr: string = 'hello jordan';
console.log(mystr);

function myfun() {
    console.log("Hello World");
};

enum Day {
    Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
};

class Alarm {
    hour: number;
    minute: number;
    enabled: boolean;
    repeat: boolean;
    repeatDays: Day[];
    alarmSong: string;
    vibrate: boolean;
    tag: string;
}

function setupTestData() {
    let alarms: Alarm[];
    alarms.push(new Alarm);
    alarms.push(new Alarm);

    alarms[0].hour = 6;
    alarms[0].minute = 15;
    alarms[0].enabled = true;
    alarms[0].repeat = true;
    alarms[0].repeatDays = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday];
    alarms[0].alarmSong = 'The Morning Breaks';
    alarms[0].vibrate = true;
    alarms[0].tag = 'Wake up';

    alarms[1].hour = 22;
    alarms[1].minute = 0;
    alarms[1].enabled = true;
    alarms[1].repeat = false;
    alarms[1].repeatDays = [Day.Sunday]
    alarms[1].alarmSong = null;
    alarms[1].vibrate = true
    alarms[1].tag = 'Go to sleep';
}
