const jQuery= require('jquery');

function bindAccordion(menuData,searchItem="")
{    
    let innerHtml=``;
    for (let key in menuData) {
        innerHtml+=`<button class="accordion">${key}</button><div class="panel ">`;
        let subMenu=menuData[key];
        let flag=false;        
        for (let subKey in subMenu) {
            let subItem=subMenu[subKey];
            if(subKey.toLowerCase().indexOf(searchItem.toLowerCase())>-1)
            {                
                innerHtml+=`<div class="panel-item" data="${subItem.Id}" data-parent="${key}">
                <img src="img/${subItem.image}" alt="${subKey}" class="item-img">
                <h5 class="menu__name">${subKey}</h5>
                <div class="menu__price">
                    <span class="price__label">Price</span>
                    <span class="price__tag" data-tax="${subItem.tax}">Rs. ${subItem.price}</span>
                </div>
                <div class="menu__qty">                    
                    <input type='button' value='-' class='qtyminus' field='quantity' />
                    <input type='text' name='quantity' readonly=true value='0' class='qty' />
                    <input type='button' value='+' class='qtyplus' field='quantity' />
                </div>
               <div class="menu__btn">
               <div class="popup">
                    <span class="popuptext">${subKey} successfully added to the cart</span>
                </div>
                   <input type="button" class="btn__cart" value="Add to cart">
                   <input type="button" class="btn__buy" value="Buy">
               </div> 
            </div>`; 

            flag=true;
            }              
        }
        innerHtml+=`</div>`;
    }
    jQuery(".features").children().remove();
    jQuery('.features').append(innerHtml);

    jQuery('.accordion').each(function(){
        if(jQuery(this).next("div > .panel").children().length<1)
        {
            jQuery(this).attr("style","display:none");
        }
    });

    jQuery(document).on("click",".popuptext",function(){
        if(jQuery(this).hasClass('show'))
        {
            jQuery(this).removeClass('show');
        }
    });
}

function bindOrder(menu,order)
{
    let innerHtml=``;
    let netTotal=0;
    let gst=0;
    jQuery(".order-list").children().remove();
    // if(menu==null||order=="")
    // {
    //     jQuery(".order-list").append("<a class='redirect-home' href=index.html>Continue Shopping</a>");
    //     return;
    // }
    for(let item in order)
    {        
        for (let key in menu) {            
            let subMenu=menu[key];
            for (let subKey in subMenu) {
                let subItem=subMenu[subKey];
                if(parseInt(subItem.Id)===parseInt(order[item].Id))
                {                    
                    innerHtml+=`<div class="item" data="${subItem.Id}">
                    <div class="item__image">
                        <img src="img/${subItem.image}" alt="${subKey}">
                    </div>
                    <div class="item__detail">
                        <span class="item__label">${subKey}</span>
                        <span class="item__label__qty">Quantity</span>
                        <div class="item__qty">                    
                            <input type='button' value='-' class='qtyminus' field='quantity' />
                            <input type='text' name='quantity' readonly=true value='${order[item].Qty}' class='qty' />
                            <input type='button' value='+' class='qtyplus' field='quantity' />
                        </div>
                        <input type="button" class="remove__btn" value="Remove">                    
                    </div>                
                    <div class="item__total">
                            <span class="item__total__label">Price</span>
                            <span class="item__total__tag">Rs. ${subItem.price*order[item].Qty}</span>
                    </div> 
                </div>`;
                let caclculateTax=(subItem.price*order[item].Qty)*subItem.tax/100;
                gst=gst+caclculateTax;
                netTotal+=subItem.price*order[item].Qty;
                }              
            }            
        }               
    }

    innerHtml+=`<div class="total">
    <div class="total__net__price">
            <span class="total__net__price__label">Net Price</span>
            <span class="total__net__price__tag">Rs. ${netTotal}</span>
    </div>
    <div class="total__tax">
            <span class="total__tax__label">GST</span>
            <span class="total__tax__tag">Rs. ${gst}</span>
    </div>
    <div class="total__grand">
            <span class="total__grand__label">Total</span>
            <span class="total__grand__tag">Rs. ${Math.round(netTotal+gst)}</span>
    </div>
    <div class="total__order">
        <button class="total__order__place">Place Order</button>
    </div>
    </div>`;    
    jQuery(".order-list").append(innerHtml);
}

function bindCheckout(orderCookie)
{
    console.log(orderCookie);
    let net=0;
    let gst=0;
    let innerHtml=`<h4>Cart <span class="price black"><i class="fa fa-shopping-cart"></i> <b>${orderCookie.length}</b></span></h4>`;
    for(let item in orderCookie)
    {
        innerHtml+=`<p><a href="#">${orderCookie[item].name}</a> 
        <span class="price">Rs. ${orderCookie[item].Qty*orderCookie[item].net}</span></p>`;
        gst+=(orderCookie[item].Qty*orderCookie[item].net)*orderCookie[item].tax/100;
        net+=orderCookie[item].Qty*orderCookie[item].net;
    }
    innerHtml+=`<hr>
        <p>Net <span class="price black"><b>Rs. ${net}</b></span></p>
        <p>Tax <span class="price black"><b>Rs. ${gst}</b></span></p>
        <p>Grand Total <span class="price black"><b>Rs. ${Math.round(net+gst)}</b></span></p>`;        
    jQuery(".order__place").append(innerHtml);
}

export { bindAccordion,bindOrder,bindCheckout};