//var cartDetails;
var cartController = (function () {

    var cartDetails = {
        subTotal: 0,
        totalCost: 0,
        shippingCost: 50,

        promocode: ['JF10', 'JF11'],
        promodiscount: 0,
        cartItemsCount: 0,
        list: []
    }
    var editIem = function (id, size, price) {
        itemList[0].size = size;
        itemList[0].price = price;
    };


    return {

        getItemList: function (itemList) {

            /* calculate total item cost*/
            var sum = 0;

            itemList.shoppingCartItems.forEach(function (cur) {
                cartDetails.list.push(cur);

                sum += (cur.qty * cur.discountedprice);
            });

            cartDetails.subTotal = parseFloat(sum).toFixed(2);

            /* calculate shipping cost*/
            if (sum >= 30) {
                cartDetails.shippingCost = 0;
            } else {
                cartDetails.shippingCost = parseFloat(5.00).toFixed(2);
            }
            cartDetails.totalCost = parseFloat(cartDetails.subTotal + cartDetails.shippingCost).toFixed(2);

            cartDetails.cartItemsCount = cartDetails.list.length;

            return cartDetails;

        },

        updateCartdetails: function () {
            var sum = 0.00;
            cartDetails.list.forEach(function (cur) {

                sum += (cur.qty * cur.discountedprice);

            });

            cartDetails.subTotal = sum;
            /* calculate shipping cost*/
            if (sum >= 30) {
                cartDetails.shippingCost = 0;
            } else {
                cartDetails.shippingCost = 5;
            }
            var temp_sum = parseFloat(cartDetails.subTotal + cartDetails.shippingCost).toFixed(2);

            if (cartDetails.list.length > 0) {

                if (temp_sum > cartDetails.promodiscount) {

                    cartDetails.totalCost = parseFloat(temp_sum - cartDetails.promodiscount).toFixed();
                } else {
                    cartDetails.totalCost = temp_sum;
                }
            } else {
                cartDetails.shippingCost = 0;
                cartDetails.totalCost = 0;
                cartDetails.promodiscount = 0;
            }

            return cartDetails;
        },

        deleteItem: function (productId) {
            var idx;

            cartDetails.list.forEach(function (cur, i) {
                if (productId === cur.code) {
                    idx = i;
                }
            });

            if (idx !== -1) {
                cartDetails.list.splice(idx, 1);
            }
            cartDetails.list;

            cartDetails.cartItemsCount = cartDetails.list.length;

            if (cartDetails.cartItemsCount === 0) {
                cartDetails.shippingCost = 0;
                cartDetails.subTotal = 0;
                cartDetails.promodiscount = 0;
            }
        },

        getEditItem: function (productId) {
            var item;

            cartDetails.list.forEach(function (cur, i) {
                if (productId === cur.code) {
                    idx = i;
                }
            });

            if (idx !== -1) {
                item = cartDetails.list[idx];
            }

            return item;
        },

        postEditItem: function (editdata) {
            var editedItem;
            var code = editdata.code;
            cartDetails.list.forEach(function (cur) {
                if (code === cur.code) {
                    cur.qty = editdata.qty;
                    cur.size = editdata.size;
                    editedItem = cur;
                }
            });
            return editedItem;
        },

        checkPromoCode: function (codeSelected) {
            var isValid = false;
            cartDetails.promocode.forEach(function (cur) {
                if (cur === codeSelected) {
                    isValid = true;
                }
            });
            if (isValid) {

                cartDetails.promodiscount = 7;
            }
            return isValid;
        },

        getCartDetails: function () {

            return cartDetails;
        }

    };


})();

