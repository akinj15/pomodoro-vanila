let workingTimer = {
  minuted: document.querySelector("#minuted-working"),
  minuteu: document.querySelector("#minuteu-working"),
  secondd: document.querySelector("#secondd-working"),
  secondu: document.querySelector("#secondu-working")
}
let breakTimer = {
  minuted: document.querySelector("#minuted-break"),
  minuteu: document.querySelector("#minuteu-break"),
  secondd: document.querySelector("#secondd-break"),
  secondu: document.querySelector("#secondu-break")
}
let workingInput = document.querySelector("#working");
let breakInput = document.querySelector("#break");
let longBreak = document.querySelector("#long-break");

let startPause = document.getElementById("player-button");
let reset = document.querySelector("#reset");
let zerar = document.querySelector("#zerar");

let pomodoroTimer = null;

startPause.addEventListener('click', () => {
  if ( !pomodoroTimer??getStatusTimer() === false ) {
    pomodoroTimer = new PomodoroTimer(
      workingInput.value,
      breakInput.value,
      longBreak.value,
      workingTimer,
      breakTimer
    );
  }
  if (pomodoroTimer.getStatusTimer()) {
    pomodoroTimer.pause()
  }
  if (!pomodoroTimer.getStatusTimer()) {
    pomodoroTimer.start()
  }
});

reset.addEventListener('click', () => {
  if ( !pomodoroTimer??getStatusTimer() === false ) {
    pomodoroTimer = new PomodoroTimer(
      workingInput.value,
      breakInput.value,
      longBreak.value,
      workingTimer,
      breakTimer
    );
  }
  pomodoroTimer.reset()

});

class PomodoroTimer {
  _timeBreak = 0;
  _timeWorking = 0;
  _breaks = 0;
  statusTimer = false;
  _timerWorking = null;
  _timerBreak = null;
  
  constructor (timeWorking, timeBreak, longBreak, timerWorking, timerBreak) {
    this.timeWorking = timeWorking * 60;
    this.timeBreak = longBreak ? timeBreak * 120 : timeBreak * 60;
    this._timeWorking = this.timeWorking;
    this._timeBreak = this.timeBreak;
    this._timerWorking = timerWorking;
    this._timerBreak = timerBreak;
    this.reset()
  }

  start () {
    setInterval(() => {
      this._count();
      console.log('ata');
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
    if (this._breaks < 4) {
      this.statusTimer = false;
      if (this._timeWorking > 0){
        this._timeWorking = this._timeWorking --;
      }
      if (this._timeBreak > 0 && this._timeWorking == 0) {
        this._timeBreak = this._timeBreak --;
      }
      if (this._timeBreak == 0 && this._timeWorking == 0) {
        this._tocaSino();
      }
      this._atribueValore();
    }else {
      this.pause();
    }
  }

  getStatusTimer () {
    return this.statusTimer;
  }

  _tocaSino () { }

  _atribueValore () {
    this._timerWorking.minuted.innerHTML = Math.floor(Math.floor(this._timeWorking / 60) / 10);
    this._timerWorking.minuteu.innerHTML = Math.floor(Math.floor(this._timeWorking / 60) % 10); 
    this._timerWorking.secondd.innerHTML = Math.floor(this._timeWorking % 60 ) / 10;
    this._timerWorking.secondu.innerHTML = Math.floor(this._timeWorking % 60 ) % 10;

    this._timerBreak.minuted.innerHTML = Math.floor(Math.floor(this._timeBreak / 60) / 10);
    this._timerBreak.minuteu.innerHTML = Math.floor(Math.floor(this._timeBreak / 60) % 10);
    this._timerBreak.secondd.innerHTML = Math.floor(this._timeBreak % 60) / 10;
    this._timerBreak.secondu.innerHTML = Math.floor(this._timeBreak % 60) % 60;
  }
}

