//Searches APIs when logos are clicked 

$(document).on("click", ".statBtn", function (event) {
    event.preventDefault (); 
    $("#tbody").empty (); 
    $("#tmaster").empty (); 
    var input = $(this).attr("data-name"); 
    $(".ticketmaster").show (); 
    tmAPI(input); 
    console.log("Button Pushed!"); 
    buildQueryURL();
    runSearch();
  }); 
  
  
  //Calls on the NYT API 
  /** 
  @returns {string} URL for NYT API based on form inputs
  */
 function buildQueryURL() {
   var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
 
   var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
 
   queryParams.q = $('.statBtn').attr('data-name');
 
   console.log("---------------\nURL: " + queryURL + "\n---------------");
   console.log(queryURL + $.param(queryParams));
   return queryURL + $.param(queryParams);
 }
 
 /**
  * takes API data (JSON/object) and turns it into elements on the page
  * @param {object} NYTData - object containing NYT API data
  */
 function updatePage(NYTData) {

   var numArticles = 5;
 
   console.log(NYTData);
   console.log("------------------------------------");
 
   for (var i = 0; i < numArticles; i++) {
     var article = NYTData.response.docs[i];
 
     var articleCount = i + 1;
 
     var $articleList = $("<ul>");
     $articleList.addClass("list-group");
 
     $("#teamArticles").append($articleList);
 
     var headline = article.headline;
     var $articleListItem = $("<li class='list-group-item articleHeadline'>");
 
     if (headline && headline.main) {
       console.log(headline.main);
       $articleListItem.append(
         "<span class='label label-primary'>" +
           articleCount +
           "</span>" +
           "<strong> " +
           headline.main +
           "</strong>"
       );
     }
 
     var byline = article.byline;
 
     if (byline && byline.original) {
       console.log(byline.original);
       $articleListItem.append("<h5>" + byline.original + "</h5>");
     }
 
     var section = article.section_name;
     console.log(article.section_name);
     if (section) {
       $articleListItem.append("<h5>Section: " + section + "</h5>");
     }
 
     $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
     console.log(article.web_url);
 
     $articleList.append($articleListItem);
   }
 }
 
 function clear() {
   $("#teamArticles").empty();
 }
 
 function runSearch() {
   event.preventDefault();
   clear();
   var queryURL = buildQueryURL();
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(updatePage);
 } 

  
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
  
  