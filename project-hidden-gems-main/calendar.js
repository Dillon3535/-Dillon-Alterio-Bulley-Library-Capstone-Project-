/*This function generates day calendar */
function setDayCalendar(date)
{
    var weekday=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var chosenDate = date;
    var day="";

    /* If user wants to generate today calendar */
    if(date=="today")
    {
        //Create date object and get today's date
        var today = new Date();
        chosenDate = today.getDate();

        //Get today's day
        day = weekday[today.getDay()];
    }
    else
    {
        //If a custom date calendar need to be created
        //Get date picker value
        var selectedMonth = document.getElementById("monthPicker").value;
        selectedMonth = String(selectedMonth).split("-");
        var dt;

        //If yesterday's calendar need to be generated
        if(date == "prev")
        {
            //If today is first day of month
            if(selectedMonth[2] == 1)
            {
                //Generate previous month's last date
                dt = new Date(selectedMonth[0], parseInt(selectedMonth[1])-1, 0);
            }
            else
            {
                //Generate yesterday's  date object
                dt = new Date(selectedMonth[0], parseInt(selectedMonth[1])-1, parseInt(selectedMonth[2])-1);
            }
            
            chosenDate = dt.getDate();
        }
        else if(date == "next") //If next day calendar need to be generated
        {
            //Get month end date object
            dt = new Date(selectedMonth[0], parseInt(selectedMonth[1]),  0);

            //If today is month end, create next month first day date object
            if(selectedMonth[2] == dt.getDate())
            {
                dt = new Date(selectedMonth[0], parseInt(selectedMonth[1]), 1);
            }
            else
            {
                dt = new Date(selectedMonth[0], parseInt(selectedMonth[1])-1, parseInt(selectedMonth[2])+1);
            }
            chosenDate = dt.getDate();
        }
        else
        {
            dt = new Date(selectedMonth[0], parseInt(selectedMonth[1])-1,  parseInt(selectedMonth[2]));
            chosenDate = dt.getDate();
        }
        
        //Get weekday, and current month
        day = weekday[dt.getDay()];
        var month = (parseInt(dt.getMonth())+1);
        var date = dt.getDate();

        //Add 0 to month (If month == 9 i.e. September, make it 09)
        if(month<10)
        {
            month = "0" + month;
        }

        //Add 0 to date
        if(date<10)
        {
            date = "0" + date;
        }

        //Set date picker value to new date
        document.getElementById("monthPicker").value = dt.getFullYear()+"-"+month+"-"+date;
        
    }

    //Create calendar table
    var table = document.createElement("table");
    table.setAttribute("id", "dayCalendar");
    var row = document.createElement("tr");
    var timeHead = document.createElement("th");
    timeHead.innerHTML=" ";
    timeHead.setAttribute("class", "timeCol");
    row.appendChild(timeHead);
    var dataHead = document.createElement("th");
    dataHead.innerHTML = chosenDate + " <span class='day'>" + day + "</span>";
    row.appendChild(dataHead);
    table.appendChild(row);

    //Creating all 24 rows
    for(var cnt=1;cnt<=24;cnt++)
    {
        row = document.createElement("tr");
        timeHead = document.createElement("th");
        var chosenTime;
        if(cnt<13)
        {
            chosenTime = cnt + " AM"
            timeHead.innerHTML= chosenTime;
        }
        else
        {
            chosenTime = cnt-12 + " PM"
            timeHead.innerHTML= chosenTime;
        }
        
        timeHead.setAttribute("class", "timeCol");
        row.appendChild(timeHead);

        dataHead = document.createElement("td");
        dataHead.setAttribute("id", chosenDate + "-" + chosenTime);
        row.appendChild(dataHead);
        table.appendChild(row);
    }

    //Clear current data from div and append new table
    document.getElementById("calendarView").innerHTML="";
    document.getElementById("calendarView").appendChild(table);


}

/* This function generates weekly calendar */
function setWeeklyCalendar(date)
{
    var weekday=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //Create tabe structure
    var table = document.createElement("table");
    table.setAttribute("id", "weekCalendar");
    var row = document.createElement("tr");
    var timeHead = document.createElement("th");
    timeHead.innerHTML=" ";
    timeHead.setAttribute("class", "timeCol2");
    row.appendChild(timeHead);

    //Create all date headings
    for(var cnt=0;cnt<7;cnt++)
    {
        var dataHead = document.createElement("th");
        dataHead.innerHTML = String(date[cnt]) + " <span class='day'>" + weekday[cnt] + "</span>";
        row.appendChild(dataHead);
    }
    table.appendChild(row);

    //Create all 24hr columns
    for(var cnt=1;cnt<=24;cnt++)
    {
        row = document.createElement("tr");
        timeHead = document.createElement("th");
        if(cnt<13)
        {
            timeHead.innerHTML= cnt + " AM";
        }
        else
        {
            timeHead.innerHTML= cnt-12 + " PM";
        }
        
        timeHead.setAttribute("class", "timeCol2");
        row.appendChild(timeHead);

        for(var colCnt=0;colCnt<7;colCnt++)
        {
            dataHead = document.createElement("td");
            dataHead.setAttribute("id", "timeCol2" + cnt);
            row.appendChild(dataHead);
        }

        
        table.appendChild(row);
    }

    document.getElementById("calendarView").innerHTML="";
    document.getElementById("calendarView").appendChild(table);


}

