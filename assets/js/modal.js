/*************
           GLOBAL VARIABLES FOR EACH MODAL 
*************/
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

/*************
           WHEN YOU PRESS EACH BUTTON, WHETHER BE THE HISTORY OF OPERATIONS 
           OR THE INFORMATION BUTTON, THE IS-VISIBLE CLASS IS ADDED TO SHOW 
           THE RESPECTIVE MODAL 
*************/
for (const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

/*************
           PRESSING THE BUTTON TO CLOSE THE MODAL REMOVES THE IS-VISIBLE CLASS
           TO REMOVE THE MODAL. 
*************/
for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}


/*************
           PRESSING ANYWHERE OUTSIDE THE MODAL REMOVES THE IS-VISBLE 
           CLASS FROM THE MODAL. 
*************/
document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});