
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

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function populate_brand(result) {
    var htmlAll = '<div id="sidebar_brand">';
    htmlAll += '<h3>Brand</h3>';
    brands = getSortedKeys(result);
    for (var i in brands) {
        htmlAll += '<li><a href="products.html">' + brands[i].replace("Brand:","") + ' (' + result[brands[i]] + ')</a></li>'
    }
    htmlAll += '</br>';
	htmlAll += '</ul></div>';
    $("#sidebar_brand").replaceWith(htmlAll);
}

function populate_category(result) {
    var htmlAll = '<div id="sidebar_category">';
    htmlAll += '<h3>Category</h3>';    
    categories = getSortedKeys(result);
    for (var i in categories) {
        htmlAll += '<li><a href="products.html">' + categories[i].replace("Category:","") + ' (' + result[categories[i]] + ')</a></li>'
    }
    htmlAll += '</br>';
	htmlAll += '</ul></div>';
    $("#sidebar_category").replaceWith(htmlAll);
}

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
    qf: "ProductTitle^3 Brand^0.2 Category^1.2 ReviewTitle^0.5 ProductTitleExact^4 BrandExact^0.2 CategoryExact^7",
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
      var brands = getAllBrandNames(queryResult.response.docs);
      var categories = getAllCategoryNames(queryResult.response.docs);
      getBrandCount(queryTerm, brands, null, function(result) {populate_brand(result)});
      getCategoryCount(queryTerm, categories, null, function(result) {populate_category(result)});
      callback(queryResult.response.docs); 
    }
  );    
}

function getAllBrandNames(queryResult) {
    var names = [];
    var uniqueNames = [];
    for (var i=0; i<queryResult.length; i++) {
        brand = queryResult[i].Brand;
        brand = brand.replace(":","");
        if (brand) names.push(brand);
    }
    $.each(names, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    return uniqueNames;
}

function getAllCategoryNames(queryResult) {
    var names = [];
    var uniqueNames = [];
    for (var i=0; i<queryResult.length; i++) {
        category = queryResult[i].Category;
        if (category) names.push(category);
    }
    $.each(names, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
    return uniqueNames;
}

/**
 * This function is the entry point for querying lucene from front-end.
 * @param {String} queryTerm 	query term entered by the user
 * @param {String} brandNames  the name of the brand
 * @param {Object} queryMode 	different query mode. Right now it does
 * not do anything
 */
function getBrandCount(queryTerm, brandNames, queryMode, callback) { 
    
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
    str += '&facet.query=Brand:' + brandNames[i];
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

function getCategoryCount(queryTerm, categoryNames, queryMode, callback) { 

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
  for(var i = 0; i < categoryNames.length; i++) {
    str += '&facet.query=Category:' + categoryNames[i];
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
