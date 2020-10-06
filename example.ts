const mystr: string = 'hello jordan';
console.log(mystr);

function myfun() {
    console.log("Hello World");
};

enum App{
    alarm, timer, clock, stopwatch
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


function openApp(app: App) {
    for (let i in App) {
        if (!isNaN(parseInt(i))) {
            document.getElementById(App[i] + '-body').style.display = 'none';
            document.getElementById(App[i] + '-button').classList.remove('active');
        }
    }
    document.getElementById(App[app] + '-body').style.display = 'block';
    document.getElementById(App[app] + '-button').classList.add('active')
}

function appSetup() {
    let alarmbutton = document.getElementById('alarm-button');
    let timerbutton = document.getElementById('timer-button');
    let clockbutton = document.getElementById('clock-button');
    let stopwatchbutton = document.getElementById('stopwatch-button');

    alarmbutton.onclick = () => {openApp(App.alarm)};
    timerbutton.onclick = () => {openApp(App.timer)};
    clockbutton.onclick = () => {openApp(App.clock)};
    stopwatchbutton.onclick = () => {openApp(App.stopwatch)};

    for (let i in App) {
        if (!isNaN(parseInt(i))) {
            document.getElementById(App[i] + '-body').style.display = 'none';
            document.getElementById(App[i] + '-button').classList.remove('active');
        }
    }
    document.getElementById('alarm-body').style.display = 'block';
    document.getElementById('clock-button').classList.add('active')
}

appSetup();