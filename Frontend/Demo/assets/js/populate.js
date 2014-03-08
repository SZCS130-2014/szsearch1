/**
 * this function take one input from the query search result
 * used to populate the search result page.
**/

function populate(result) {
  var htmlAll = "<div class='tab-pane active' id = 'listView'>";
  //modalViewPre is the first part of the template for modal
  var modalViewPre = '<div class="modal fade" id="myModalTest" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
  modalViewPre += '<div class="modal-dialog">';
  modalViewPre += '<div class="modal-content">';
  modalViewPre += '<div class="modal-header"></div>';
  //modalViewEnd is the last part of the template for modal
  var modalViewEnd = '<div class="modal-footer">'
  modalViewEnd += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
  //modalViewEnd += '</div>';  
  modalViewEnd += '</div>';
  modalViewEnd += '</div>';
  modalViewEnd += '</div>';
  modalViewEnd += '</div>';

  //append row based on the search result
  for (var i = 0; i < result.length; i++){
    //generate html for result content
    htmlAll += "<div class = 'row'>";
    
    htmlAll += "<div class = 'span5'>";
    htmlAll += "<h3>"+result[i].ProductTitle+"</h3>"+"<hr class='soft'/>";
    htmlAll += "<p> empty for now </p>"; //need to add content
    //htmlAll += "<a class='btn btn-small pull-right' href='product_details.html'>View Details</a><br class='clr'/>";
    htmlAll += "<a class='btn btn-small pull-right' data-toggle='modal' data-target='#myModalTest'>View Details</a><br class='clr'/>";

    htmlAll += "</div>";
    
    htmlAll += "<div class = 'span4 alignR'>";
    htmlAll += "<h4> Brand </h4>";
    htmlAll += "<p>" + result[i].Brand + "</p>";
    htmlAll += "<h4> Catetory </h4>";
    htmlAll += "<p>" + result[i].Category + "</p>";
    //calculate the average rating from reviews
    htmlAll += "<h4> Ratings </h4>";
    htmlAll += "<p>"+calcRating(result[i].Rating) +"<span class='glyphicon glyphicon-search'></span>" + "</p>";
    htmlAll += "</div>";

    htmlAll += "</div>";
    if (i != result.length-1){
      htmlAll += "<hr class='soft'/>";
    }
  }
  htmlAll +=" </div>";
  $("#listView").replaceWith(htmlAll);
  $("#listView").append(modalViewPre+modalViewEnd);
  //$("#listView").append(modalViewEnd);

}

function calcRating(ratings){
  var total = 0;
  if(typeof(ratings) == "undefined") return 0;
  for(var i = 0; i< ratings.length; i++){
    total +=parseInt(ratings[i]);
  }
  return Math.round(total/ratings.length);
}
function drawStar(score){
  var star = "";
  star+="<span class='glyphicon glyphicon-search'></span>";
}
