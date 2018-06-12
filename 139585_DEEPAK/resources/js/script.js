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
    var calculateCart = function () {
        data.subtotal = 0;
        data.allItems.forEach(function (cur) {
            data.subtotal += (cur.discountprice * cur.quantity);
        });
        if (data.subtotal - data.promotion >= 50) {
            data.shipping = 0;
        } else {
            data.shipping = 3; // Fee for shipping
        }
        data.finalTotal = (data.subtotal - data.promotion) + data.shipping;
        console.log(data);
    }

    return {
        passJson: function (datajson) {
            data.allItems = datajson.cartitems;
            calculateCart();
            return data;
        },
        updateData: function (id) {
            var removeIndex = data.allItems.map(function (cur) {
                return cur.id;
            }).indexOf(parseInt(id));
            if (removeIndex > -1) data.allItems.splice(removeIndex, 1);
            console.log(data);
            calculateCart();
            return data;
            //            data.allItems.forEach(function (cur) {
            //                if(cur.id == id){
            //
            //                }
            //            });
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
        },
        updateCheckout: function (cal) {
            document.querySelector('.subtotal span').textContent = cal.subtotal;
            document.querySelector('.pcode span').textContent = cal.promotion;
            if (cal.shipping > 0) {
                document.querySelector('.shipcost span').textContent = cal.shipping;
            }
            document.querySelector('.finalTotal span').textContent = cal.finalTotal;
        },
        removeFromCart: function (id) {
            var el = document.querySelector('.itemid-' + id);
            if (el) el.parentNode.removeChild(el);
        }
    }

})();

/*  ----- GLOBAL APP CONTROLLER -----  */
var controller = (function (cartCtrl, UICtrl) {
    var datajson;
    var setupEventListners = function () {
        var calculation;
        document.querySelector('.cart-placeholder').addEventListener('click', function (event) {
            if (event.target.classList.contains('remove') && event.target.dataset.id) {
                UICtrl.removeFromCart(event.target.dataset.id);
                //update data
                calculation = cartCtrl.updateData(event.target.dataset.id);
                UICtrl.updateCheckout(calculation);
            }
        });
    }
    return {
        init: function () {
            var calculation;
            console.log('Application has Started.');
            //get Shopping cart details from server
            var data = httpGet('http://www.mocky.io/v2/5b1ed4a03100008a233ff9f6');
            datajson = JSON.parse(data);
            //Update Handlebar data
            UICtrl.renderHandlebar(datajson);
            calculation = cartCtrl.passJson(datajson);
            UICtrl.updateCheckout(calculation);
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
