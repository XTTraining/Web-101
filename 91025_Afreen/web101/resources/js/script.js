//Product Controller
var productController = (function () {

    //Mock products json
    var jsonData = '{"products":[' +
        '{"id" : 1,"title" : "Half Sleeves Plain T-Shirt","mainimage" : "resources/images/black-tshirt.jpg","thumbnailimage":"resources/images/black-tshirt-thumbnail.jpg","style":"MKS12378","color":"Black","size":"s","stock":10,"unitprice":200.00,"desc":""},' +
        '{"id" : 2,"title" : "Game Begins Short Sleeves Tee Power Puff Girls Print","mainimage" : "resources/images/pink-powerpuff-top.jpg","thumbnailimage":"resources/images/pink-powerpuff-top-thumbnail.jpg","style":"MKS56778","color":"Red","size":"m","stock":10,"unitprice":100.00,"desc":""},' +
        '{"id" : 3,"title" : "Aww Hunnie Embroidered Shirt","mainimage" : "resources/images/blue-shirt.jpg","thumbnailimage":"resources/images/blue-shirt-thumbnail.jpg","style":"MKS12378","color":"Black","size":"m","stock":10,"unitprice":250.00,"desc":""}' +
        ']}';

    //Mock coupons json    
    var jsonCoupons = '{"coupons":[' +
        '{"code":"JF10","cdvalue":"10%"},' +
        '{"code":"HAPPY20","cdvalue":"20%"},' +
        '{"code":"RUSH100","cdvalue":"100"}' +
        ']}';

    //creating public functions
    return {
        getProducts: function () {
            return JSON.parse(jsonData);
        },
        getCoupons: function () {
            return JSON.parse(jsonCoupons);
        },
        getProductById: function(pid) {
            var item= (JSON.parse(jsonData).products.filter(function(a) { return a.id === pid}))[0];
            //console.log(item);
            return item;
        }
    }
})();

//Cart Controller
var cartController = (function () {
    //function constructor
    var shoppingItem = function (id, title, thumbnail, style, color, unitprice, quantity, size, itemTotalPrice) {
        this.id = id;
        this.title = title;
        this.style = style;
        this.color = color;
        this.unitprice = unitprice;
        this.quantity = quantity;
        this.size = size;
        this.thumbnail = thumbnail;
        this.itemTotalPrice = itemTotalPrice;
    }

    var calculateItemPriceByQuantity = function (qty, unitprice) {
        return qty * unitprice;
    }

    function calculateTotal() {
        var sum = 0;
        data.cartItems.forEach(function (cur) {
            //console.log(cur.itemTotalPrice);            
            sum += parseFloat(cur.itemTotalPrice);            
        });
        
         //using tenary operator, change sum
         sum > 0? data.subTotal = sum.toFixed(2) : data.subTotal = sum;
       
        //data.subTotal = sum;
        if(data.discount.value !=='')
        {
            console.log(data.discount.value +' ' + data.discount.couponcode);
            calculateDiscount(data.discount.couponcode,data.discount.value);    
            //data.finalAmount = sum - data.discount.discountedAmount;
        }else {
            sum > 0? data.finalAmount = sum.toFixed(2) : data.finalAmount = sum;
            //data.finalAmount = sum;
        }
    }

    function calculateDiscount(couponcode, value) {
        //var pattern = new RegExp('\d+(\.\d+)?$');

        data.discount.couponcode = couponcode;
        data.discount.value = value;
        // if discount is percantage else number
        if ((value.indexOf('%')) > -1) {
            //data.discount.value = parseInt(value);
            //console.log(data.discount.value);
            discountedAmount = (parseInt(data.discount.value) / 100) * data.subTotal;
            //discountedAmount = discountedAmount.toFixed(2);
        } else {
            data.discount.value = parseInt(value);
            discountedAmount = data.discount.value.toFixed(2);
        }
        discountedAmount > 0? data.discount.discountedAmount = discountedAmount.toFixed(2): data.discount.discountedAmount=discountedAmount ;
        
        //data.finalAmount = data.subTotal - discountedAmount;
        var amount = data.subTotal - discountedAmount;
        amount > 0? data.finalAmount = amount.toFixed(2) : data.finalAmount = amount;        
    }

    var data = {
        cartItems: [],
        subTotal: 0,
        discount: {
            couponcode: '',
            value: '',
            discountedAmount: 0
        },
        finalAmount: 0
    }

    return {
        addItem: function (obj, quantity) {
            var newItem, itemPrice;

            itemTotalPrice = parseFloat(calculateItemPriceByQuantity(quantity, obj.unitprice)).toFixed(2);
            newItem = new shoppingItem(obj.id, obj.title, obj.thumbnailimage, obj.style, obj.color, obj.unitprice, quantity, obj.size, itemTotalPrice);
            data.cartItems.push(newItem);

            return newItem;
        },
        getCartItems: function () {
            return data.cartItems;
        },
        calculateAmount: function () {
            calculateTotal();
        },
        getTotal: function () {
            return {
                subTotal: data.subTotal,
                finalAmount: data.finalAmount,
                discountedAmount: data.discount.discountedAmount,
                couponcode: data.discount.couponcode
            }
        },
        applyCoupons: function (couponcode, couponvalue) {
            calculateDiscount(couponcode, couponvalue);
        },
        deleteItem: function(id) {
            var ids, index;                        
            ids = data.cartItems.map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            //console.log( 'deletem '+ index);
            if (index !== -1) {
                data.cartItems.splice(index, 1);
            }            
            //Calculate total again
            calculateTotal();
        },
        getItemsCount: function()
        {
            return Object.keys(data.cartItems).length;            
        }
        //,
        // getItemById: function(iid) {
        //     var item= data.cartItems.filter(function(a) { return a.id === iid})[0];
        //     //console.log(item);
        //     return item;
        // }
    }
})();