/* Function to switch between views */
function changeView()
{

    if(document.getElementById("viewPicker").value == "Day")
    {
        setDayCalendar("10");
    }
    else if(document.getElementById("viewPicker").value == "Week")
    {
        setPrevious();
        
    }
}

/* Function to set previous day or week */
function setPrevious()
{
    var flag=false;
    //If day view is selected, set previous day
    if(document.getElementById("viewPicker").value == "Day")
    {
        setDayCalendar("prev");
    }
    else
    {
        //Array to store all dates
        var dates=[];

        var date;
        var selectedMonth = document.getElementById("monthPicker").value;

        //If no month is selected from date picker, get todays' date
        if(selectedMonth == "")
        {
            date = new Date();
        }
        else
        {
            //Create date object from date picker's date
            selectedMonth = String(selectedMonth).split("-");
            date = new Date(selectedMonth[0], parseInt(selectedMonth[1])-1, selectedMonth[2]);

        }

        //Get first day of current week
        var day = parseInt(date.getDate()) - parseInt(date.getDay());

        //Generate all 7 dates that need to be displayed
        for(var cnt=0;cnt<7;cnt++)
        {
            if(day>1)
            {
                dates.push(parseInt(day-1));
                day-=1;
            }
            else
            {
                date = new Date(date.getFullYear(), parseInt(date.getMonth()), 0);
                day = date.getDate();
                cnt-=1;
                flag=true;
            }
        }
        //Sort all dates
        dates = sortDate(dates, flag);
        //Set Calendar
        setWeeklyCalendar(dates);

        //Get Largest from generated Dates
        var dt = getLargest(dates);
        //Get month
        var month = parseInt(date.getMonth())+1;

        if(dt < 10)
        {
            dt = "0" + String(dt);
        }

        if(month<10)
        {
             month="0"+String(month);
        }
        
        //Set date picker value to last day of the newly set week
        document.getElementById("monthPicker").value = date.getFullYear()+"-"+month+"-"+dt;
    }
}

/* Function to set next day or week */
function setNext()
{
    //If day view is selected
    if(document.getElementById("viewPicker").value == "Day")
    {
        setDayCalendar("next");
    }
    else
    {
        var dates=[];
        var selectedMonth = document.getElementById("monthPicker").value;
        var date;

        if(selectedMonth == "")
        {
            date = new Date();
            
        }
        else
        {
            selectedMonth = String(selectedMonth).split("-");
            date = new Date(selectedMonth[0], parseInt(selectedMonth[1])-1, selectedMonth[2]);
        }

        //Set day to last day of the week
        var day = parseInt(date.getDate()) - parseInt(date.getDay())+6;

        var tmpDate = new Date(date.getFullYear(), date.getMonth(), 0);

        //Generate all 7 days from next week
        for(var cnt=0;cnt<7;cnt++)
        {
            
            if(day<parseInt(tmpDate.getDate()))
            {
                dates.push(parseInt(day+1));
                day+=1;
            }
            else
            {
                date = new Date(date.getFullYear(), parseInt(date.getMonth())+1, 1);
                day = date.getDate();
                cnt-=1;
                flag=true;
                tmpDate = new Date(date.getFullYear(), date.getMonth(), 0);
            }
        }

        //Set weekly calendar
        setWeeklyCalendar(dates);

        var dt = getLargest(dates);
        var month = parseInt(date.getMonth())+1;

        if(dt < 10)
        {
            dt = "0" + String(dt);
        }

        if(month<10)
        {
             month="0"+String(month);
        }

        document.getElementById("monthPicker").value = date.getFullYear()+"-"+month+"-"+dt;
    }
}

/* Function to sort an array as per the week */
function sortDate(dates, flag)
{
    //Simple Ascending order sorting
    if(!flag)
    {
        for(var i=0;i<dates.length;i++)
        {
            for(var j=i+1;j<dates.length;j++)
            {
                if(dates[i]>dates[j])
                {
                    temp = dates[i];
                    dates[i] = dates[j];
                    dates[j] = temp;
                }
            }
        }
    }
    else
    {
        //If array has dates from previous as well as current month
        //Seperate both dates in different arrays
        var array1 = dates.filter(date => date > 10);
        var array2 = dates.filter(date => date < 10);

        //Sort previous month array in ascending (29,30,31)
        for(var i=0; i<array1.length;i++)
        {
            for(var j=0; j<array1.length;j++)
            {
                if(array1[i] < array1[j])
                {
                    temp = array1[i];
                    array1[i] = array1[j];
                    array1[j] = temp;
                }
            }
        }

        //Sort this month dates in ascending order
        for(var i=0; i<array2.length;i++)
        {
            for(var j=0; j<array2.length;j++)
            {
                if(array2[i] < array2[j])
                {
                    temp = array2[i];
                    array2[i] = array2[j];
                    array2[j] = temp;
                }
            }
        }

        //Concatenate both arrays
        dates= array1.concat(array2);
    }
    
    console.log(dates);
    return dates;
}

/* Function to find the largest of all values in an array */
function getLargest(dates)
{
    var largest=0;

    for(var cnt=0;cnt<dates.length;cnt++)
    {
        if(dates[cnt] > largest)
        {
            largest=dates[cnt];
        }
    }

    return largest;
}