var UIController = (function () {
    var DOMstrings = {
        listproducts: '.box_shopping_cart',
        delete_btn: '#delete-btn',
        editbtn: '#edit_btn',
        totalBill: '#totalBill',
        subTotal: '#subTotal',
        delete_icon: '#delete-icon',
        cartmessage: ".cart-message",


        // Promotion code
        promocode: '#promo-code',
        promodiscount: '#promodiscount',
        btnpromoapply: '#btn-promo-apply',
        promocodemessage: '#promocode-message',
        btn_promo_apply: '#btn-promo-apply',
        promorowtext: '.promo_row_text',
        promorowvalue: '.promo_row_value',
        cartItemsCount: '#cartItemsCount',
        promcode_applied: '#promcode_applied',

        // shipping cost
        shippingCost: '#shippingCost',
        textshippingcostinfo: '#text-shippingcost-info',

        // Edit 
        popupclose: '#popupclose',
        overlay: '#overlay',
        editpopup: '#editpopup',
        edit_name: '#edit_name',
        edit_price: '#edit_price',
        edit_qty: '#edit_qty',
        edit_size: '#edit_size',
        edit_code: '#edit_code',
        edit_image: '#edit_image',
        editSubmit: '#editSubmit'


    };

    return {
        addListItems: function (product) {

            /* Add Cart Items  to UI  */

            var html, newHtml;
            html = '<div id="' + product.code + '">';
            html += '<div class="row box_shopping_cart_item" >';
            //  html += '<div class="row  area_border">';
            html += '<div class="col span-9-of-12">';
            html += '<div class="row">';
            html += '<div class="col span-3-of-8">';

            html += '<img class="itemImage" src="%imgSource%" alt="%alt%">';
            html += '</div>';
            html += '<div class="col span-5-of-8">';
            html += '<div class="box_item desc">';

            //html += '<h4 class"imp_text">%name%</h4>';
            html += '<span class"">%name%</span>';
            html += '<span>Style#:%style%</span>';
            html += '<span>Colour:%Colour%</span>';
            html += '</div>';

            html += '<div class="action-buttons">';
            html += '<span class="btn" id="edit_btn">Edit</span>';
            html += '<span class="separator">&verbar;</span>';
            html += '<span class="btn" id="delete-btn">';

            html += '<i class="ion-close" id="delete-icon"></i>';
            html += 'Remove</span>';

            html += '<span class="separator">|</span>';
            html += '<span class="btn">Save for Later</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col span-3-of-12">';
            html += '<div class="row">';
            html += '<div class="col span-1-of-3 box_item">';
            html += '<span>%size%</span>';
            html += '</div>';
            html += '<div class="col span-1-of-3 box_item">';
            html += '<input type="text" id="%qtyid%" name="QTY" value="%qty%" class="item-qty">';
            html += '</div>';
            html += '<div class="col span-1-of-3 box_item">';
            if (product.discountedprice === product.price) {

                html += '<div class="item-price"><span><sup>$</sup>%price%</span>';
            } else {
                html += '<div class="item-price "><span class="text-muted"><sup>$</sup><strike>%price%</strike></span>';
                html += '<p><sup>$</sup>%discountedprice%</span></p>'
            }

            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            newHtml = html;
            newHtml = newHtml.replace('%imgSource%', product.imgSource);
            newHtml = newHtml.replace('%style%', product.code);
            newHtml = newHtml.replace('%name%', product.name);
            newHtml = newHtml.replace('%alt%', product.name);
            newHtml = newHtml.replace('%Colour%', product.Colour);

            newHtml = newHtml.replace('%price%', product.price.toFixed(2));

            newHtml = newHtml.replace('%qty%', product.qty);
            newHtml = newHtml.replace('%qtyid%', product.code + "_qty");
            newHtml = newHtml.replace('%size%', product.size);
            newHtml = newHtml.replace('%sizeid%', product.code + "_size");
            newHtml = newHtml.replace('%product%', product);
            //discountedprice
            newHtml = newHtml.replace('%discountedprice%', product.discountedprice);

            document.querySelector(DOMstrings.listproducts).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {

            var el = document.getElementById(selectorID);

            el.parentNode.removeChild(el);
            //cart-message

        },

        updatecarttotal: function (cart) {

            document.querySelector(DOMstrings.totalBill).innerHTML = cart.totalCost;

            document.querySelector(DOMstrings.subTotal).innerHTML = cart.subTotal;

            //var promorowSelector = document.querySelector(DOMstrings.promorowtext + " , " + DOMstrings.promorowvalue);

            if (cart.promodiscount === 0) {
                document.querySelector(DOMstrings.promorowtext).style.display = 'none';
                document.querySelector(DOMstrings.promorowvalue).style.display = 'none';
                //promorowSelector.style.display = 'none';
                // document.querySelector(DOMstrings.promorowvalue).style.display = 'none';

            } else {
                // promorowSelector.style.display ='block';
                document.querySelector(DOMstrings.promorowtext).style.display = 'block';
                document.querySelector(DOMstrings.promorowvalue).style.display = 'block';
            }

            document.querySelector(DOMstrings.promodiscount).innerHTML = cart.promodiscount;

            document.querySelector(DOMstrings.cartItemsCount).innerHTML = cart.cartItemsCount;

            document.querySelector(DOMstrings.totalBill).innerHTML = cart.totalCost;


            if (cart.shippingCost === 0 && cart.cartItemsCount === 0) {
                // var shippingCostRowSelector = document.querySelector(DOMstrings.textshippingcostinfo + ',' + DOMstrings.shippingCost);

                //shippingCostRowSelector.style.display = 'none';
                document.querySelector(DOMstrings.textshippingcostinfo).style.display = 'none';
                document.querySelector(DOMstrings.shippingCost).style.display = 'none';
                // document.querySelector().style.display ='none';
            } else if (cart.shippingCost === 0) {

                document.querySelector(DOMstrings.shippingCost).innerHTML = '<span>FREE</span>';

                var shippingInfohtml = '<span class="billing_text_info">You qualify for free shipping</span>';

                shippingInfohtml += '<span class="billing_text_info">because your order is over $50*</span>';

                document.querySelector(DOMstrings.textshippingcostinfo).innerHTML = shippingInfohtml;
                //textshippingcostinfo

            } else {

                document.querySelector(DOMstrings.shippingCost).innerHTML = '<sup>$</sup>' + cart.shippingCost;
                document.querySelector(DOMstrings.textshippingcostinfo).innerHTML = '';
            }
            if (cart.list.length == 0) {
                document.querySelector(DOMstrings.cartmessage).style.display = 'block';

            }

        },

        ShowEditPopUp: function (product) {

            // console.log(product);

            var overlay = document.querySelector(DOMstrings.overlay);
            var editpopup = document.querySelector(DOMstrings.editpopup);

            // open Popup on Edit
            document.querySelector(DOMstrings.edit_name).textContent = product.name;
            document.querySelector(DOMstrings.edit_price).textContent = product.price.toFixed(2);
            document.querySelector(DOMstrings.edit_code).value = product.code;

            document.querySelector(DOMstrings.edit_image).src = product.imgSource;
            document.querySelector(DOMstrings.edit_image).alt = product.name;
            // document.querySelector(DOMstrings.edit_size).value = product.size;
            //document.querySelector(DOMstrings.edit_qty).value = product.qty;

            overlay.style.display = 'block';
            editpopup.style.display = 'block';
        },
        updateEditItem: function (editedItem) {
            // Update the UI
            var qtyselector = "#" + editedItem.code + "_qty";
            var sizeselector = "#" + editedItem.code + "_size";
            document.querySelector(qtyselector).value = editedItem.qty;
            document.querySelector(sizeselector).value = editedItem.size;

        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

var appController = (function (cartCtrrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();

    //Delete functionality
    var ctrlDeleteItem = function (productId) {

        // delete from data structure
        cartCtrrl.deleteItem(productId);

        //delete from UI
        UICtrl.deleteListItem(productId);

        //update the total cost after deleting 

        var cart = cartCtrrl.updateCartdetails();

        UICtrl.updatecarttotal(cart);

        // if no items left show no items found



    };

    // Edit functionality

    var getEditShoppingCart = function (productId) {
        var xmlhttp = new XMLHttpRequest();
        var getEditParam = productId;

        xmlhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                var item;
                var cart = JSON.parse(this.responseText);

                cart.shoppingCartItems.forEach(function (cur) {
                    if (cur.code === productId) {
                        item = cur;
                    }
                })
                UICtrl.ShowEditPopUp(item);

            }
        };

        xmlhttp.open("GET", "product-list.txt", true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(getEditParam);

    };

    var postEditShoppingCart = function () {
        //post the data as json
        var editFormData = {};
        var sizeNewVal = document.querySelector(DOM.edit_size).value;
        var qtyNewVal = document.querySelector(DOM.edit_qty).value;


        var codeVal = document.querySelector(DOM.edit_code).value;

        //update the cart item and recalculate
        var editdata = {
            size: sizeNewVal,
            qty: qtyNewVal,
            code: codeVal
        };
        // update cart item
        var editedItem = cartCtrrl.postEditItem(editdata);

        //update the main UI
        UICtrl.updateEditItem(editedItem);

        //update the totals
        UICtrl.updatecarttotal(cart);
    };

    var closePopUp = function () {
        //var closePopup = document.getElementById(DOM.popupclose);
        var overlay = document.querySelector(DOM.overlay);
        var popup = document.querySelector(DOM.editpopup);

        // Close Popup Event

        overlay.style.display = 'none';
        popup.style.display = 'none';

    };

    // Set up event Listeners
    var setupEventListeners = function () {

        var el = document.querySelector(DOM.listproducts);

        if (el) {
            addEventListener('click', function (event) {

                var targetId = "#" + event.target.id;
                if (event.target.id !== "overlay") {
                    var elId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;

                    if (targetId == DOM.editbtn) {

                        // editItem(elId);
                        getEditShoppingCart(elId);

                    } else if (targetId == DOM.delete_btn || targetId == DOM.delete_icon) {
                        if (targetId == DOM.delete_icon) {
                            elId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                            ctrlDeleteItem(elId);
                        }

                    }
                }
            });
        }

        var applyPromocode = function () {

            //document.querySelector(DOMstrings.promocodemessage).innerHTML = '';
            var DOM = UICtrl.getDOMstrings();
            // is promo code valid  
            var codeSelected = document.querySelector(DOM.promocode).value;



            var promoCodeSelector = document.querySelector(DOM.promocodemessage);
            if (codeSelected != "") {
                var isValid = cartCtrrl.checkPromoCode(codeSelected);
                document.querySelector(DOM.promocode).classList.add('red-focus');

                var promoCodeValField = document.querySelector(DOM.promocode);
                var promoApplyBtn = document.querySelector(DOM.btn_promo_apply);
                //if valid update the pricing
                if (isValid) {
                    promoCodeValField.classList.remove("red-focus");
                    var cart = cartCtrrl.updateCartdetails();

                    UICtrl.updatecarttotal(cart);

                    // freeze the Apply Promo button if code succesfully Applied
                    promoCodeValField.disabled = true;

                    promoApplyBtn.disabled = true;

                    promoCodeSelector.innerHTML = "";
                    //promcode_applied
                    document.querySelector(DOM.promcode_applied).value = codeSelected;
                } else {
                    document.querySelector(DOM.promocodemessage).classList.add("red");

                    document.querySelector(DOM.promocode).classList.add('red-focus');
                    // give message to the user
                    promoCodeSelector.innerHTML = "Invalid Promo code.";
                    promoCodeSelector.classList.add("red");
                    promoCodeValField.classList.add('red-focus');

                }
            } else {
                promoCodeSelector.innerHTML = "Please enter the code.";
            }
            setTimeout(function () {
                promoCodeSelector.innerHTML = "";
                promoCodeSelector.classList.remove("red");
                promoCodeValField.classList.remove("red-focus");
            }, 5000)
        };

        // promo code click event handler
        document.querySelector(DOM.btnpromoapply).addEventListener('click', applyPromocode);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                if (document.querySelector(DOM.promocode).value !== "") {
                    applyPromocode();
                }

            }
        });
        //popupclose
        document.querySelector(DOM.popupclose).addEventListener('click', closePopUp);
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target.id == "overlay") {
                closePopUp()
            }
        }

        document.querySelector(DOM.editSubmit).addEventListener('click', postEditShoppingCart);
    };


    var bindShoppingCart = function () {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var products = JSON.parse(this.responseText);
                var cartDetails = cartCtrrl.getItemList(products);

                var items = cartDetails.list;

                cartDetails.list.forEach(function (cur) {

                    UICtrl.addListItems(cur);

                });
                UICtrl.updatecarttotal(cartDetails);
            }
        };

        xmlhttp.open("GET", "product-list.txt", true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send();

    };


    return {
        init: function () {
            bindShoppingCart();
            setupEventListeners();
        }
    }

})(cartController, UIController);

appController.init();
