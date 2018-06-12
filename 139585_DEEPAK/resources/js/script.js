//
//$(function () {
//    /* Handle Bar section */
//    var theTemplateScript = $("#address-template").html();
//    var theTemplate = Handlebars.compile(theTemplateScript);
//    var data = httpGet('https://www.mocky.io/v2/5b0cbbd6330000d529b40099');
//    var context = JSON.parse(data);
//    if (context.cartitems.length) {
//        $('.table-head tr th:eq(0) span').text(context.cartitems.length);
//    }
//    var theCompiledHtml = theTemplate(context);
//    $('.cart-placeholder').html(theCompiledHtml);
//
//
//    /* Modal section */
//    document.getElementsByClassName("close")[0].onclick = function () {
//        document.getElementById('myModal').style.display = "none";
//        document.getElementById('myModal').style.display = "0";
//    }
//});







/*  ----- CART CONTROLLER -----  */
var cartController = (function () {
    var data = {
        allItems: [],
        subtotal: 0,
        promotion: 0,
        shipping: 0,
        finalTotal: 0
    }
    var calculateCart = function(){
        data.allItems.forEach(function(cur) {
            data.subtotal += cur.discountprice + cur.quantity;
        });
    }

    return {
        passData: function (datajson) {
            data.allItems = datajson.cartitems;
            calculateCart();
        }
    }
})();


/*  ----- UI CONTROLLER -----  */
var UIController = (function () {

    return {
        renderHandlebar: function (data) {
            var theTemplateScript = $("#address-template").html();
            var theTemplate = Handlebars.compile(theTemplateScript);
            if (data.cartitems.length) {
                $('.table-head tr th:eq(0) span').text(data.cartitems.length);
            }
            var theCompiledHtml = theTemplate(data);
            $('.cart-placeholder').html('');
            $('.cart-placeholder').html(theCompiledHtml);
        }
    }

})();

/*  ----- GLOBAL APP CONTROLLER -----  */
var controller = (function (cartCtrl, UICtrl) {
    var datajson;
    var setupEventListners = function () {

    }
    return {
        init: function () {
            console.log('Application has Started.');
            //get Shopping cart details from server
            var data = httpGet('http://www.mocky.io/v2/5b1ed4a03100008a233ff9f6');
            datajson = JSON.parse(data);
            //Update Handlebar data
            UICtrl.renderHandlebar(datajson);
            cartCtrl.passData(datajson);
            //setup events
            setupEventListners();
        }
    }

})(cartController, UIController);

controller.init();

/* HTTP GET function*/
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
//        xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
//    xmlHttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    xmlHttp.send();
    return xmlHttp.responseText;
}