//UI Controller
var UIController = (function () {
    var DOMstrings = {
        inputPromoCode: '#promocode',
        btnApply: '#btnApply',
        sectionCart:'.section-shopping-cart',
        lblSubtotal: '.subtotal_amount',
        lblFinaltotal:'.final_amount',
        lblPromototal:'.promo_amount',
        lblPromoCode:'.promotion-title .code'
    }

    return {
        getDOMStrings: function () { return DOMstrings; },
        displayListItem: function (cartItems) {
            var html, newhtml, element;

            cartItems.forEach(function (obj, index) {
                //console.log(typeof (obj.itemTotalPrice));
                html = '<div class="row item-row" id="item-%id%"><div class="col1"><div class="col-cnt"><div class="item-thumbnail"><img src="%item_thumbnail%" alt="%title%"></div><div class="item-detail"><div class="item-desc"><p class="item-name"> %title% </p><label>Style #:</label><span class="style">%style%</span><br/><label>Colour:</label><span class="color">%color%</span></div><div class="item-links"><ul class="links"><li><a href="#" class="edit" id="edit">Edit</a>&nbsp;&nbsp;|<li><a href="#" id="remove">Remove</a> &nbsp;&nbsp;|</li><li><a href="#">Save for later</a></li></ul></div></div></div></div><div class="col2"><div class="col-cnt size"><p>%size%</p></div></div><div class="col3"><div class="col-cnt quantity"><p>%quantity%</p></div></div><div class="col4"><div class="col-cnt price"><span class="currency_symbol">$</span><span class="price">%price%</span></div></div></div>';
                newhtml = ''; //clear string <hr/>

                //Replace tokens
                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%item_thumbnail%', obj.thumbnail);
                newHtml = newHtml.replace(new RegExp('%title%', 'gi'), obj.title);
                newHtml = newHtml.replace('%style%', obj.style);
                newHtml = newHtml.replace('%color%', obj.color);
                newHtml = newHtml.replace('%size%', obj.size);
                newHtml = newHtml.replace('%quantity%', obj.quantity);
                newHtml = newHtml.replace('%price%', obj.itemTotalPrice);

                //element=
                document.querySelector(DOMstrings.sectionCart).insertAdjacentHTML('beforeend', newHtml);
            });
            document.querySelector(DOMstrings.sectionCart).insertAdjacentHTML('afterend', '<hr/><div style="clear:both"></div>');
        },
        deleteListItem: function(selectorID) {            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);            
        },
        clearFields: function () {
            document.querySelector(DOMstrings.lblSubtotal).textContent = 0;
            document.querySelector(DOMstrings.lblFinaltotal).textContent = 0;
            document.querySelector(DOMstrings.lblPromototal).textContent = 0;
            document.querySelector(DOMstrings.lblPromoCode).textContent = '';
            document.querySelector(DOM.inputPromoCode).textContent = '';
        },
        displayAmount: function (obj) {
            document.querySelector(DOMstrings.lblSubtotal).textContent = obj.subTotal;
            document.querySelector(DOMstrings.lblFinaltotal).textContent = obj.finalAmount;
            document.querySelector(DOMstrings.lblPromototal).textContent = obj.discountedAmount;
            document.querySelector(DOMstrings.lblPromoCode).textContent = obj.couponcode;            
        },
        displayNoItems: function() {
            var html='<div class="row"><p class="noItem">No item(s) in the cart</p></div>';
            document.querySelector(DOMstrings.sectionCart).insertAdjacentHTML('beforeend', html);
        }
    }
})();

