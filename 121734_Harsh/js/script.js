var UIController = (function () {
    var cssclass = {
        edititem: '.item-edit',
        closebutton: '.close',
        modelpopup: '#myModal'
    };
    return {
        cssclassnamestrings: function () {
            return cssclass;
        }
    };
})();

var shoppingController = (function () {
    var cssclass = "hi";
    return cssclass;
})();

var editItem = function () {
    var input, newItem;

    // 1. Get the field input data
    input = UICtrl.cssclassnamestrings();

    /* if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
         // 2. Add the item to the budget controller
         newItem = budgetCtrl.addItem(input.type, input.description, input.value);

         // 3. Add the item to the UI
         UICtrl.addListItem(newItem, input.type);

         // 4. Clear the fields
         UICtrl.clearFields();

         // 5. Calculate and update budget
         updateBudget();

         // 6. Calculate and update percentages
         updatePercentages();
         }
         */
};




var controller = (function (shopCtrl, UICtrl) {
    var cssclassname = UICtrl.cssclassnamestrings();

    var ctrlAddItem = function () {

        // Get the modal
        var modalcloseoption = document.querySelector(cssclassname.modelpopup);
        modalcloseoption.style.display = "block";

        // 1. Get the field input data
        //  input = UICtrl.getInput();        

        // if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        // 2. Add the item to the budget controller
        //   newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        // UICtrl.addListItem(newItem, input.type);

        // 4. Clear the fields
        //UICtrl.clearFields();

        // 5. Calculate and update budget
        //updateBudget();

        // 6. Calculate and update percentages
        //updatePercentages();
    }



    var closemodel = function () {
        // var input, newItem;

        // Get the modal
        var closelink = document.querySelector(cssclassname.modelpopup);
        closelink.style.display = "none";
    }


    document.querySelector(cssclassname.edititem).addEventListener('click', ctrlAddItem);

    document.querySelector(cssclassname.closebutton).addEventListener('click', closemodel);


    window.onclick = function (event) {
        var modal = document.querySelector(cssclassname.modelpopup);
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    return {
        init: function () {

        }
    };

})(shoppingController, UIController);


controller.init();
