$(document).ready(function () {

    // Display current day at the top of the calendar
    $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

    $(".saveBtn").on("click", function () {
        // Save button click event
        let timeID = $(this).parent().attr("id");
        let value = $(this).siblings(".description").val();

        localStorage.setItem(timeID, value);

        $(".notification").addClass('show');

        setTimeout(function () {
            $(".notification").removeClass("show");

        }, 5000);
    });

    // Color-code timeblocks based on past, present, and future
    function updateTimeblocks() {
        let currentHour = dayjs().hour();

        $(".time-block").each(function () {
            let blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past");
                $(this).addClass("present");
            } else {
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        });
    }


    // Call the updateTimeblocks function
    updateTimeblocks();

    setInterval(updateTimeblocks, 60000);

    // Retrieve and display events from local storage
    function displayEvents() {
        $(".time-block").each(function () {
            let timeID = $(this).attr("id");
            let event = localStorage.getItem(timeID);

            if (event) {
                $(this).children(".description").val(event);
            }
        });
    }

    displayEvents();
});
