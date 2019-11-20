async function getData() 
{
  let response = await fetch('http://localhost:4000/api/')
  let data = await response.json()
  return data
}

async function main() {
    //Get values from the database
    const value = await getData()

    //Create an array
    let activity = new Array();
    let time = new Array();

    data = value.activity[0].activity
    //Set value into an array
    for(let x = 0; x < value.activity.length; x++){
        activityValue = value.activity[x].activity
        activity[x] = activityValue
    }
    for(let x = 0; x < value.activity.length; x++){
        timeValue = value.activity[x].time
        time[x] = timeValue
    }
     console.log(activity[0])
   console.log(time[0])
   
    
    anychart.onDocumentReady(function () {
        // create bar chart
        var chart = anychart.bar();
    
        chart.background().fill({
            keys: ["whitesmoke"]
        });
    
        chart.animation(true);
    
        chart.padding([10, 40, 5, 20]);
    
        chart.title('Monthly Analysis');
    
        // create bar series with passed data
        // create data
        var data = []
        for(let x = 0; x < activity.length; x++){
            data.push([activity[x], time[x]])
        }
        
       // console.log(data)
        var series = chart.bar(data);
       
    
        // set tooltip settings
        series.tooltip()
                .position('right')
                .anchor('left-center')
                .offsetX(5)
                .offsetY(0)
                .titleFormat('{%X}')
                .format('{%Value}');
    
        // set yAxis labels formatter
        chart.yAxis().labels().format('{%Value}{groupsSeparator: }');
    
        // set titles for axises
        chart.xAxis().title('Activies');
        chart.yAxis().title('Hours');
        chart.interactivity().hoverMode('by-x');
        chart.tooltip().positionMode('point');
        // set scale minimum
        chart.yScale().minimum(0);
    
        // set container id for the chart
        chart.container('container');
        // initiate chart drawing
        chart.draw();
    });
  }
  
  main()
