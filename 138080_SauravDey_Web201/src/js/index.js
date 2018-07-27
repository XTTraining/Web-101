const jQuery= require('jquery');
import { topMenu, carousel,accordion } from './animation';
import { getFoodMenu,menuData } from './firebase';
import { getCookie,setCookie } from './cookies';
import { bindAccordion,bindOrder,bindCheckout } from './bindHtml';

const cookieName="CartCookie";
const cookieExpiry=30;
jQuery(document).ready(function(e){
    carousel();
    getFoodMenu();
    setTimeout(function(){         
        bindAccordion(menuData);        
        if(jQuery('.order-list').length>0)
        {
            let orderData=getCookie(cookieName);        
            if(orderData!="")
            {
                bindOrder(menuData,JSON.parse(orderData));
            }   
            else if(menuData==null||orderData=="")
            {
                jQuery(".order-list").append("<a class='redirect-home' href=index.html>Continue Shopping</a>");
                return;
            }     
        }
     }, 2000);

     bindCartButton();
        
    jQuery(document).on( "click", ".mobile-menu", function(){    
        topMenu(e);
    });

    jQuery(document).on( "click", ".accordion", function(){
        const thisAccordion=this;   
        accordion(thisAccordion,e);
    });

    jQuery(document).on( "click", ".qtyplus", function(){
        let fieldName = jQuery(this).attr('field');        
        let currentVal = parseInt(jQuery(this).parent().find('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal < 5) {
            jQuery(this).parent().find('input[name='+fieldName+']').val(currentVal+1);
        } else if(currentVal>=5){
            jQuery(this).parent().find('input[name='+fieldName+']').val(5);
        } else {
            jQuery(this).parent().find('input[name='+fieldName+']').val(0);
        }
    });

    jQuery(document).on( "click", ".qtyminus", function(){
        
        let fieldName = jQuery(this).attr('field');
        let currentVal = parseInt(jQuery(this).parent().find('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            jQuery(this).parent().find('input[name='+fieldName+']').val(currentVal-1);
        }  else {
            jQuery(this).parent().find('input[name='+fieldName+']').val(0);
        }
    });

    jQuery(document).on("click",".btn__cart",function(){
        //let cookieValue=jQuery(this).parents(".panel-item").attr('data');

        let itemObject=new Object();
        let itemArray=[];

        itemObject.name=jQuery(this).parents(".panel-item").find('.menu__name').html();
        itemObject.Id=jQuery(this).parents(".panel-item").attr('data');
        itemObject.Parent=jQuery(this).parents(".panel-item").attr('data-parent');
        itemObject.Qty=jQuery(this).parents(".panel-item").find('.qty').val();
        itemObject.net=parseInt(jQuery(this).parents(".panel-item").find('.price__tag').html().split('.')[1]);
        itemObject.tax=parseInt(jQuery(this).parents(".panel-item").find('.price__tag').attr('data-tax'));
        
        if(itemObject.Id==="undefined" ||parseInt(itemObject.Id)===0 ||parseInt(itemObject.Qty)===0)
        {
            console.log("Wrong Input");
            return;
        }

        let cookieValue=getCookie(cookieName);

        if(cookieValue!="")
        {
            let flag=false;
            let cookieData=JSON.parse(cookieValue);
            for(let item in cookieData)
            {
                if(cookieData[item].Id===itemObject.Id)
                {
                    cookieData[item].Qty=parseInt(itemObject.Qty);
                    flag=true;
                }                
            }
            if(flag===false)
            {
                cookieData.push(itemObject);
            }
            itemArray=cookieData;
        }
        else
        {
            itemArray.push(itemObject);
        }
        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        jQuery(this).closest('.menu__btn').find(".popuptext").addClass('show');
        jQuery(".cart__order i").attr('data-count',itemArray.length);
    });

    jQuery(document).on("click",".btn__buy",function(){
        let itemObject=new Object();
        let itemArray=[];

        itemObject.name=jQuery(this).parents(".panel-item").find('.menu__name').html();
        itemObject.Id=jQuery(this).parents(".panel-item").attr('data');
        itemObject.Parent=jQuery(this).parents(".panel-item").attr('data-parent');
        itemObject.Qty=jQuery(this).parents(".panel-item").find('.qty').val();
        itemObject.net=itemObject.Qty*parseInt(jQuery(this).parents(".panel-item").find('.price__tag').html().split('.')[1]);

        if(itemObject.Id==="undefined" ||parseInt(itemObject.Id)===0 ||parseInt(itemObject.Qty)===0)
        {
            console.log("Wrong Input");
            return;
        }
        itemArray.push(itemObject);
        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        window.location.href='order.html';
    });    

    jQuery(document).on("click",".remove__btn",function(){
        let deleteItem=jQuery(this).parents(".item").attr("data");
        let cookieValue=getCookie(cookieName);
        let itemArray=[];
        if(cookieValue!="")
        {            
            let cookieData=JSON.parse(cookieValue);
            for(let item in cookieData)
            {
                if(cookieData[item].Id!=deleteItem)
                {
                    itemArray.push(cookieData[item]);                    
                }                
            }            
        }        
        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        bindOrder(menuData,JSON.parse(getCookie(cookieName)));

    });

    jQuery(document).on("click",".item__qty",function(e){
        let target=jQuery(e.target);
        let itemId=jQuery(this).parents(".item").attr('data');
        let cookieValue=getCookie(cookieName);
        let itemArray=[];

        if(target.is('.qtyminus')) {
            let qtyVal=parseInt(jQuery(this).children(".qty").val());
            if(qtyVal===0)
            {
                jQuery(this).children(".qty").val(1);
            }
            
            if(cookieValue!="")
            {            
                let cookieData=JSON.parse(cookieValue);
                for(let item in cookieData)
                {
                    if(cookieData[item].Id==itemId)
                    {                        
                        cookieData[item].Qty=qtyVal;                                           
                    } 
                    itemArray.push(cookieData[item]);                
                }                  
            }        
        
        }
        if(target.is('.qtyplus')) {
            let qtyVal=jQuery(this).children(".qty").val();
            if(qtyVal>5)
            {
                jQuery(this).children(".qty").val(1);
            }
            if(cookieValue!="")
            {            
                let cookieData=JSON.parse(cookieValue);
                for(let item in cookieData)
                {
                    if(cookieData[item].Id==itemId)
                    {                        
                        cookieData[item].Qty=qtyVal;                                           
                    } 
                    itemArray.push(cookieData[item]);                
                } 
            }   
        }

        setCookie(cookieName,JSON.stringify(itemArray),cookieExpiry);
        bindOrder(menuData,JSON.parse(getCookie(cookieName)));
        
    });

    jQuery(document).on("click",".total__order__place",function(){
        jQuery(".order-list").attr("style","display:none");
        jQuery(".final__checkout").removeAttr('style');
        let orderData=getCookie(cookieName);        
        if(orderData!="")
        {
            bindCheckout(JSON.parse(orderData));
        }         
    });

    jQuery(document).on("click",".btn__submit",function(){
        jQuery(".order-list").removeAttr('style');
        jQuery(".final__checkout").attr('style',"display:none");
        jQuery(".order-list").children().remove();
        jQuery(".order-list").append("<span class='success__order'>Your order successfully submitted.</span>");
    });

    jQuery(document).on("click",".search__button",function(){
        let searchText=jQuery(".search__text").val();
        bindAccordion(menuData,searchText);
    });

    jQuery(document).on("keypress",".search__text",function(e){
        
        if (e.which == 13) {
            let searchText=jQuery(".search__text").val();
            bindAccordion(menuData,searchText);
        }
    });
});


function bindCartButton()
        {
            let orderData=getCookie(cookieName); 
            let cartCount=0;
            if(orderData!="")
            {
                cartCount= JSON.parse(orderData).length;
            } 
            jQuery(".cart__order i").attr('data-count',cartCount);
        }





