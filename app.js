// Creation of our timer object 
var Timer = function(mins) {
    var timer = Math.round(mins * 60 * 1000);
    var startTime = 0;
    var timeElapsed = 0;
    // Returns the current time of the function
    this.now = function() {
      return (new Date()).getTime();
    };
    // Start time is equal to the time Elasped - the current time
    this.start = function() {
      startTime = timeElapsed ? this.now() - timeElapsed : this.now();
    };
    // Remaining time is equal to the startTime - the timer - the time elasped
    this.timeRemaining = function() {
      var remTime = startTime ? timer - (this.now() - startTime) : timer;
      return remTime;
    };
  };
  // Variables that have our duration and x timer
  var duration = 60;
  var x = new Timer(duration);
  var $time;
  var clockTimeout;
  // Calls in order to update our timer
  function update() {
    var minutes, seconds, millisecs;
    var remTime = x.timeRemaining();
    var remTimeArr = formatTime(remTime);
    // If their is still time remaining we save time variables in string array 
    if (remTime > 0) {
      minutes = remTimeArr[0];
      seconds = remTimeArr[1];
      millisecs = remTimeArr[2];
    } 

    // When time runs out, reset all values and clear interval
    else {
      minutes = 0;
      seconds = 0;
      millisecs = 0;
      clearInterval(clockTimeout);
      clockTimeout = false;
    
    }
    // Used to update each charqacter pad number, used to see time update 
    $time.innerHTML = padNums(minutes, 2) + ":" + padNums(seconds, 2); // + ':' + padNums(millisecs, 3);
  }
  
  function padNums(num, spaces) {
    // Returns specific pad number of time interval that we will use later 
    num = "" + num;
    return ("0000" + num).substring(4 + num.length - spaces);
  }
  
  function formatTime(remTime) {
    // Used to format time appropriately
    var minutes = Math.floor(remTime / 60000);
    var seconds = Math.floor(remTime % 60000 / 1000);
    var millisecs = Math.floor(remTime % 60000 % 1000);
    return [minutes, seconds, millisecs];
  }
  
  function start() {
    // Gets called with an onClick event, starts and updates by 1
    if (!clockTimeout) {
      x.start();
      clockTimeout = setInterval(update, 1);
    }
  }

  function setup() {
    //Gathers all elements by id to be used
    $time = document.getElementById('timer');
    $dur = document.getElementById('duration');
    $status = document.getElementById('timer-status');
    $dur.innerHTML = duration;
    update();
  }  

