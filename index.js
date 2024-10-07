let addTocCardBtns = document.getElementsByClassName("cart")
// console.log(addTocCardBtns);
let mainContainer = document.getElementsByTagName("tbody")[0]
// reason for the [0] on the tag name is that it returns group of element .we did that to bring the first element
let qty = document.getElementsByClassName("itemQty")
// // loop thru it cos it returns a group of element.this must be dropd inside the addToCart function cos that were it becomes active
let delete_buttons = document.getElementsByClassName('button')

// loop thru all each button to access individually
for(let i=0 ;i < addTocCardBtns.length; i++){
    addTocCardBtns[i].addEventListener("click",addToCart)
}

function addToCart(event){
    let btn = event.target
    let btnParent = btn.parentElement;
    let itemName = btnParent.children[2].children[0].textContent
    let itemPrice = btnParent.children[2].children[2].textContent
    let itemImage = btnParent.children[0].src
  
     // Check if the item is already in the cart
    let cartItems = document.getElementsByClassName("itemName");
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].textContent === itemName) {
            alert("Item is already in the cart!");
            return; // Exit the function to prevent adding the item again
        }
    }
    // creating each cart
    let itemContainer = document.createElement("tr")

    itemContainer.innerHTML = `
    <td><input type="checkbox" name="" id=""></td>
    <td><img src="${itemImage}" alt="" width="40px"></td>
    <td class="itemName">${itemName}</td>
    <td class="itemPrice"><h3>$${itemPrice}</h3></td>
    <td><input type="number" name="" class="itemQty" value="1" min="0"></td>
    <td class="itemTotal"><h3>$${itemPrice}</h3></td>
    <td><button id="button" type="button">Remove</button></td>
    `
    // // appending the itemContainer to the parent element
    mainContainer.append(itemContainer)

     // Add event listener to update total when the quantity is changed by user input
     let qtyInput = itemContainer.getElementsByClassName("itemQty")[0];
     qtyInput.addEventListener("input", updateTotal);

    // // looping thru the qty of each item
    for(let i=0 ;i < qty.length; i++){
        qty[i].addEventListener("click",updateTotal)

    }
    
    grandTotal()
}

// working on the quantity
function updateTotal(event){
    let itemNumber = event.target
    itemNumberParent = itemNumber.parentElement.parentElement
    priceField = itemNumberParent.getElementsByClassName("itemPrice")[0]
    totalField = itemNumberParent.getElementsByClassName("itemTotal")[0]
    priceFieldContent = priceField.children[0].textContent.replace("$","");
    // replacing the $ field with empty to avod calc error
    
    totalField.children[0].textContent ="$" + (itemNumber.value * priceFieldContent).toFixed(2)
    
    // qty shouldn't be less 1
    if(isNaN(itemNumber.value)){
        itemNumber.value = 0
    }
    grandTotal()
}
function grandTotal(){
    let totalPrice = document.getElementsByClassName("itemTotal");
    let total = 0;
    let grandTotal= document.getElementsByClassName("grandTotal")[0]
    // loop thru
    for(let i =0;i<totalPrice.length;i++){
        // remove $ sign from each prices
        totalPriceContent = Number(totalPrice[i].textContent.replace("$",""))
        total += totalPriceContent;
    }
    grandTotal.children[0].textContent = "$" + (total).toFixed(2)
}



    