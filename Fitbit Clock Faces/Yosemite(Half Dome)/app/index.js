import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import userActivity from "user-activity"; //adjusted types (matching the stats that you upload to fitbit.com, as opposed to local types)
import { battery } from "power";
import { charger } from "power";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import * as messaging from "messaging";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
let myDate = document.getElementById("myDate");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov", "Dec"]
  
  myDate.text =  days[evt.date.getDay()] + " " + months[evt.date.getMonth()] + " " + evt.date.getDate(); // + " " + evt.date.getFullYear();
}

// ------------------------------------------------------------------------------ Battery Status
const myBattery = document.getElementById("myBattery");

myBattery.text = `${battery.chargeLevel}%`; // initialize on startup
battery.onchange = (charger, evt) => {
   myBattery.text = `${battery.chargeLevel}%`;
}

// ------------------------------------------------------------------------------ Weather Status


// ----------------------------------------------------------------- Number of Steps
const mySteps = document.getElementById("mySteps");

  // Activity Values: adjusted type
  let stepsValue = (userActivity.today.adjusted["steps"] || 0); // steps value measured from fitbit is assigned to the variable stepsValue
  let stepsString = stepsValue; // I concatenate a the stepsValue (line above) with th string ' steps' and assign to a new variable
  mySteps.text = stepsString; // the string stepsString is being sent to the stepsHandle set at line 15

// ---------------------------------------------------------------- Date

