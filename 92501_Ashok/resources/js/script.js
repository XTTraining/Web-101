(function(){
	var jsonData = ({
		  "items": [
		    {
		      "code": "STS15411",
		      "title": "Solid Green Cotton TShirt",
		      "price": "11",
		      "colour": "green",
		      "size": "s",
		      "src": "Product1",
		      "qty": "2" 
		    },
		    {
		      "code": "RTS15412",
		      "title": "Striped Yellow Black Round TShirt",
		      "price": "9",
		      "colour": "mixed",
		      "size": "m",
		      "src": "Product2",
		      "qty": "5"
		    },
		    {
		      "code": "FS15413",
		      "title": "Maroon Chequered Shirt",
		      "price": "15",
		      "colour": "maroon",
		      "size": "s",
		      "src": "Product3",
		      "qty": "1"
		    }
		  ],
		  "promotionDeduction": "7",
		  "promotionCode": "JF10",
		}),
		span = document.getElementsByClassName("close")[0],
		modal = document.getElementById('myModal'),
		listContainerDiv = document.getElementsByClassName('product-list')[0],
		sbTotalDiv = document.getElementsByClassName('sbTotalDiv')[0],
		promoDiv = document.getElementsByClassName('promoDiv')[0],
		shippingCostDiv = document.getElementsByClassName('shippingCostDiv')[0],
		cartTotalDiv = document.getElementsByClassName('cartTotalDiv')[0],
		couponInput = document.getElementById('txtCoupon'),
		applyBtn = document.getElementsByClassName('apply')[0],
		totalQtyDiv = document.getElementsByClassName('totalQtyDiv')[0],
		editBtn = document.getElementsByClassName('edit'),
		removeBtn = document.getElementsByClassName('rm'),
		subTotal = 0,
		shippingCost = 0, 
		cartTotal = 0,
		markup = '',
		modalMarkup = ''
		totalQty = 0,
		modalObj = null;

	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	//loop over JSON to dynamically create list item
	for (var i = 0, product = jsonData.items; i < product.length; i++) {
		markup += '<div class="row product" data-index="' + product[i].code + '">' + 
				'<div class="col span-3-of-12">' + 
					'<img src="resources/img/' + product[i].src + '.png" alt="product1" />' + 
				'</div>' + 
			    '<div class="col span-6-of-12 summary">' + 
			  	'<div class="title">' + product[i].title + '</div>' + 
			  	'<div class="summaryText">Style #: <span class="code">' + product[i].code + '</span></div>' + 
			  	'<div class="summaryText">Colour: <span class="colour">' + product[i].colour + '</span></div>' +
			  	'<div class="summaryText mob">Size: <span class="size">' + product[i].size + '</span></div>' +
			  	'<div class="summaryText mob">Qty: <span class="qty">' + product[i].qty + '</span></div>' +
			  	'<div class="summaryText mob">Price: <span class="price">' + product[i].price + '</span></div>' + 
			  	'<div class="summaryButtons"><a class="edit" href="javascript:void(0)">edit</a>' + 
			  	'<a class="rm" href="javascript:void(0)"><strong>&times;</strong>remove</a>' + 
			  	'<a class="save" href="javascript:void(0)">save for later</a></div></div>' +
			  	'<div class="col span-3-of-12 summary"><div class="col span-4-of-12"><div class="size desktop">' + product[i].size + '</div></div>' + 
			  	'<div class="col span-4-of-12"><div class="qty desktop">' + product[i].qty + '</div></div>' + 
			  	'<div class="col span-4-of-12"><div class="price desktop">' + product[i].price + '</div></div></div>' + 
			  '</div>';

		subTotal += parseFloat(product[i].price) * parseFloat(product[i].qty);
		totalQty += parseInt(product[i].qty);
	}

	function populatePopup(obj) {
		modalMarkup = '<div class="col span-1-of-2">' + 
					'<div class="extraWeight">' + obj.title + ' </div>' + 
					'<div class="productSummary">' + ' $ <span class="capitalize">' + obj.price + '</span></div>' +  
					'<div class="productSummary">' + 
						'<select id="updated-size"><option>Size</option><option>XS</option><option>S</option>' +
                        	'<option>M</option><option>L</option><option>XL</option><option>XXL</option>' + 
                        '</select>' + 
                        '<select id="updated-qty"><option>QTY</option><option>1</option><option>2</option>' + 
                        	'<option>3</option><option>4</option><option>5</option>' + 
                        '</select>' + 
                    '</div><div class="productSummary"><a href="javascript:void(0)" class="editBlue">Edit</a></div>' +
                	'<div class="productSummary details">See product details</div></div>' +
            	   '<div class="col-span-1-of-2"><img src="resources/img/' + obj.src + '.png" alt="product1"></div>';
    
        document.getElementById('myModal').children[0].childNodes[3].innerHTML = modalMarkup;
        modal.style.display = "block";
    }

	//set innerHTML of containerDiv to dynamically created list item
	listContainerDiv.innerHTML = markup;

	function createCartValues() {
		//set subTotalDiv to calculated value 
		sbTotalDiv.innerHTML = '$' + subTotal;
		
		//set promoDiv to calculated value 
		promoDiv.innerHTML = '- ' + '$' + jsonData.promotionDeduction;

		//set shipping cost to 1/10 of subTotal
		shippingCost = subTotal > 50 ? 0 : subTotal/10;
		
		//set shippingCostDiv to calculated value 
		shippingCostDiv.innerHTML = shippingCost > 0 ? '$' + shippingCost : 'FREE';

		//set couponInput value
		couponInput.value = jsonData.promotionCode ? jsonData.promotionCode : '';
		couponInput.disabled = jsonData.promotionCode ? 'disabled': '';
		jsonData.promotionCode ? applyBtn.classList.add('disabled'): '';

		//set totalQtyDiv to calculated value
		totalQtyDiv.innerHTML = totalQty;

		//set totalCostDiv to calculated value
		cartTotal = subTotal - jsonData.promotionDeduction + shippingCost;
		cartTotalDiv.innerHTML = '$' + cartTotal;
	}
	createCartValues();

	function updateCartTotal(idx, action, newObj) {
		subTotal = action === 'edit' ? 0 : subTotal;
		totalQty = action === 'edit' ? 0 : totalQty;
		for (var i = 0, product = jsonData.items; i < product.length; i++) {
			if (product[i].code === idx) {
				if (action === "delete") {
					subTotal -= (parseFloat(product[i].qty) * parseFloat(product[i].price));
					totalQty -= parseFloat(product[i].qty);
				} else if (action === "edit") {
					product[i].qty = modalObj.qty;
					product[i].size = modalObj.size;
					if (window.innerWidth > 768) {
						document.getElementsByClassName('qty desktop')[i].innerHTML = modalObj.qty;
						document.getElementsByClassName('size desktop')[i].innerHTML = modalObj.size;
					} else {
						document.getElementsByClassName('qty mob')[i].innerHTML = modalObj.qty;
						document.getElementsByClassName('size mob')[i].innerHTML = modalObj.size;
					}
				}				
			}

			if (action === "edit") {
				subTotal += (parseFloat(product[i].qty) * parseFloat(product[i].price));
				totalQty += parseFloat(product[i].qty);
			}
		}
		createCartValues();
	}

	function removeRow(e) {
		var productDiv = e.target.parentElement.parentElement.parentElement,
			productDivCode = productDiv.dataset.index;

		productDiv.style.display = "none";
		updateCartTotal(productDivCode, 'delete');
	}

	function editListView() {
		var newSize = document.getElementById('updated-size').value,
			newQty = document.getElementById('updated-qty').value;

		if (modalObj.size != newSize) {
			modalObj['size'] = newSize;
		}

		if (modalObj.qty != newQty) {
			modalObj['qty'] = newQty;
		}
		updateCartTotal(modalObj.code, 'edit');
		modal.style.display = 'none';
	}

	function openPopup(e) {
		var productDivCode = e.target.parentElement.parentElement.parentElement.dataset.index,
			obj = jsonData.items.filter(function(item){
	    		return item.code === productDivCode
	    	}).pop();
	    modalObj = obj;
	    populatePopup(obj);
	}

	document.body.addEventListener('click', function (e) {
	    if (e.target.className === 'edit') {
	    	openPopup(e);
	    } else if (e.target.className === 'rm') {
	    	removeRow(e);
	    } else if (e.target.className === 'editBlue') {
	    	editListView();
	    }
	}, false);
})();