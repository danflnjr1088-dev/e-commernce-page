const items = document.querySelectorAll(".product-item");
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const selectedCategory = button.dataset.filter;

    items.forEach(function(item) {
      if (
        selectedCategory === "all" ||
        selectedCategory === item.dataset.category
      ) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const quantityButtons = document.querySelectorAll(".quantity-btn");

addToCartButtons.forEach(function(addBtn) {
  addBtn.addEventListener("click", function() {

    const selectedItem = addBtn.dataset.item;
    const selectedPrice = Number(addBtn.dataset.price);

    const productBox = addBtn.closest(".product-box");

    if (!productBox) {
      return;
    }

    const quantityNum = productBox.querySelector(".quantity-num");
    const productImage = productBox.querySelector(".product-image");

    if (!quantityNum) {
      return;
    }

    const currentQuantity = Number(quantityNum.textContent);
    const selectedImage = productImage ? productImage.src : "";

    const product = cart.find(function(product) {
      return product.item === selectedItem;
    });

    if (product) {

      product.quantity = currentQuantity;

    } else {

      cart.push({
        item: selectedItem,
        price: selectedPrice,
        quantity: currentQuantity,
        image: selectedImage
      });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

  });
});

quantityButtons.forEach(function(quantityBtn) {
  quantityBtn.addEventListener("click", function() {

    const action = quantityBtn.dataset.action;
    const productBox = quantityBtn.closest(".product-box");

    if (!productBox) {
      return;
    }

    const quantityNum = productBox.querySelector(".quantity-num");
    const addBtn = productBox.querySelector(".add-to-cart-btn");

    if (!quantityNum || !addBtn) {
      return;
    }

    let currentQuantity = Number(quantityNum.textContent);
    const selectedItem = addBtn.dataset.item;

    const product = cart.find(function(product) {
      return product.item === selectedItem;
    });

    if (action === "increase") {

      currentQuantity = currentQuantity + 1;
      quantityNum.textContent = currentQuantity;

    } else if (action === "decrease") {

      if (currentQuantity > 1) {
        currentQuantity = currentQuantity - 1;
        quantityNum.textContent = currentQuantity;
      }

    }

    if (product) {

      product.quantity = currentQuantity;

      localStorage.setItem("cart", JSON.stringify(cart));

    }

  });
});

const cartLink = document.querySelector(".cart-link");
const cartContainer = document.querySelector(".cart-container");
const cartItemContainer = document.querySelector(".cart-item-box");
const productContainer = document.querySelector(".product-container");

if (cartLink && cartContainer && cartItemContainer) {

  cartLink.addEventListener("click", function(event) {
    event.preventDefault();

    if (productContainer) {
      productContainer.style.display = "none";
    }

    cartContainer.style.display = "block";

    cartItemContainer.innerHTML = "";

    let totalCart = 0;

    if (cart.length === 0) {

      const emptyMessage = document.createElement("p");

      emptyMessage.classList.add("empty-cart-message");

      emptyMessage.textContent = "Your cart is empty. Add some products!";

      cartItemContainer.appendChild(emptyMessage);

      return;
    }

    cart.forEach(function(product) {

      const cartItem = document.createElement("div");

      cartItem.classList.add("cart-item");

      const currentTotal =
        Number(product.price) * Number(product.quantity);

      totalCart += currentTotal;


      const productInfo = document.createElement("div");

      productInfo.classList.add("product-info");


      const itemName = document.createElement("p");

      itemName.textContent = `Item: ${product.item}`;


      const itemPrice = document.createElement("p");

      itemPrice.textContent =
        `Price: $${Number(product.price).toFixed(2)}`;


      const itemQuantity = document.createElement("p");

      itemQuantity.textContent =
        `Quantity: ${product.quantity}`;


      const itemTotal = document.createElement("p");

      itemTotal.textContent =
        `Total: $${currentTotal.toFixed(2)}`;


      productInfo.appendChild(itemName);
      productInfo.appendChild(itemPrice);
      productInfo.appendChild(itemQuantity);
      productInfo.appendChild(itemTotal);

      cartItem.appendChild(productInfo);

      if (product.image) {

        const cartImage = document.createElement("img");

        cartImage.classList.add("cart-image");

        cartImage.src = product.image;

        cartImage.alt = product.item;

        cartItem.appendChild(cartImage);

      }

      const removeBtn = document.createElement("button");

      removeBtn.classList.add("remove-btn");

      removeBtn.textContent = "Remove";

      cartItem.appendChild(removeBtn);

      cartItemContainer.appendChild(cartItem);


      removeBtn.addEventListener("click", function() {

        const index = cart.findIndex(function(cartProduct) {
          return cartProduct.item === product.item;
        });

        if (index !== -1) {
          cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        cartLink.click();

      });

    });

    const grandTotal = document.createElement("div");

    grandTotal.classList.add("grand-total");

    grandTotal.textContent =
      `Cart Total: $${totalCart.toFixed(2)}`;

    cartItemContainer.appendChild(grandTotal);

  });

}

const payBtn = document.querySelector(".pay-btn");
const checkOutPage = document.querySelector(".check-out-section");
const paymentSection = document.querySelector(".payment-section");

if (payBtn && checkOutPage && cartContainer) {

  payBtn.addEventListener("click", function() {

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    cartContainer.style.display = "none";

    checkOutPage.style.display = "block";

  });

}

const emailInput = document.getElementById("emailInput");
const nameInput = document.getElementById("nameInput");
const countryInput = document.getElementById("countryInput");
const stateInput = document.getElementById("stateInput");
const cityInput = document.getElementById("cityInput");
const postalInput = document.getElementById("postalInput");
const nextButton = document.querySelector(".next-btn");

if (
  nextButton &&
  emailInput &&
  nameInput &&
  countryInput &&
  stateInput &&
  cityInput &&
  postalInput &&
  checkOutPage &&
  paymentSection
) {

  nextButton.addEventListener("click", function() {

    if (
      emailInput.value.trim() === "" ||
      nameInput.value.trim() === "" ||
      countryInput.value.trim() === "" ||
      stateInput.value.trim() === "" ||
      cityInput.value.trim() === "" ||
      postalInput.value.trim() === ""
    ) {

      alert("Please fill in the information above");

    } else {

      checkOutPage.style.display = "none";

      paymentSection.style.display = "block";

    }

  });

}

const paymentOptions =
  document.querySelectorAll('input[name="payment"]');

const cardInformation =
  document.querySelector(".card-infomation");
console.log(cardInformation);

paymentOptions.forEach(function(option) {

  option.addEventListener("click", function() {

    if (!cardInformation) {
      return;
    }

    if (option.value === "card") {

      cardInformation.style.display = "";

    } else {

      cardInformation.style.display = "none";

    }

  });

});

const payButton = document.querySelector(".submit-btn");

if (payButton) {

  payButton.addEventListener("click", function() {

    const selectedPayment =
      document.querySelector('input[name="payment"]:checked');


    if (!selectedPayment) {

      alert("Please select a payment method");

      return;

    }

    if (selectedPayment.value === "card") {

      const cardNumberInput =
        document.getElementById("cardNumber");

      const cardNameInput =
        document.getElementById("cardName");

      const expireInput =
        document.getElementById("expire");

      const cvvInput =
document.getElementById("cvv");
console.log("Card Number:", cardNumberInput);
console.log("Card Name:", cardNameInput);
console.log("Expiry:", expireInput);
console.log("CVV:", cvvInput);

      if (
        !cardNumberInput ||
        !cardNameInput ||
        !expireInput ||
        !cvvInput
      ) {

        alert("Card information fields could not be found.");

        return;

      }


      if (
        cardNumberInput.value.trim() === "" ||
        cardNameInput.value.trim() === "" ||
        expireInput.value.trim() === "" ||
        cvvInput.value.trim() === ""
      ) {

        alert("Please fill in the card information above");

        return;

      }

    }
    
    payButton.disabled = true;

    payButton.textContent = "Processing...";


    setTimeout(function() {
      payButton.textContent = "Payment Successful";
      
      cart = [];

      localStorage.setItem("cart", JSON.stringify(cart));
      document.querySelectorAll(".quantity-num").forEach(function(quantity) {

        quantity.textContent = "1";

      });
      setTimeout(function() {

        payButton.disabled = false;

        payButton.textContent = "Pay Now";

        paymentSection.style.display = "none";

        if (cartContainer) {
          cartContainer.style.display = "none";
        }

        if (checkOutPage) {
          checkOutPage.style.display = "none";
        }

        if (productContainer) {
          productContainer.style.display = "";
        }

      }, 2000);

    }, 2000);

  });

}

const backToCartBtn =
  document.getElementById("backButton");

if (backToCartBtn && checkOutPage && cartContainer) {

  backToCartBtn.addEventListener("click", function() {

    checkOutPage.style.display = "none";

    cartContainer.style.display = "block";

  });

}

const backToCheckoutBtn =
  document.getElementById("paymentBackButton");

if (
  backToCheckoutBtn &&
  paymentSection &&
  checkOutPage
) {

  backToCheckoutBtn.addEventListener("click", function() {

    paymentSection.style.display = "none";

    checkOutPage.style.display = "block";

  });
}

const productBackButton = document.getElementById("productPageBackBtn");
console.log(productBackButton);
productBackButton.addEventListener("click", function() {
  cartContainer.style.display = "none";
  productContainer.style.display = "";
})

const welcomePage = document.getElementById("welcomePage");
const startShoppingBtn = document.getElementById("startShoppingBtn");
if (welcomePage && productContainer) {
  welcomePage.style.display = "flex";
  productContainer.style.display = "none";
}
if (startShoppingBtn) {
  startShoppingBtn.addEventListener("click", function() {

    welcomePage.style.display = "none";
    productContainer.style.display = "";

  });
}