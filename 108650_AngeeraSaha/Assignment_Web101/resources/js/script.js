// The Shopping Controller
var shoppingController = (function() {
     var Product = function(id, description, style, colour, size, quantity, oldPrice, price, unitPrice, image) {
        this.id = id;
        this.description = description;
        this.style = style;
        this.colour = colour;
        this.size = size;
        this.quantity = quantity;
        this.oldPrice = oldPrice;
        this.price = price;
        this.unitPrice = unitPrice;
        this.image = image;
    };
    
    var data = {
        allItems : {
            prod: []
        },
        promoCode: '',
        promoAmount: 0,
        subTotal: 0,
        estimatedTotal: 0
        
    };
    
    var calculateTotal = function() {
        var sum = 0;
        data.allItems.prod.forEach(function(cur) {
            sum = parseFloat(sum + cur.price);
            console.log('calculateTotal() :' + cur.price);
            console.log('calculateTotal() sum:' + sum);
        });
        data.subTotal = sum;
        console.log(data.subTotal);
    };
    
    return {
        addProdItem: function(obj) {
            var newItem, ID;
            
            //Create new ID
            if(data.allItems.prod.length > 0) {
               ID = data.allItems.prod[data.allItems.prod.length - 1].id + 1;  
            } else {
                ID = 0;
            }
            
            //create a new item
            newItem = new Product(ID, obj.description, obj.style, obj.colour, obj.size, obj.quantity, obj.oldPrice, obj.price, obj.unitPrice, obj.image);
            
            //Push the new item into our datastructure
            data.allItems.prod.push(newItem);
            
            //Return the new element
            return newItem;
        },
        addItem: function(obj) {
            data.promoCode = obj.allItems.promoCode;
            data.promoAmount = obj.allItems.promoAmount;
        },
        
        addEnteredPromoCode: function(obj) {
            data.promoCodeEnter = obj.promoCode;
        },
        
        
        getItemForOverlay: function(id) {
            var ids, index, obj;
            
            ids = data.allItems.prod.map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            obj = data.allItems.prod[index];
            
            return obj;
        },
        
        deleteItem: function(id) {
            var ids, index;
            
            ids = data.allItems.prod.map(function(current) {
                return current.id;
            });
            
            index = ids.indexOf(id);
            
            if(index !== -1) {
                data.allItems.prod.splice(index, 1);
            }
        },
        
        updateData: function(id, price, quantity, size) {
            var ids, index;
            
            ids = data.allItems.prod.map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            
            data.allItems.prod.forEach(function(cur) {
                if (cur.id == id) {
                    cur.size = size;
                    cur.quantity = quantity;
                    cur.price = parseFloat(price);
                    console.log('updatedata' + price);
                }
            });
            return (data);
        },
        
        calculatePrice: function() {
            // Calculate total income and expenses
             calculateTotal();
                           
            // Calculate estimated total
             if(data.promoAmount >0 && data.promoCode != "" && data.promoCode.length >0 && data.promoCodeEnter == data.promoCode ) {
                    var estimTotal = 0;
                    estimTotal = data.subTotal - data.promoAmount;
                    data.estimatedTotal = estimTotal;
                }
                console.log('Subtotal : ' + data.subTotal);
                console.log('estimatedTotal : ' + data.estimatedTotal);
            return data;
        },
        
        testing: function() {
            console.log(data);
        }
    }

})();

