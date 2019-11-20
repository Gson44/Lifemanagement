
let hour = 24;
var activities = [];
var increment = 0;
var chart, dataSet;

anychart.onDocumentLoad(function () {
  // create an instance of a pie chart
  chart = anychart.pie();
  // create dataSet and add some initial data
  dataSet = anychart.data.set(["Undocumented time", hour]);
  // set the inital data
  chart.data(dataSet);
  chart.innerRadius("40%");

   chart.background().fill({
     keys: ["whitesmoke"]
 });
 
  // set the container element and draw 
  chart.container("container").draw();

   // create and configure a label
  var label = anychart.standalones.label();
  label.text("Activities");
  label.width("100%");
  label.height("100%");
  label.fontColor("white");
  label.hAlign("center");
  label.vAlign("middle");

  // set the label as the center content
  chart.center().content(label);
});

// set data to chart when user performs an action
function addValue(){
  var minPerc = 60
  var minCalc;

  // read values from inputs
  var name = document.getElementById('activity').value;
  var value = document.getElementById('time').value;
  var option = document.getElementById('Time').value;

  // appendn name value pair to dataSet
  if(hour > 0){
    if(option == "Min"){
      //Set hour
      minCalc = value / minPerc
      hour = hour - minCalc;
  
      dataSet.row(1, ["Undocumented time", hour])
      dataSet.append([name, minCalc]);
    }
    else if(option == "Hours"){
      hour = hour - value;
  
      dataSet.row(1, ["Undocumented time", hour])
      dataSet.append([name, value]); 
      activities[increment] = {name, value}
      increment++
      db.Activities.insert(activities)
    }
  }  
  console.log(activities)
}




  