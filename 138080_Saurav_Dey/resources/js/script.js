//$(document).ready(function() {
//    
//   
//    
//    
//    /* Scroll on buttons */
//    $('.edit-btn').click(function () {
//       alert(1);
//    });
//    
//    
//});

var UIController = (function() {
    
    var DOMstrings = {
        editButtonType: '.edit-btn',
        cartItemType: '.manage-cart',
        overlayHidden: '.desktop-overlay-off',
        overlayHiddenClass: 'desktop-overlay-off',
        overlayShow:'.desktop-overlay-on',
        overlayShowClass:'desktop-overlay-on',
        closeButtonType:'.overlay-close',
        cartList:'.cart-list',
        subtotalValue:'.subtotal-value'
    };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.editButtonType).value, // Will be either inc or exp
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
    
})();

var controller = (function(UICtrl) {
    
    var DOM = UICtrl.getDOMstrings();
    var html="";
    var total=0;
    
    var bindCartItem = function() {
        //Bind Start
        
        for(var i=0;i<itemList.length;i++)
            {
                var cartItemClass="cart-item-first";
                if(i!=0)
                    cartItemClass='cart-item';
                
                var colorDivs=""
                for(var j=0;j<itemList[i].availableColors.length;j++)
                    {
                        colorDivs+='<div class="square" style="background-color:'+itemList[i].availableColors[j]+'"></div>'
                    }
                html='<div class="row '+cartItemClass+'  manage-cart">'+
                        '<div class="col span-1-of-2 cart-details-first">'+
                            '<div class="item-image">'+
                                '<img src="resources/img/'+itemList[i].image+'" alt=""/>'+
                            '</div><div class="item-detail">'+
                                '<h4 class="item-label">'+itemList[i].name+'</h4>'+
                                '<p class="item-style"><span>Style #: </span>'+itemList[i].style+'</p>'+
                                '<p class="item-style">Colour: '+itemList[i].selectedColor+'</p>'+
                               '<div class="edit-item desktop-btn">'+
                                    '<input type="button" class="edit-btn" value="Edit"/>|'+
                                    '<a href="#"><i class="ion-close remove-icon"></i></a><input type="button" class="remove-btn" value="Remove"/>|'+
                                    '<input type="button" class="save-later--btn" value="Save for Later"/></div>'+
                                '<div class="mobile-details">'+
                                    '<p>Size: '+itemList[i].size+'</p>'+
                                    '<div class="qty"><p class="qty-label">QTY: </p><input type="text" value="'+itemList[i].qty+'"/></div>'+
                                     '<div class="qty"><p class="unit-label">$ </p><p class="unit-price">'+itemList[i].price+'</p></div></div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col span-1-of-2 item-value">'+
                            '<div class="col span-1-of-3">'+
                                '<p>$</p>'+
                            '</div>'+
                            '<div class="col span-1-of-3">'+
                                '<input class="input-qty" type="text" value="'+itemList[i].qty+'"/>'+
                            '</div>'+
                            '<div class="col span-1-of-3">'+
                                '<p><sup><span class="span-unit">$</span></sup>'+itemList[i].price+'</p>'+
                            '</div>'+
                        '</div>'+
                        '<div class="edit-item mobile-btn">'+
                                    '<input type="button" class="edit-btn" value="Edit"/>|'+
                                    '<a href="#"><i class="ion-close remove-icon"></i></a><input type="button" class="remove-btn" value="Remove"/>|'+
                                    '<input type="button" class="save-later--btn" value="Save for Later"/>'+
                                '</div>'+
                        '<div class="desktop-overlay-off">'+
                            '<div class="overlay-content">'+
                                '<div class="overlay-close">'+
                                    '<a href="#"><i class="ion-close remove-icon"></i></a>'+
                                '</div>'+
                                '<div class="col overlay-item">'+
                                    '<p class="overlay-label">'+itemList[i].name+'</p>'+
                                    '<p class="overlay-unit"><sup>$</sup>'+itemList[i].price+'</p>'+
                                    '<div class="overlay-item-color">'+
                                        '<p>Color</p>'+
                                        colorDivs+
                                    '</div>'+
                                    '<div class="overlay-units">'+
                                        '<select>'+
                                          '<option value="Select">Select</option>'+
                                          '<option value="L">L</option>'+
                                          '<option value="M">M</option>'+
                                          '<option value="S">S</option>'+
                                        '</select>'+
                                        '<select>'+
                                          '<option value="1">QTY: 1</option>'+
                                          '<option value="2">QTY: 2</option>'+
                                          '<option value="3">QTY: 3</option>'+
                                        '</select>'           +
                                    '</div>'+
                                    '<div class="overlay-btn">'+
                                        '<input type="button" value="add to bag"/>'+                                        
                                    '</div>'+
                                    '<div class="overlay-link">'+
                                        '<a href="#">See Product details</a>'+
                                    '</div>'+
                                '</div>   '+
                                '<div class="col overlay-image">'+
                                    '<img src="resources/img/'+itemList[i].image+'" alt=""/>'+
                                '</div>'+'</div>'+ '</div>'+'</div>';
                total=total+itemList[i].qty*itemList[i].price;
                $(DOM.cartList).append(html);
                //console.log(itemList[i].name);
            }
        
        //Bind End
    };
    
    var setupEventListeners = function() {    
        $(DOM.editButtonType).click(ctrlEditItem);
        $(DOM.closeButtonType).click(ctrlCloseItem);
        
    };
        
    var ctrlEditItem = function() {
        var itemCart=$(this).parents(DOM.cartItemType);        
       //console.log($(this).parentsUntil( DOM.cartItemType ).find(DOM.overlayHidden));
        if(itemCart.length>0)
            {
                //console.log(itemCart.children(DOM.overlayHidden).attr('class'));
                itemCart.children(DOM.overlayHidden).addClass(DOM.overlayShowClass).removeClass(DOM.overlayHiddenClass);
            }
    };
    
    var ctrlCloseItem = function() {
        var itemCart=$(this).parents(DOM.cartItemType);        
        console.log($(this).parentsUntil( DOM.cartItemType ).parent().children(DOM.overlayShow).attr('class'));
        if(itemCart.length>0)
            {            
                console.log(itemCart.children(DOM.overlayHidden).parent().attr('class'));
                itemCart.children(DOM.overlayShow).addClass(DOM.overlayHiddenClass).removeClass(DOM.overlayShowClass);
            }
    };
    
    var calculateSubTotal=function(){
        $(DOM.subtotalValue).html('<p class="sub-value"><sup>$</sup>'+parseFloat(total).toFixed(2)+'</p>');
        
    };
    
    return {
        init: function() {
            console.log('Application has started.');
            bindCartItem();
            calculateSubTotal();
            setupEventListeners();
        }
    };
        
    })(UIController);


controller.init();