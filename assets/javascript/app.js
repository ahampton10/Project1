//Searches APIs when logos are clicked 

$(document).on("click", ".statBtn", function (event) {
    event.preventDefault (); 
    $("#tbody").empty (); 
    $("#tmaster").empty (); 
    var input = $(this).attr("data-name"); 
    $(".ticketmaster").show (); 
    liveAPI(input); 
    tmAPI(input); 
    console.log("Button Pushed!"); 
  }); 
  
  
  //Calls on the live score API 
  
  function liveAPI(input) {
    var liveAPIKEY = "api-key=qieFEkfiJNxxx27yEHvLk1rDZyOKPHbI"; 
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + liveAPIKEY +"&&q=" + input; 
  
    $.ajax ({
        url: queryURL, 
        method: "GET"
    }).then(function (response) {
       console.log(response); 
       console.log (queryURL); 
  
       for (var i = 0; i < 10; i++) {
        var trTag = $("<tr>");
        var rowTag = $("<td>");
        var titleTag = $("<td>").text(result[i].stats);
        var content = $("<a>").attr({"href": result[i].url, "target": "_blank", class : "statsContent"});
        var contentTag = $("<td>");

    
        
        content.text(result[i].content);
        
      
        contentTag.append(content);
  
        $("#score-table").append(trTag)
        $("#score-table").append(rowTag)
        $("#score-table").append(titleTag)
        $("#score-table").append(contentTag)
  
    }); 
  
  
    }
    
  //Grabbing ticket info by input
  
  function tmAPI (input) {
    var APIkey = "quk7UZVuqQv8KgdTBgv0dMLjkA3IF56q"; 
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + APIkey + "&keyword=" + input; 
  
    $.ajax ({
        url: queryURL, 
        method: "GET",  
  
    }).then(function (response) {
        var result =response._embedded; 
        console.log(response); 
  
    for (var i = 0; i < 5; i++){
        var button = $("<button>").addClass("buynow"); 
        button.text(result.events[i].name); 
        var ticketTag = $("<td>").html('<a target="_blank" href="'+ result.events[i].url +'"><i class="fas fa-5x fa-ticket-alt tmargin"></i></a>'); 
        button.append(ticketTag); 
        $("#tmaster").append(button); 
    }
    }); 
  }
  
  