//Global App Controller
var appController = (function (productCtrl, cartCtrl, uiCtrl) {
    var validationMessages = {
       invalidCoupon:'The promotion code %promocode% is invalid. Please enter valid promotion code!!!',
       emptyCoupon:'Please enter valid promotion code!!'
    }
    var qty, cartitems, total;
    qty = 1;

    var setupEventListeners = function () {
        var DOM = uiCtrl.getDOMStrings();

        document.querySelector(DOM.btnApply).addEventListener('click', function () {
            var inpPromo = document.querySelector(DOM.inputPromoCode).value;
            //alert(inpPromo);
            if (inpPromo !== "") {

                var couponValue='';
                productCtrl.getCoupons().coupons.forEach(function (element, index) {
                    
                    if (element.code.toUpperCase() === inpPromo.toUpperCase()) {                        
                        couponValue = element.cdvalue;
                    }
                });
                //console.log(couponValue);
                if (couponValue !== '') {
                    cartCtrl.applyCoupons(inpPromo, couponValue);
                    uiCtrl.displayAmount(cartCtrl.getTotal());
                } else {
                    openMessageModal(validationMessages.invalidCoupon.replace('%promocode%',inpPromo));
                }

            } else {
                openMessageModal(validationMessages.emptyCoupon);
            }
            
            document.querySelector(DOM.inputPromoCode).value="";
        });

        // edit or delete items
        document.querySelector(DOM.sectionCart).addEventListener('click', ctrlEditOrDeleteItem);

        //closing edit modal
        document.querySelector('.modal .close').addEventListener('click', function (event) {            
            document.querySelector('.modal').style.display = 'none';
        });

        //closing error modal        
        document.querySelector('.errModal .close').addEventListener('click', function () {
            document.querySelector('.errModal').style.display = 'none';
        });
    };

    function openMessageModal(message) {        
        document.querySelector('.errModal p').textContent = message;
        document.querySelector('.errModal .modal-content').style.width = '35%';
        document.querySelector('.errModal').style.display = 'block';
    }

    var ctrlEditOrDeleteItem = function (event) {
        var itemID, splitID, type, ID,total,count, editItem;
        editItem='';        
        itemID= event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id; //need to find optimized way       
        //console.log(event.target.id);

        if (itemID && event.target.id == "remove") {

            //item-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
           // console.log(ID);

            // 1. delete the item from the data structure
            cartCtrl.deleteItem(ID);

            // 2. Delete the item from the UI
            uiCtrl.deleteListItem(itemID);

            // 3. Update and show the new amount                      
            total = cartCtrl.getTotal();
            uiCtrl.displayAmount(total);

            //4. Display no items content on the UI
            if (cartCtrl.getItemsCount() < 1 )
            {
                console.log('no items left');
                uiCtrl.displayNoItems();
            }
           
        }
        if (itemID && event.target.id == "edit") {
            //Clear row before opening edit window for another item
            var elem = document.querySelector('.modal .row');
            //console.log(elem);
            if(elem !== null) { elem.parentNode.removeChild(elem) }
            //item-1
            splitID = itemID.split('-');            
            ID = parseInt(splitID[1]);
            editItem=''
            editItem= productCtrl.getProductById(ID);//cartCtrl.getItemById(ID);
            openEditOverlay(editItem);                        
        }
    };
    
    function openEditOverlay(item) {        
        var editHtml='<div class="row"><div class="editoverlay-detail"><p class="item-name">%title%</p><label>Size :</label><span class="size">%size%</span><div class="editoverlay-price"><span class="currency_symbol">$</span><span class="price">%price%</span></div></div><div class="editoverlay-image"><img src="%mainimage%" alt="%title%"></div></div>';
        var newHtml='';
        //Replace tokens        
        newHtml = editHtml.replace('%mainimage%', item.mainimage);
        newHtml = newHtml.replace(new RegExp('%title%', 'gi'), item.title);        
        newHtml = newHtml.replace('%size%', item.size);        
        newHtml = newHtml.replace('%price%', item.unitprice);
        //console.log(newHtml);
        document.querySelector('.modal .modal-content').insertAdjacentHTML('beforeend', newHtml);

        document.querySelector('.modal p').textContent = "Edit to be implemented further...";
        document.querySelector('.modal').style.display = 'block';
    }
    
    function Close() {        
        document.body.removeChild(document.getElementById("myModal"));
    }

    var generateMockCart = function() {
        //1. Get product item from json (mock)
        var objProds = productCtrl.getProducts();
        
        //2. Add items into cart    
        objProds.products.forEach(function (element, index) {
            cartCtrl.addItem(element, qty);
        });

        //3. Calculate total
        cartCtrl.calculateAmount();

        //4. Return calculated total
        total = cartCtrl.getTotal();

        //5. Display cart on the page
        cartitems = cartCtrl.getCartItems();
        uiCtrl.displayListItem(cartitems);
        uiCtrl.displayAmount(total);
    }

    return {

        init: function () {
            console.log('Application started');                      
            generateMockCart();            
            setupEventListeners();
        }
    }

})(productController, cartController, UIController);
// Open edit overlay

appController.init();