// The UI Controller    
var UIController = (function() {
    
    var DOMStrings = {
        containerItemSelected: '.item-selected',
        containerProducts: '.products',
        containerOverlay: '.overlay',
        selectQuantity: '.quantity',
        editBtn : '.button-solid',
        itemDeleteBtn: '.item-delete',
        inputType: '.add_promocode',
        applyBtn: '.btn-ghost'
    };
    
    var formatNumber = function(num) {
            var numSplit, int, dec;
            num =  Math.abs(num);
            num = num.toFixed(2);
            
            numSplit = num.split('.');
            int = numSplit[0];
        
            if (int.length > 3) {
                int = int.substr(0, int.length -3) + ',' + int.substr(int.length - 3, 3);
            }
            dec = numSplit[1];
            return int + '.' + dec;
        };
    
    return {
        getInput: function() {
            return {
                promoCode: document.querySelector(DOMStrings.inputType).value
            }
        },
        addListItem: function(obj) {
            var html, element, newHtml;
            
            // Create HTML string with placeholder text
                element = DOMStrings.containerItemSelected;
                if (!isNaN(obj.oldPrice) && obj.oldPrice > 0) {
                    html = '<li id="product-%id%"><div><div class="col span-5-of-8 item-material-details"><div class="col span-2-of-5 item-photo"><img src="%image%" alt="white shirt"></div><div class="col span-3-of-5 item-context"><div class="item-details"><p class="item-full-name">%description%</p><p>%style%</p><p>%colour%</p></div><div class="item-order-edit"><a class="edit-link item-edit" href="#popup1">Edit</a><div><a class="edit-link item-delete" href="#">X Remove</a></div><a class="edit-link last" href="#">Save for later</a></div></div></div><div><div class="col span-1-of-8 item-order-details"><div class="itemsize" id="size-%id%">%size%</div></div><div class="col span-1-of-8 item-order-details"><div class="box" id="quantity-%id%">%quantity%</div></div><div class="col span-1-of-8 item-order-details"><div class="price" id="price-%id%"><span><sup>$</sup></span><strike>%oldPrice%</strike><br><span><sup>$</sup></span>%price%</div></div></div></div><div class="border-solid"></div></li>';
                } else {
                    html = '<li id="product-%id%"><div><div class="col span-5-of-8 item-material-details"><div class="col span-2-of-5 item-photo"><img src="%image%" alt="black tee"></div><div class="col span-3-of-5 item-context"><div class="item-details"><p class="item-full-name">%description%</p><p>%style%</p><p>%colour%</p></div><div class="item-order-edit"><a class="edit-link item-edit" href="#popup1">Edit</a><div><a class="edit-link item-delete" href="#">X Remove</a></div><a class="edit-link last" href="#">Save for later</a></div></div></div><div><div class="col span-1-of-8 item-order-details"><div class="itemsize" id="size-%id%">%size%</div></div><div class="col span-1-of-8 item-order-details"><div class="box" id="quantity-%id%">%quantity%</div></div><div class="col span-1-of-8 item-order-details"><div class="price" id="price-%id%"><span><sup>$</sup></span>%price%</div></div></div></div><div class="border"></div></li>';
                }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%id%', obj.id);
            newHtml = newHtml.replace('%id%', obj.id);
            newHtml = newHtml.replace('%id%', obj.id);
            newHtml = newHtml.replace('%image%', obj.image);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%style%', obj.style);
            newHtml = newHtml.replace('%colour%', obj.colour);
            newHtml = newHtml.replace('%size%', obj.size);
            newHtml = newHtml.replace('%quantity%', obj.quantity);
            newHtml = newHtml.replace('%oldPrice%', formatNumber(obj.oldPrice));
            newHtml = newHtml.replace('%price%', formatNumber(obj.price));
            
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        addOverlayItem: function(obj) {
          var html, element, newHtml, sizeSelect, qtySelect;
            
          // Create HTML string with placeholder text
          element = DOMStrings.containerOverlay; 
            
          html = '<div class="popup" id="popup-item"><div class="col span-4-of-8 overlay-content"><div class="left-content"><div class="border"></div><div><p class="item-heading">%description%</p></div><div class="item-price"><span><sup>$</sup></span>%price%</div><div class="color-options"></div><div class="edit-item"><select class="button-ghost size" id="size-select"><option value="sizes">Size</option><option value="small">S</option><option value="medium">M</option><option value="large">L</option></select><select class="quantity" id="qty-select"><option value="qty:">Qty:</option><option value="one">1</option><option value="two">2</option><option value="three">3</option></select></div><div class="overlay-solid"><a class="button-solid" href="#">Edit</a></div><div class="see-prod-details"><a class="see" href="#">See product details</a></div></div></div><div class="col span-4-of-8 overlay-img"><div class="right-content"><img src="%image%" alt="black tee"></div></div><a class="close" href="#"><img src="resources/img/close.png" alt="close"></a><input type="hidden" id="unitprice" name="unitPrice" value="%unitPrice%"><input type="hidden" id="id" name="itemId" value="%id%"></div>'; 
            
          // Replace the placeholder text with some actual data
            newHtml = html.replace('%description%', obj.description);
            newHtml = newHtml.replace('%image%', obj.image);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%price%', formatNumber(obj.price));
            newHtml = newHtml.replace('%unitPrice%', formatNumber(obj.unitPrice));
            newHtml = newHtml.replace('%id%', obj.id);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            sizeSelect = document.getElementById("size-select");
            qtySelect = document.getElementById("qty-select");
            
            for (var i = 0; i < sizeSelect.options.length; i++) {
                if (sizeSelect.options[i].text == obj.size) {
                    sizeSelect.selectedIndex = i;
                    break;
                }
            }
            for (var i = 0; i < qtySelect.options.length; i++) {
                if (qtySelect.options[i].text == obj.quantity) {
                    qtySelect.selectedIndex = i;
                    break;
                }
            }
            
        },
        
        deleteOverlayItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        
        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },
        
        updateItemPrice: function() {
            var qty, size, qtyselect, sizeselect, unitprice, updatedPrice;
            qtyselect = document.getElementById("qty-select");
            qty = qtyselect.options[qtyselect.selectedIndex].text;
            sizeselect = document.getElementById("size-select");
            size = sizeselect.options[sizeselect.selectedIndex].text;
            unitprice = document.getElementById("unitprice").value;
            updatedPrice = parseFloat(unitprice * qty);
            var html_to_insert = "<span><sup>$</sup></span>";
            document.querySelector('.item-price').textContent = formatNumber(updatedPrice);
            document.querySelector('.item-price').insertAdjacentHTML('afterbegin', html_to_insert);
        },
        
        displayOrderChanges: function(id, obj) {
            var sizeid, quantityid, priceid;
            sizeid = 'size-'+id;
            quantityid = 'quantity-'+id;
            priceid = 'price-'+id;
            
            ids = obj.allItems.prod.map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            
            obj.allItems.prod.forEach(function(cur) {
                if (cur.id == id) {
                    document.getElementById(sizeid).innerHTML = cur.size;
                    document.getElementById(quantityid).innerHTML = cur.quantity;
                    document.getElementById(priceid).innerHTML = cur.price;
                    console.log(cur.price);
                }
            });
            var html_to_insert = "<span><sup>$</sup></span>";
            document.getElementById(priceid).insertAdjacentHTML('afterbegin', html_to_insert);
        },
        
        displayTotalPrice: function(obj) {
            var html_to_insert = "<span><sup>$</sup></span>";
            document.getElementById("subtotal").innerHTML = formatNumber(obj.subTotal);
            document.getElementById("subtotal").insertAdjacentHTML('afterbegin', html_to_insert);
            
            if(obj.promoCodeEnter == obj.promoCode) {
                var str = "promotion code <strong>%code%</strong> applied";
                var newstr = str.replace('%code%', obj.promoCode);
                document.getElementById("promcode").innerHTML = newstr;
                
                var html_string = "<span>- <sup>$</sup></span>";
                document.getElementById("promoamt").innerHTML = formatNumber(obj.promoAmount);
                document.getElementById("promoamt").insertAdjacentHTML('afterbegin', html_string);
            } else {
                var str = "promotion code <strong>%code%</strong> applied";
                var newstr = str.replace('%code%', '---');
                document.getElementById("promcode").innerHTML = newstr;
                
                var html_string = "<span>- <sup>$</sup></span>";
                document.getElementById("promoamt").innerHTML = '0';
                document.getElementById("promoamt").insertAdjacentHTML('afterbegin', html_string);
            }
            
            if(obj.promoCodeEnter == obj.promoCode) {
                var html = "<strong><span><sup>$</sup></span>";
                document.getElementById("estimate-total").innerHTML = formatNumber(obj.estimatedTotal);
                document.getElementById("estimate-total").insertAdjacentHTML('afterbegin', html);
            } else {
                var html = "<strong><span><sup>$</sup></span>";
                document.getElementById("estimate-total").innerHTML = formatNumber(obj.subTotal);
                document.getElementById("estimate-total").insertAdjacentHTML('afterbegin', html);
            }
            
            
            
        },
        
        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();

var controller = (function(shoppingCtrl, UICtrl) {
{
    var setupEventListenrs = function() {
            var DOM = UICtrl.getDOMStrings();
            document.querySelector(DOM.containerProducts).addEventListener('click', ctrlDisplayOverlay);
            document.querySelector(DOM.containerProducts).addEventListener('click', ctrlDeleteItem);
            document.querySelector(DOM.containerOverlay).addEventListener('click', ctrlDeleteOverlay);
            document.querySelector(DOM.applyBtn).addEventListener('click', getInput);
                
    };
	//Read json data
	var ctrlJsonReadItem = function() {
       var  newItem;
       // 1. Get the data from json
             var json = '{"allItems": {"prod": [{"id":0,"description":"Solid Green Cotton Tshirt","style":"Style #: MS|3KT1906","colour":"Colour:Blue","size":"S","quantity":1,"oldPrice":0,"price":11.00,"unitPrice":11.00,"image":"resources/img/capture1.png"},{"id":1,"description":"Pink rainbow print girls tee","style":"Style #: MS|3KT1906","colour":"Colour:Gray","size":"S","quantity":1,"oldPrice":0,"price":17.00,"unitPrice":17.00,"image":"resources/img/capture2.png"},{"id":2,"description":"Blue flower pattern shirt","style":"Style #: MS|3KT1906","colour":"Colour:Blue","size":"S","quantity":1,"oldPrice":21.00,"price":9.00,"unitPrice":9.00,"image":"resources/img/capture4.png"}],"promoCodeEnter":"","promoCode":"jf 10","promoAmount":7.00,"subTotal": 0,"estimatedTotal":0}}';
             
             var data = JSON.parse(json);
            
            //Add product items in the prod array of data object
            data.allItems.prod.forEach(function(cur, index, array) {
                newItem = shoppingCtrl.addProdItem(cur);
                UICtrl.addListItem(newItem);
            });
            
            //Add promocode and promoAmount
            shoppingCtrl.addItem(data);
        
            //Calculate total price
            
            CalculateTotalPrice();
            console.log(data);
            console.log(data.allItems.promoCode);
            
    };
    //Get promocode input
    
    var getInput = function () {
        
        input = UICtrl.getInput();
        shoppingCtrl.addEnteredPromoCode(input);
        CalculateTotalPrice();
    }
    
    //Display Overlay to Edit selection
    var ctrlDisplayOverlay = function(event) {
        var itemID, splitID, ID, obj;
        var DOM = UICtrl.getDOMStrings();
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        splitID = itemID.split('-');
        ID = parseInt(splitID[1]);
        
        //Get the item for Overlay
        obj = shoppingCtrl.getItemForOverlay(ID);
        
        //Add item to Overlay to the UI
        UICtrl.addOverlayItem(obj);
        
        document.querySelector(DOM.selectQuantity).addEventListener('change', UICtrl.updateItemPrice);
        document.querySelector(DOM.editBtn).addEventListener('click', updatedData);
        
    };
    
    //Delete Overlay item from UI 
    var ctrlDeleteOverlay = function(event) {
        var itemID, splitID, type, ID;
       
       itemID = event.target.parentNode.parentNode.id;
        if (itemID) {
           UICtrl.deleteOverlayItem(itemID);
        }
    };
    
	//Edit data
	var updatedData = function(event) {
        var id, price, size, quantity, qtyselect, sizeselect, obj;
        
        //Get Input 
            id = document.getElementById("id").value;
            price = document.querySelector('.item-price').textContent;
            price = price.replace('$', '');
            qtyselect = document.getElementById("qty-select");
            quantity = qtyselect.options[qtyselect.selectedIndex].text;
            sizeselect = document.getElementById("size-select");
            size = sizeselect.options[sizeselect.selectedIndex].text;
            
            //Update the data object
            obj = shoppingCtrl.updateData(id, price, quantity, size);
            
            // Update and show the new price totals
            CalculateTotalPrice();
        
            //Display changes on UI
            UICtrl.displayOrderChanges(id, obj);
        
            //Remove overlay after edit
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
            if (itemID) {
               UICtrl.deleteOverlayItem(itemID);
            }
        
            
       
   };
	//Calculate total price
	var CalculateTotalPrice = function() {
        
        // 1. Calculate the price
            var obj = shoppingCtrl.calculatePrice();
            //console.log(obj); 
       
       // 2. Display the totals on the UI
       
        UICtrl.displayTotalPrice(obj);
   };
    
	//Remove selected item
    var ctrlDeleteItem = function(event) {
       var itemID, splitID, type, ID;
       
       itemID = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
       
        if (itemID) {
           splitID = itemID.split('-');
           ID = parseInt(splitID[1]);
           
           // 1. Delete the item from the data structure
                
             shoppingCtrl.deleteItem(ID);
           
           // 2. Delete the item from the UI
            
            UICtrl.deleteListItem(itemID);
           
           // 3. Update and show the new price totals
           
            CalculateTotalPrice();
        }
       };
       
       return {
        init: function() {
            console.log("Application has stated");
            
            ctrlJsonReadItem();
            setupEventListenrs();
        }
    }
   }
})(shoppingController, UIController);

controller.init();


























