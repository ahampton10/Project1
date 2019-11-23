//Calls on the live score API 
  
  function newsAPI(input) {
    var newsAPIKEY = "api-key=qieFEkfiJNxxx27yEHvLk1rDZyOKPHbI"; 
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + newsAPIKEY +"&&q=" + input; 
  
    $.ajax ({
        url: queryURL, 
        method: "GET", 

    }).then(function (response) {
       console.log(response); 
       console.log (queryURL); 

      var results = response.response.docs;
      console.log(results); 
    
    for (var i = 0; i < 10; i++) {
      var trTag = $("<tr>");
      var rowTag = $("<td>");
      var titleTag = $("<td>").text(results[i].headline.main);
      var content = $("<a>").attr({"href": results[i].web_url, "target": "_blank", class : "newsContent"});
      var contentTag = $("<td>");
      
      
      content.text(results[i].content);
      
  
      contentTag.prepend(content);

      $("#newsTable").append(trTag)
      $("#newsTable").append(rowTag)
      $("#newsTable").append(titleTag)
      $("#newsTable").append(contentTag)
  
       }
  
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
  
    for (var j = 0; j < 5; j++){
        var button = $("<button>").addClass("buynow"); 
        button.text(result.events[j].name); 
        var ticketTag = $("<td>").html('<a target="_blank" href="'+ result.events[j].url +'"><i class="fas fa-5x fa-ticket-alt tmargin"></i></a>'); 
        button.append(ticketTag); 
        $("#tmaster").append(button); 
    }
    }); 
  }
  
  
  