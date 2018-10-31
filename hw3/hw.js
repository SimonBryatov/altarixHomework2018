function Clock() {
    this.date = new Date();
}

Clock.prototype.start = function () {
    setInterval(() => {
        this.date = new Date();
    }, 1000);
}

// () => {} перенимает this из внешнего scope автоматом и навсегда  
//   Либо так:

//   Clock.prototype.start = function() {
//     setInterval(function() {
//       this.date = new Date();
//     }.bind(this), 1000);
//   }

Clock.prototype.getTime = function () {
    return this.date.toLocaleTimeString();
}

const myClock = new Clock();

myClock.start();
console.log("Clock getTime(): ", myClock.getTime());

setTimeout(function () {
    console.log("Clock getTime(): ", myClock.getTime());
}, 1000);


function AlarmClock() {
    Clock.apply(this, arguments);
}

AlarmClock.prototype = Object.create(Clock.prototype);
AlarmClock.prototype.constructor = AlarmClock;

AlarmClock.prototype.setAlarmTime = (alarmTime) => {
    this.alarmTime = alarmTime;
    console.log("Alarm is set to " + alarmTime);
}

AlarmClock.prototype.start = () => {
    Clock.prototype.start.apply(this);
    setInterval(() => {
        if (this.alarmTime === this.date.toLocaleTimeString()) alert("ALARM!!!");
    }, 1000)

}

let myAlarmClock = new AlarmClock();

myAlarmClock.setAlarmTime(new Date(Date.now() + 5000).toLocaleTimeString());
myAlarmClock.start();