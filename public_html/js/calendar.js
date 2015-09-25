var gmonth = 7;
var day;
var year = 2015;
var reservations = [];
var reservation1 = new _Reservation(new Date(2015, 7, 12), new Date(2015, 7, 19));
var reservation2 = new _Reservation(new Date(2015, 8, 3), new Date(2015, 8, 6));
var reservation3 = new _Reservation(new Date(2015, 2, 3), new Date(2015, 3, 9));
var Month = new Array("Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień");
var Day = new Array("Pn", "Wt", "Śr", "Cz", "Pt", "S", "N");





function createCalendar(month) {
    document.open();
    gmonth = month;

    
    reservations.push(reservation1);
    reservations.push(reservation2);
    reservations.push(reservation3);
    var firstDayDate = new Date(2015, month, 1);
    var firstDay = firstDayDate.getDay();
    if (firstDay === 0)
    {
        firstDay = 6;
        var iter = 0;
    }
    else
    {
        var iter = 1;
    }
    var maxDays = maxDaysInMonth(month, 2015);
    var prevmaxDays = maxDaysInMonth(month - 1, 2015);
    var text = "";





    text += '<div class="col-sm-3" id="hd">';
    text += ' <div class="panel panel-default" style="text-align:center"><span class="glyphicon glyphicon-chevron-left" id="prev"></span><span class="text-center" id="dateLabel">' + Month[month] + ' ' + firstDayDate.getFullYear() + '</span><span class="glyphicon glyphicon-chevron-right" id="next"></span>';
    text += '<table class="table" id="calendarTable">';
    text += '<thead>';

    text += '<tr>';
    for (var i = 0; i < 7; i++)
    {
        text += '<th >' + Day[i] + "</th>";

    }


    text += '</tr>';
    text += '</thead>';
    text += '<tbody>';
    var monthEnded = false;
    var reserved = false;

    for (var y = 0; y < 6; y++)
    {


        text += '<tr>';
        for (var i = 0; i < 7; i++)
        {
            reserved = false;
            iter++;

            var day = iter - firstDay;

            if (day <= 0)
            {
                day += prevmaxDays;
                text += '<td class="outOfMonth">' + day + '</td>';

            }

            else if (day === maxDays)
            {
                iter = 0;
                firstDay = 0;
                for (var c = 0; c < reservations.length; c++)
                {
                    dateCheck = new Date(2015, month, day)
                    if (dates.inRange(dateCheck, reservations[c].dateFrom, reservations[c].dateTo))
                        reserved = true;
                }
                if (!reserved)
                    text += '<td>' + day + '</td>';
                else
                    text += '<td class="strikethrough">' + day + '</td>';
                monthEnded = true;

            }
            else {
                if (!monthEnded) {
                    for (var c = 0; c < reservations.length; c++)
                    {
                        dateCheck = new Date(2015, month, day);
                        if (dates.inRange(dateCheck, reservations[c].dateFrom, reservations[c].dateTo))
                            reserved = true;
                    }
                    if (!reserved)
                        text += '<td>' + day + '</td>';
                    else
                        text += '<td class="strikethrough">' + day + '</td>';
                }
                else
                    text += '<td class="outOfMonth">' + day + '</td>';

            }


        }
        text += '</tr>';
    }
    text += '</tbody>';
    text += '</table>';
    text += '</div>';

    text += '</div>';


    $(document).on('click', '#next', function(e) {
        switchDate(true);
    });
    $(document).on('click', '#prev', function(e) {
        switchDate(false);
    });


    document.write(text);
    document.close();
}


function maxDaysInMonth(month, year) {
    var maxDays;
    if ((month === 3) || (month === 5) || (month === 8) || (month === 10)) {
        maxDays = 30;
    }
    else {
        maxDays = 31;
        if (month === 1) {
            if (year / 4 - parseInt(year / 4) !== 0) {
                maxDays = 28;
            }
            else {
                maxDays = 29;
            }
        }
    }
    return maxDays;
}



