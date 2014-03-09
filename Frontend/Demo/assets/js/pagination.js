function clickPagination(pageNum, maxNum) {
    var startNum = 1;
    if(pageNum>3) {
        startNum = pageNum - 2;
    }
    $('#pag1').text(startNum);
    $('#pag2').text(startNum+1);
    $('#pag3').text(startNum+2);
    $('#pag4').text(startNum+3);
    $('#pag5').text(startNum+4);
    if (pageNum == '1') {
        $('#pag1').css("background-color", "rgb(100,150,250)");
        $('#pag2').css("background-color", "");
        $('#pag3').css("background-color", "");
    } else if (pageNum == '2') {
        $('#pag1').css("background-color", "");
        $('#pag2').css("background-color", "rgb(100,150,250)");
        $('#pag3').css("background-color", "");
    } else {
        $('#pag1').css("background-color", "");
        $('#pag2').css("background-color", "");
        $('#pag3').css("background-color", "rgb(100,150,250)");
    }
    var query = $('#keyword').html();
    getProducts(query, pageNum, null, null, function(result) {
         // call list here. populate the list here if you can
         console.log(result);
         populate(result);      
    });
    $('body').scrollTop(0);
}