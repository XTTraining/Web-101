$(function () {
    /* Handle Bar section */
    var theTemplateScript = $("#address-template").html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var data = httpGet('https://www.mocky.io/v2/5b0cbbd6330000d529b40099');
    var context = JSON.parse(data);
    if (context.cartitems.length) {
        $('.table-head tr th:eq(0) span').text(context.cartitems.length);
    }
    var theCompiledHtml = theTemplate(context);
    $('.cart-placeholder').html(theCompiledHtml);


    /* Modal section */
    document.getElementsByClassName("close")[0].onclick = function () {
        document.getElementById('myModal').style.display = "none";
        document.getElementById('myModal').style.display = "0";
    }
});



function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
}