function switchDate(next)
{

    if (next === true)
        gmonth += 1;
    else if (next === false)
        gmonth -= 1;
   
    if (gmonth === 12) {
        gmonth = 0;
        year += 1;
    }
    if (gmonth < 0)
    {
        gmonth = 11;
        year -= 1;
    }


    var firstDayDate = new Date(year, gmonth, 1);
    var firstDay = firstDayDate.getDay();
    if (firstDay === 0)
    {
        firstDay = 6;
        var iter = 0;
    }
    else
    {
        var iter = 1;
    }
    var maxDays = maxDaysInMonth(gmonth, year);
    var prevmaxDays = maxDaysInMonth(gmonth - 1, year);

    var myTable = document.getElementById("calendarTable");
    document.getElementById("dateLabel").innerHTML = Month[gmonth] + " " + year;



    var reserved = false;
    var monthEnded = false;

    for (var y = 1; y < 7; y++)
    {
        reserved = false;
        for (var i = 0; i < 7; i++)
        {
            reserved = false;
            iter++;

            var day = iter - firstDay;
            if (day <= 0)
            {
                day = prevmaxDays + day;

                myTable.rows[y].cells[i].innerHTML = day;
                myTable.rows[y].cells[i].className = "outOfMonth";


            }

            else if (day === maxDays)
            {
                iter = 0;
                firstDay = 0;
                for (var c = 0; c < reservations.length; c++)
                {
                    dateCheck = new Date(year, gmonth, day);
                    if (dates.inRange(dateCheck, reservations[c].dateFrom, reservations[c].dateTo))
                        reserved = true;
                }
                myTable.rows[y].cells[i].innerHTML = day;
                if (!reserved)
                    myTable.rows[y].cells[i].className = "inMonth";
                else
                    myTable.rows[y].cells[i].className = "strikethrough";
                monthEnded = true;
            }
            else {
                if (!monthEnded)
                {
                    for (var c = 0; c < reservations.length; c++)
                    {
                        dateCheck = new Date(year, gmonth, day);
                        if (dates.inRange(dateCheck, reservations[c].dateFrom, reservations[c].dateTo))
                            reserved = true;
                    }
                    myTable.rows[y].cells[i].innerHTML = day;
                    if (!reserved)
                        myTable.rows[y].cells[i].className = "inMonth";
                    else
                        myTable.rows[y].cells[i].className = "strikethrough";
                }
                else {

                    myTable.rows[y].cells[i].innerHTML = day;
                    myTable.rows[y].cells[i].className = "outOfMonth";

                }
            }
        }

    }
}

//obiekt zawierający daty rezerwacji
function _Reservation(dateFrom, dateTo) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
}




var dates = {
    convert: function(d) {

        return (
                d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                d.constructor === Number ? new Date(d) :
                d.constructor === String ? new Date(d) :
                typeof d === "object" ? new Date(d.year, d.month, d.date) :
                NaN
                );
    },
    compare: function(a, b) {

        return (
                isFinite(a = this.convert(a).valueOf()) &&
                isFinite(b = this.convert(b).valueOf()) ?
                (a > b) - (a < b) :
                NaN
                );
    },
    inRange: function(d, start, end) {

        return (
                isFinite(d = this.convert(d).valueOf()) &&
                isFinite(start = this.convert(start).valueOf()) &&
                isFinite(end = this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
                );
    }
};

  
$( document ).ready(function() {




$("#mdatepicker").datepicker( {
    format: "mm-yyyy",
    viewMode: "months", 
    minViewMode: "months"
   
})
    .change(dateChanged)
    .on('changeDate', dateChanged);
   
});


 $(document).on('click', '#calendarIcon', function(e) {
      $("#mdatepicker").datepicker('show');
    });


function dateChanged(ev) {
 

setInterval(function() { track_change()}, 100);
}


var oldValue = $('#mdatepicker').val();


function track_change()
   {
     if( $('#mdatepicker').val() !== oldValue )
     {
       oldValue =  $('#mdatepicker').val();
       var result = $('#mdatepicker').val().substr(2) + $('#mdatepicker').val().substr(0, 2);
       result = result.substr(1);
       result = result.slice(0, 4) + "-" + result.slice(4);
       result+="-01";
        var date = new Date(result); 
        gmonth = date.getMonth();
        year = date.getFullYear();
        switchDate();
}
     }

   

