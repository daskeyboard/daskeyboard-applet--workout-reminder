const q = require('daskeyboard-applet');
const logger = q.logger; // to access to the logger
const moment = require('moment');


const listofexercices = ['Pushups', 'Squats', 'Front Lunges', 'Spider Crawl', 'High Knees', 'Mountain Climber', 'Plank', 'Plank Jacks', 'Jumping Jacks', 'Chair', 'Crunches', 'Legs Drop'];

//random function 
function random_items(listofexercices) {
  return listofexercices[Math.floor(Math.random() * listofexercices.length)];
}


//One by one in order function
function order_items(listofexercices){ 
  var resultat ='';  
  for (i =0; i< listofexercices.length; i++){
    resultat += listofexercices[i];
    return resultat
  }
  
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
    var integer = parseInt(minuteAfterTheHour, 10);

    //current time
    const currentHour = this.getCurrentHour();
    const currentMinute = this.getCurrentMinute();

    if ((currentMinute >= integer) && (this.LastHourofNotification != currentHour)) {



      console.log("================================");
      console.log("chosenExercice avant la boucle else if", this.chosenExercice);
      console.log("================================");
      
      console.log("================================");
      console.log("valeur current hour", currentHour);
      console.log("valeur current minute", currentMinute);
      console.log("valeur integer", integer);
      console.log("valeur last hour before notification", this.LastHourofNotification);
      console.log("================================");
      console.log("================================");




      if (userChoosenValue == random) {




        var FunctionResult = random_items(this.chosenExercice);
      
      
      
      
      } else {

        

        console.log("************************************");
        console.log("valeur de user choosen value", userChoosenValue)
        console.log("************************************");


         var FunctionResult = order_items(this.chosenExercice);
        


        console.log("************************************");
        console.log("valeur de fonction resultat apres la fonction", FunctionResult);
        console.log("************************************");
        console.log("************************************");
      
      } 
      
      
      this.LastHourofNotification = currentHour;
      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
      console.log("valeur de last hour ", this.LastHourofNotification);
      console.log("valeur de current hour ", currentHour);

      console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");


      logger.info("Workout Reminder, time to Workout.");
      const color = '#0000FF'; //green color

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
  random_items: random_items,
  order_items: order_items
}

const applet = new WorkOut();
