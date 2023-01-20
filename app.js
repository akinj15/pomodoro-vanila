let workingTimer = querySelector(".pomodoro-timer-working");
let breakTimer = querySelector(".pomodoro-timer-working");
let workingInput = querySelector("#working");
let breakInput = querySelector("#break");
let longBreak = querySelector("#long-break");

let startPause = querySelector("#start-pause");
let reset = querySelector("#reset");
let zerar = querySelector("#zerar");

let pomodoroTimer = null;

startPause.addEventListener('click', () => {
  if (pomodoroTimer === null) {
    pomodoroTimer = new PomodoroTimer(workingInput.value, breakInput.value, longBreak.value);
  }
  if (pomodoroTimer.getStatusTimer()) {
    pomodoroTimer.pause()
  }
  if (!pomodoroTimer.getStatusTimer()) {
    pomodoroTimer.start()
  }
});

reset.addEventListener('click', () => pomodoroTimer.reset());

class PomodoroTimer {
  _timeBreak = 0;
  _timeWorking = 0;
  _breaks = 0;
  constructor (timeWorking, timeBreak, longBreak) {
    this.timeWorking = timeWorking * 60;
    this.timeBreak = longBreak ? timeBreak * 120 : timeBreak * 60;
    this.start()
  }
  start () {
    setinterval(() => {
      this._count();
    }, 1000);
    this.statusTimer = true;
  }
  reset () {
    this.breaks = 0;
    this._timeWorking = this.timeWorking;
    this._timeBreak = this.timeBreak;
  }
  pause () {
    this.statusTimer = false;
    return;  
  }
  _count () {
    if (breaks < 4) {
      if (this._timeWorking > 0){
        this._timeWorking = this._timeWorking --;
      }
      if (this._timeBreak > 0 && this._timeWorking == 0) {
        this._timeBreak = this._timeBreak --;
      }
      if (this._timeBreak == 0 && this._timeWorking == 0) {
        this._tocaSino();
      }
    }else {
      this.pause();
    }
  }
  getStatusTimer () {
    return this.statusTimer;
  }
}



