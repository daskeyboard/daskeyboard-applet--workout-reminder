const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger
const moment = require('moment');


const listofexercices = ['Pushups', 'Squats', 'Front Lunges', 'Spider Crawl', 'High Knees', 'Mountain Climber', 'Plank', 'Plank Jacks', 'Jumping Jacks', 'Chair', 'Crunches', 'Legs Drop'];

//random function 
function random_items(listofexercices) {
  return listofexercices[Math.floor(Math.random() * listofexercices.length)];
}




class WorkOut extends q.DesktopApp {

  constructor() {
    super();
    this.pollingInterval = 1000;
    this.LastHourofNotification = '';
    this.lastExerciseIndex = 0;
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

  getExercerciseCurrent(){
    return this.chosenExercice[this.lastExerciseIndex];

  }

  prepareNextExercise(){
    logger.info(`Preparing next exercice, current is ${this.chosenExercice[this.lastExerciseIndex]}`);
    if (this.lastExerciseIndex >= this.chosenExercice.length -1 ){
      this.lastExerciseIndex = 0;
    }
    else
    {   
       this.lastExerciseIndex+=1;
    }
    logger.info(`Next one will be ${this.chosenExercice[this.lastExerciseIndex]}`);
  }
  
  async run() {
    const userChoosenValue = this.config.userChoosenValue;
    const random = "random";
    const minuteAfterTheHour = this.config.minuteAfterTheHour;
    var integer = parseInt(minuteAfterTheHour, 10);

    //current time
    const currentHour = this.getCurrentHour();
    const currentMinute = this.getCurrentMinute();

    if ((currentMinute >= integer) && (this.LastHourofNotification != currentHour)) {
      logger.info(`Time to do some exercice`);
      logger.info(`User chose to select exercice ${userChoosenValue}`);

      let currentExercise;
      if (userChoosenValue == random) {

        currentExercise = random_items(this.chosenExercice);
      
      } else {
        
          // get the current exercise to perform
         currentExercise = this.getExercerciseCurrent();
         
         // prepare the next exercise
         this.prepareNextExercise();

      } 
      
      this.LastHourofNotification = currentHour;
    
      logger.info("Workout Reminder, time to Workout.");
      const color = '#00BFFF';

      return new q.Signal({
        points: [
          [new q.Point(color, q.Effects.BLINK)]
        ],
        name: 'Workout Reminder',
        message: currentExercise

      });

    }
  }

}


module.exports = {
  WorkOut: WorkOut,
  random_items: random_items
  
}

const applet = new WorkOut();