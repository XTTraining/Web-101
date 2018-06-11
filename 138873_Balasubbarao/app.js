var shoppingBag = (function () {

    var _data = {};

    var DOMStrings = {
        headerTotal: ".header-total-items",
        headerRowTotal: ".header--row--total--items",
        shoppingBagList: ".shopping-bag-list",
        ModalBox: "modal-box"
    };

    // Set Items count.
    var setItemsCount = function () {
        var count = _data.length;
        // 1. Set count value of at Header row 
        document.querySelector(DOMStrings.headerTotal).textContent = count + " items";

        // 2. Set count value of mobile view.
        document.querySelector(DOMStrings.headerRowTotal).textContent = count + " items";

    };

    var setEventListener = function () {

        document.querySelector(DOMStrings.shoppingBagList).addEventListener('click', ctrlEditItem);

        document.querySelector('.fa-times').addEventListener('click', function () {
            document.getElementById(DOMStrings.ModalBox).style.display = 'none';
        });

    }

    // Load Shopping bag Items    
    var loadShoppingBag = function () {
        //create html string to replace the content.
        var html, newHtml;

        html = '<div class="shopping-bag-list-row" id="item-index-%id%"><div class="shopping-bag-col-first"><div class="item-detail"><div class="item-detail-image"><img src="images/%id%.jpg" alt="%title%"></div><div class="item-detail-title">%title%</div><div class="item-detail-content">Style : %style%</div>            <div class="item-detail-content">Colour : %colour%</div><div class="item-detail-content show-mob">Size : %size%</div><div class="item-detail-content show-mob bld">QTY : <input type="text" alt="Item quantity" class="quantity-text" aria-label="quantity" value="%qty%"></div><div class="item-detail-content show-mob bld">$%price%</div><div class="item-detail-actions"><a href="#" id="edit-%id%" class="edit--item">edit</a> | <a href="#">X Remove</a> | <a href="#"> save for later</a></div></div></div><div class="shopping-bag-col">%size%</div><div class="shopping-bag-col"><input type="text" alt="Item quantity" class="quantity-text" aria-label="quantity" value="%qty%"></div><div class="shopping-bag-col">$%price%</div></div><div class="top-line"></div>';

        _data.forEach(function (obj) {

            newHtml = html.replace(new RegExp('%id%', 'g'), obj.id);
            newHtml = newHtml.replace(new RegExp('%title%', 'g'), obj.title);
            newHtml = newHtml.replace(new RegExp('%style%', 'g'), obj.style);
            newHtml = newHtml.replace(new RegExp('%colour%', 'g'), obj.colour);
            newHtml = newHtml.replace(new RegExp('%size%', 'g'), obj.size);
            newHtml = newHtml.replace(new RegExp('%price%', 'g'), obj.price);
            newHtml = newHtml.replace(new RegExp('%qty%', 'g'), obj.qty);

            // 3. Insert HTML into the DOM.              
            document.querySelector(DOMStrings.shoppingBagList).insertAdjacentHTML('beforeend', newHtml);
        });

    };

    var ctrlEditItem = function (event) {
        var splitID, ID, overlayData;

        if (event.target.id.startsWith('edit-')) {
            splitID = event.target.id.split('-');
            ID = splitID[1];


            _data.forEach(function (obj) {
                if (obj.id == ID) {
                    overlayData = obj;
                }

            });

            loadOverlayData(overlayData);
            document.getElementById(DOMStrings.ModalBox).style.display = 'block';

        }
    }

    var loadOverlayData = function (obj) {
        document.querySelector('.modal-box-content-title').textContent = obj.title
        document.querySelector('.colour-title').textContent = obj.colour;
        document.querySelector('.modal-box-content-price').textContent = "$" + obj.price;
        document.querySelector('.modal-box-content-size').value = obj.size;
        document.querySelector('.modal-box-content-qty').value = obj.qty;
        document.querySelector('.modal--image').src="images/"+ obj.id+".jpg"
    }


    var loadData = function () {
        if (_data.length !== undefined && _data.length > 0) {
            setItemsCount();
            loadShoppingBag();
            setEventListener();
        }
    }

    // method to initialize the function.
    return {
        init: function (data) {
            _data = data;
            loadData()
        }
    };

})();



/* Sample Json data to Construct the DOM */
var data = [
    {
        id: 0001,
        title: "Solid green cotton tshirt",
        style: "#Gre-008",
        colour: "Green",
        price: 11.00,
        qty: 1,
        size: "m"
        },
    {
        id: 0002,
        title: "Pink rainbow print grils tee",
        style: "#Pin-172",
        colour: "Pink",
        price: 9.00,
        qty: 1,
        size: "s"
        },
    {
        id: 0003,
        title: "Blue flower pattern shirt",
        style: "#Blu-382",
        colour: "Blue",
        price: 12.00,
        qty: 1,
        size: "xl"
        }
    ];


shoppingBag.init(data);
