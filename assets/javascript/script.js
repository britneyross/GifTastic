var topics = ["David Bowie", "Freddie Mercury", "Amy Winehouse", "Prince", "John Lennon", "Beyonce", "Lady Gaga", "Madonna", "Jimi Hendrix", "Lana Del Rey"];

//Adds new button to list
function renderButtons() {
    $(".buttonList").empty();
    for (var i=0; i < topics.length; i++){
        var newButton = $("<button>");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $(".buttonList").append(newButton);
    }
};

//Grabs topic from textbox
$("#submitTopic").on("click", function(event){
    event.preventDefault();
    var topic = $("#topicInput").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=wfAmUDkYrYxeI6G0AVrUgTTWmkwg1TXD&limit=10";

   //Alerts user if no gifs are found in search results and if musician already exists in list
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response){
        if (response.data.length === 0){
            alert( "No Gifs found for this musician");
        } else if (topics.indexOf(topic) !=-1){
            alert("Musician already exists");
        } else {
            topics.push(topic);
            renderButtons();
        }
    })
})