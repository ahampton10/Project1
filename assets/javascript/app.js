
//Searches APIs when logos are clicked 

$(document).on("click", ".logos", function (event) {
    event.preventDefault (); 
    $("tbody").empty (); 
    $("tmaster").empty (); 
    var input = $(this).attr("data-name"); 
    $(".ticketmaster").show (); 
    liveApi(input); 
    tmApi(input); 
}); 

//Calls on the live score API 

function liveAPI(input) {
    var queryURL = "https://allsportsapi.com/api/basketball/?met=Livescore" + input + '&APIkey=8ef0c87feea2c18987d88b3c304eff3fae2a958f8e81673eecac0651a83bbfa1'; 

    $.ajax ({
        url: queryURL, 
        method: "GET"
    }).then(function (response) {

//For loop that run through current games

        var result = response.games; 

        for (var i = 0; i < 15; i++) {
        var trTag = $("<tr>"); 
        var rowTag = $("<td>"); 
        var titleTag = $("<td>").text(result[i].title); 
        var content = $("<a>").attr({"href": result[i].url, "target": "_blank", class: "liveContent"}); 
        var contentTag = $("<td>"); 

        content.text(result[i].content); 
        contentTag.append(content); 

        $("#scoreTable").append(trTag); 
        $("#scoreTable").append(rowTag); 
        $("#scoreTable").append(titleTag); 
        $("#scoreTable").append(contentTag); 

        }

        }); 

    }
//Grabbing ticket info by input
 
function tmApi (input) {
    var APIkey = "quk7UZVuqQv8KgdTBgv0dMLjkA3IF56q"; 
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + APIkey + "&keyword=" + input; 

    $.ajax ({
        url: queryURL, 
        method: "GET", 

    }).then(function (response) {
        var result =respone._embedded; 
        console.log(response); 

    for (var i = 0; i < 15; i++){
        var button = $("<button>").addClass("buynow"); 
        button.text(result.events[i].name); 
        var ticketTag = $("<td>").html('<a target="_blank" href="'+ result.events[i].url +'"><i class="fas fa-5x fa-ticket-alt tmargin"></i></a>');
        button.append(ticketTag); 
        $("#tmaster").append(button); 
    }
    }); 
}
