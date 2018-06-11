 var init = (function() {
            var fields, fieldsArr,nodeListEditArr, nodeListEdit,nodeListRemoveArr,nodeListRemove;
            
            fields = document.querySelectorAll('.quantity');
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "1";
            });
            
            fieldsArr[0].focus();
     
     

            nodeListEdit = document.querySelectorAll('#btnProductEdit');
            nodeListEditArr = Array.prototype.slice.call(nodeListEdit);
            
            nodeListEditArr.forEach(function(current, index, array) {
                current.addEventListener('click', editProduct);
            });
     
     
            nodeListRemove = document.querySelectorAll('.btn-remove');
            nodeListRemoveArr = Array.prototype.slice.call(nodeListRemove);
            
            nodeListRemoveArr.forEach(function(current, index, array) {
                current.addEventListener('click', removeProduct);
            });
     
        })();

/* Close overlay */
document.getElementById('btnClose').addEventListener('click',function(){
   
    var x = document.getElementById("overlay");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
});

/* show overlay for edit*/
function editProduct() {
    var x = document.getElementById("overlay");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var currentItem = findAncestor(this,'productBorder');
    document.getElementById('imgEditOverlay').src= currentItem.getElementsByClassName("product")[0].src;
} 


/* Remove current product*/
function removeProduct() {
    var currentItem =findAncestor(this,'productBorder'); 
    currentItem.parentElement.remove();
} 


function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}