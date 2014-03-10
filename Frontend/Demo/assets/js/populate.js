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
  modalViewPre += '<div class="modal-header"><span id="modal-head-content">test</span></div><div class="modal-body"><span id="modal-body-content"></span></div>';
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
    htmlAll += "<img src='http://54.193.33.84:8080/Demo/images/Placeholder.png'>";
    htmlAll += "<a class='btn btn-small pull-right detail-page' data-toggle='modal' data-target='#myModalTest' data-id=";
    htmlAll += i;
    htmlAll += ">View Reviews</a><br class='clr'/>";

    htmlAll += "</div>";
    
    htmlAll += "<div class = 'span4 alignR'>";
    htmlAll += "<h4> Brand </h4>";
    htmlAll += "<p>" + result[i].Brand + "</p>";
    htmlAll += "<h4> Catetory </h4>";
    if (result[i].Category) {
        htmlAll += "<p>" + result[i].Category + "</p>";
    } else {
        htmlAll += "<p>" + 'N/A' + "</p>";
    }
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
  /*
  $(document).on("click",".detail-page",function(){
    //var productId = $(this).data('id');
    //populateModal()  
  });
  */
  $(".detail-page").click(function(){
    var iproduct = $(this).data('id'); 
    populateModal(result[iproduct]);
  });
}

/*
 * generate product detail modal page content by given PID
 * it should contain all the product title, review title and review content
 */

function populateModal(product){
  var modalHead = "<span id='modal-head-content'><h3>" + product.ProductTitle + "</h3></span>"; 
  $("#modal-head-content").replaceWith(modalHead);
  
  if(typeof(product.ReviewTitle) == "undefined") { 
    var modalBody = "<span id='modal-body-content'>No Review NOW </span>";
    $("#modal-body-content").replaceWith(modalBody);
    return
   }
  else{
    var modalBody = "<div id='modal-body-content'>";
    for (var i =0; i<product.ReviewTitle.length;i++){
      console.log(product.ReviewTitle[i]); 
      modalBody += "<div><h4>" + product.ReviewTitle[i] + "</h4>"+" "+product.Rating[i]+"</div>"
      modalBody += "<div>" + product.Review[i] + "</div>";
    }
    modalBody += "</div>";
    $("#modal-body-content").replaceWith(modalBody);

  }
  
}

function calcRating(ratings){
  var total = 0;
  if(typeof(ratings) == "undefined") return "N/A";
  for(var i = 0; i< ratings.length; i++){
    total +=parseInt(ratings[i]);
  }
 return Math.round(total/ratings.length); 
}
function drawStar(score){
  var star = "";
  star+="<span class='glyphicon glyphicon-search'></span>";
}
