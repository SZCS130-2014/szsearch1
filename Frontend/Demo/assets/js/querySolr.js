
// weights of different field. You will use this field when you 
// tune parameters
var titleField = "ProductTitle";
var titleWeight = "2.0";
var categoryField = "Category";
var categoryWeight = "0.8";
var brandField = "Brand";
var brandWeight= "0.8";

var baseURL = "http://54.193.33.84:8080/solr/collection1/select";
var itemsPerPage = 30;

/**
 * This function is the entry point for querying lucene from front-end.
 * @param {String} queryTerm 	query term entered by the user
 * @param {Number} pageNumber the page number you are on. Currently 10
                              items per page. Check the definition
                              if you want to modify the content
 * @param {String} brandName  the name of the brand
 * @param {Object} queryMode 	different query mode. Right now it does
 * not do anything
 */
function getProducts(queryTerm, pageNumber, brandName, queryMode, callback) { 

  var prodQueryParam = {
    q: queryTerm,
    start: itemsPerPage * (pageNumber -1),
    end: itemsPerPage * pageNumber,
    wt: 'json',
    defType: 'edismax',
    qf: titleField + "^" + 
        titleWeight + " " +
        categoryField + "^" +
        categoryWeight + " " +
        brandField + "^" +
        brandWeight,

    stopwords: true,
    lowercaseOperators: true
  };
  // if there is a brand name, add that to the query
  if(brandName) {
    prodQueryParam.fq = "BrandExact=" + brandName;

  }
  $.get(
    // add term to query
    baseURL,
    prodQueryParam,
    function(rawQueryResult) { 
      var queryResult = JSON.parse(rawQueryResult);
      callback(queryResult.response.docs); 
    }
  );    
}

/**
 * This function is the entry point for querying lucene from front-end.
 * @param {String} queryTerm 	query term entered by the user
 * @param {String} brandNames  the name of the brand
 * @param {Object} queryMode 	different query mode. Right now it does
 * not do anything
 */
function getBrandCount(queryTerm, pageNumber, brandNames, queryMode, callback) { 

  var queryObj = {
    q: queryTerm,
    wt: 'json',
    defType: 'edismax',
    start: 0, 
    end: 1, 
    qf: titleField + "^" + 
        titleWeight + " " +
        categoryField + "^" + 
        categoryWeight + " " +
        brandField + "^" +
        brandWeight,

    stopwords: true,
    lowercaseOperators: true
  };

  var str = $.param(queryObj);
  str += '&facet=true';
  for(var i = 0; i < brandNames.length; i++) {
    str += '&facet.query=ProductTitle:' + brandNames[i];
  }

  $.get(
    // add term to query
    baseURL + '?' + str,
    function(rawQueryResult) { 
      var queryResult = JSON.parse(rawQueryResult);
      callback(queryResult.facet_counts.facet_queries); 
    }
  );

}

/**
 * get a single item
 * @param {String} productID
 */ 
function getItem(productID, callback) {
  var queryObj = {
    q: 'PID:' + productID,
    wt: 'json',
  };
  $.get(
    // add term to query
    baseURL,
    queryObj,
    function(rawQueryResult) { 
      var queryResult = JSON.parse(rawQueryResult);
      callback(queryResult.facet_counts.facet_queries); 
    }
  );
  
}
