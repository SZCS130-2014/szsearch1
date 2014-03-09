/**
 * get the image from Google using ajax query
 */
function queryImage(productTitle, callback) {
  $.getJSON(
    "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="
    + productTitle, 
    function(result) {
      console.log(result);
    });
}

queryImage('camera', null);
