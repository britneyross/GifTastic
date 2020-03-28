var topics = ["David Bowie", "Freddie Mercury", "Amy Winehouse", "Prince", "John Lennon", "Beyonce", "Lady Gaga", "Madonna", "Jimi Hendrix", "Lana Del Rey"];

//Adds new button to list
function renderButtons() {
    $(".buttonList").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("topic btn btn-info");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $(".buttonList").append(newButton);
    }
};

//Grabs topic from textbox
$("#submitTopic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topicInput").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=wfAmUDkYrYxeI6G0AVrUgTTWmkwg1TXD&limit=10";

    //Performing ajax get request to query URL
    //Alerts user if no gifs are found in search results and if musician already exists in list
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        if (response.data.length == 0) {
            alert("No Gifs found for this musician");
        } else if (topics.indexOf(topic) != -1) {
            alert("Musician already exists");
        } else {
            topics.push(topic);
            renderButtons();
        }
    });
});

function displayGifs() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=wfAmUDkYrYxeI6G0AVrUgTTWmkwg1TXD&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $(".gifs").empty();
        for (var i = 0; i < response.data.length; i++) {    
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

            var gifImage = $("<img src= '" + response.data[i].images.fixed_height_still.url + "'>");
            gifImage.addClass("gif");

            var imageDiv = $("<div>");
            imageDiv.addClass("play");
            gifImage.attr("data-state", "still");
            gifImage.attr("data-name", topic);
            gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", response.data[i].images.fixed_height.url);

            $(imageDiv).append(gifImage);
            $(gifDiv).append(imageDiv);
            $(".gifs").append(gifDiv);

        }
    });
};

function playGif() {
    if ($(this).attr("data-state") === "still") {
        let animate_link = $(this).attr('data-animate'); 
        $(this).attr("src", animate_link);
    }
    else {
        let still_link = $(this).attr('data-still');
        $(this).attr("src", still_link);
    }
};

$(document).on("click", ".topic", displayGifs);
$(document).on("click", ".gif", playGif);

renderButtons();

