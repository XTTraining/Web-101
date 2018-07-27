let myIndex = 0;
//carousel();

function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    if(x.length>0)
    {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
          }
          myIndex++;
          if (myIndex > x.length) {myIndex = 1}    
          x[myIndex-1].style.display = "block";  
          setTimeout(carousel, 5000); 
    }       
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function topMenu(e) {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
//e.stopImmediatePropagation();
}

function accordion(thisAccordion,e)
{
    thisAccordion.classList.toggle("active");
    
    let panel = thisAccordion.nextElementSibling;
    if (panel.classList.contains("menu-item")) {
        panel.classList.remove("menu-item");
    } else {
        panel.className += ' menu-item ';
    }
    //e.stopImmediatePropagation();
}
export { topMenu, carousel,accordion};

