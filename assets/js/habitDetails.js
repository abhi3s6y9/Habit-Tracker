(function () {

    const daysList = document.getElementById("item-list");
    const url = new URL(window.location.href);
    const habitId = url.searchParams.get("id");
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    const filterBtn = document.getElementById("filter")
    let currentDate;
    let sixDaysBefore;

    // This function finds the current date 
    // Finds date of past 6 days from the currect day
    // Gives a choice to the user to pick past number of days by adding min and max values to date picker

    function SetMinMaxDateOnDatePicker() {
        currentDate = moment().format('YYYY-MM-DD');
        sixDaysBefore = moment(currentDate).subtract(6, 'days').format('YYYY-MM-DD');
        
        startDate.setAttribute("max", currentDate);
        endDate.setAttribute("max", currentDate);
        startDate.setAttribute("min", sixDaysBefore);
        endDate.setAttribute("min", sixDaysBefore);
        startDate.value = moment(currentDate).subtract(6, 'days').format('YYYY-MM-DD');
        endDate.value = currentDate;
    }

    // call function to set min max values
    SetMinMaxDateOnDatePicker();


    // updates a particular date object which corresponds to task done in that day or not
    const updateThisDateInDb = async function (date, value) {
        const res = await fetch(`/update-db-date?id=${habitId}&date=${date}&value=${value}`);
    }



    //  this function helps in rendering the date list
    // it sets some properties of all the dates so that user can interact properly
    const renderDaysList = function (count, recordTracker, endDate) {
        let i = 0;
        // const currentDate = moment().format('YYYY-MM-DD');
        while (i <= count) {
            const fromattedDate = moment(endDate).subtract(i, 'days').format('LL');
            const date = moment(endDate).subtract(i, 'days').valueOf() + "";
            const listElement = document.createElement("li");
            listElement.setAttribute("class", "list-item");
            listElement.setAttribute("id", date);

            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "date-div");
            dateDiv.innerHTML = fromattedDate;

            // Mark the date as current date
            if (moment(endDate).subtract(i, 'days').valueOf() == moment(currentDate).valueOf()) {
                dateDiv.innerHTML += " (TODAY)";
                listElement.style.border = " 2px solid lightslategray";
            }

            const statusDiv = document.createElement("div");
            statusDiv.setAttribute("class", "status");

            if (date in recordTracker) {
                // console.log(date + "  " + recordTracker[date])
                if (recordTracker[date] == '0') {
                    statusDiv.style.backgroundColor = "red";
                }
                else if (recordTracker[date] == '1') {
                    statusDiv.style.backgroundColor = "green";
                }
                else if (recordTracker[date] == '-1') {
                    statusDiv.style.backgroundColor = "gray";
                }
            }
            else {
                statusDiv.style.backgroundColor = "gray";
            }

            listElement.onclick = function () {
                let value = 0;
                if (statusDiv.style.backgroundColor == "gray") {
                    statusDiv.style.backgroundColor = "green"
                    value = '1';
                }
                else if (statusDiv.style.backgroundColor == "green") {
                    statusDiv.style.backgroundColor = "red"
                    value = '0';
                }
                else if (statusDiv.style.backgroundColor == "red") {
                    statusDiv.style.backgroundColor = "gray"
                    value = '-1';
                }
                updateThisDateInDb(date, value);
            }

            listElement.appendChild(dateDiv);
            listElement.appendChild(statusDiv);

            daysList.appendChild(listElement);
            i++;
        }
    }

    // This Function fetches user from database and therefore we have access to date map.
    const fetchFromDB = async function (id) {
        const res = await fetch("/find-habit?id=" + id);
        const data = await res.json();
        return data;
    }

    // On loading it calls some functions to render date list
    const renderOnLoad = async function (days, endDate) {
        const data = await fetchFromDB(habitId);
        const recordTracker = data.record_tracker;
        renderDaysList(days, recordTracker, endDate);
    }


    // helps in filtering by date.
    filterBtn.onclick = function () {
        let startDateMoment = moment(startDate.value);
        let endDateMoment = moment(endDate.value);
        let days = endDateMoment.diff(startDateMoment, 'days');
        if (days < 0) {
            alert("Start date cannot be greater than end date");
            return;
        }
        daysList.innerHTML = "";
        renderOnLoad(days, endDateMoment);
    }


    renderOnLoad(6, currentDate);

})();