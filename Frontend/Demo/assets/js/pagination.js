function clickPagination(pageNum, left_right) {
    if (left_right == 'left') {
        if (pageNum == 1) return;
        if (pageNum == 2) pageNum = 1;
    } else {
    var startNum = 1;
    if(pageNum>3) {
        startNum = pageNum - 2;
    }
    $('#pag1').text(startNum);
    $('#pag2').text(startNum+1);
    $('#pag3').text(startNum+2);
    $('#pag4').text(startNum+3);
    $('#pag5').text(startNum+4);
    $('#pag3').style = "background-color:rgb(100,150,250)";
    }
    var query = $('#keyword').html();
    getProducts(query, pageNum, null, null, function(result) {
         // call list here. populate the list here if you can
         console.log(result);
         populate(result);      
       });
}