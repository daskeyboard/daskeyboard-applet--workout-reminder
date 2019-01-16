const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger
const moment = require('moment');


const listofexercices = ['Pushups', 'Squats', 'Front Lunges', 'Spider Crowl', 'High Knees', 'Montain Climber', 'Plank', 'Plank Jacks', 'Jumping Jacks', 'Chair', 'Crunches', 'Legs Drop'];

//random function 
function random_items(listofexercices) {
  return listofexercices[Math.floor(Math.random() * listofexercices.length)];
}


class WorkOut extends q.DesktopApp {


  constructor() {
    super();
    this.pollingInterval = 1000;
    this.LastHourofNotification = '';
    logger.info("PushUpReminder, WorkOut Reminder ready to go!");
  }

  async applyConfig() {
    this.chosenExercice = [];
    Object.keys(this.config).forEach(key => {
      if (listofexercices.includes(key) && this.config[key] === true) {
        this.chosenExercice.push(key);
      }
    });
    logger.info("Exercises have been choosen by the user", this.chosenExercice);
  }

 getCurrentHour() {
    return moment().hour();
  }
  
  getCurrentMinute() {
    return moment().minute();
  }
  
  async run() {

    const userChoosenValue = this.config.userChoosenValue;
    const random = "random";
    const minuteAfterTheHour = this.config.minuteAfterTheHour;
    // console.log('')
    var integer = parseInt(minuteAfterTheHour, 10);

    //current time
    const currentHour = this.getCurrentHour();
    const currentMinute = this.getCurrentMinute();

    if ((currentMinute >= integer) && (this.LastHourofNotification != currentHour)) {

      if (userChoosenValue == random) {
        var FunctionResult = random_items(this.chosenExercice);
      } else {
        var FunctionResult = this.chosenExercice.join(", ");
      }

      this.LastHourofNotification = currentHour;

      logger.info("Workout Reminder, time to Workout.");
      const color = '#19FF00'; //green color

      return new q.Signal({
        points: [
          [new q.Point(color, q.Effects.BLINK)]
        ],
        name: 'Workout Reminder',
        message: FunctionResult

      });

    }
  }

}


module.exports = {
  WorkOut: WorkOut,
  random_items: random_items
}

const applet = new WorkOut();
