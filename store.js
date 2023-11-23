if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready();
    updateCartTotal();
}

function ready() {
    let remvoeCartItemButtons = document.getElementsByClassName("danger-button")
    for (let i =0; i < remvoeCartItemButtons.length; i++) {
        let button = remvoeCartItemButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    
    
    let quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        const inputField = quantityInputs[i];
        inputField.addEventListener('change', updateQuantityPrice)
    }

    let addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }


    document.getElementById("purchase").addEventListener('click', purhchaseClicked)
}   


function purhchaseClicked() {
    alert("شكراً على شرائك منتجاتنا.");

    let cartItems = document.getElementsByClassName("cart-purchase-items-container")[0];

    while (cartItems.hasChildNodes())  {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    let button = event.target;

    let shopItem = button.parentElement.parentElement;

    let shopItemTitle, shopItemPrice, shopItemImage;
    shopItemTitle = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    shopItemPrice = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    shopItemImage = shopItem.getElementsByClassName("shop-item-image")[0].src;

    addItemToCart(shopItemTitle, shopItemPrice, shopItemImage);
    updateCartTotal();
}



function addItemToCart(title, price, imageSrc) {
    let tableBody = document.getElementsByTagName('tbody')[0];
    let cartItemNames = tableBody.getElementsByClassName("cart-item-tile");

    for(let i=0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("This item is already added to the cart!")
            return;
        }
    }

    let tableRow= document.createElement('tr');

    tableRow.innerHTML = `
    <td>
    <img src="${imageSrc}" alt="" width="100">
    <span class="cart-item-tile">${title}</span>
    </td>
    <td>
        <span class="cart-purchase-item-price">${price}</span>
    </td>
    <td>
        <input type="number" value="1" class="cart-quantity-input">
        <button role="button" class="btn danger-button">إزالــــة</button>
    </td>
    `;

    tableBody.append(tableRow);
    tableRow.getElementsByClassName("danger-button")[0].addEventListener('click', removeCartItem);
    tableRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateQuantityPrice)
}



function updateQuantityPrice(event) {
    let input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}

function removeCartItem (event) {    
    let btnItSelf = event.target;
    btnItSelf.parentElement.parentElement.remove()
    updateCartTotal();
}


function updateCartTotal () {
    let elemetnsContainer = document.getElementsByClassName("cart-purchase-items-container")[0].children;


    let total = 0;

    for (let i = 0; i < elemetnsContainer.length; i++) {
        const tableRow = elemetnsContainer[i];

        let price = tableRow.getElementsByClassName("cart-purchase-item-price")[0].innerHTML;
        let amount = tableRow.getElementsByClassName("cart-quantity-input")[0].value;

        price = Number.parseFloat(price.replace('ج', ''));
        amount = Number.parseFloat(amount);
        
        total = total + ( price * amount);
    }
    document.getElementById("cart-price-total").innerText = total + 'ج';
}