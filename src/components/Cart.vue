<template>
  <div id="cart">
    <img
      class="cart-img"
      alt="Cart"
      src="@/assets/cart.png"
      @click="showCart"
    />
    <div id="cartModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div v-if="cartProducts.length">
          <div
            class="cart-product"
            v-for="product in cartProducts"
            :key="`${product.code}_${product.color}`"
          >
            <button @click="removeFromCart(product)">x</button>
            <p>{{ product.code }}</p>
            <p>color: {{ product.color }}</p>
            <p>pieces: {{ product.pieces }}</p>
            <p>price: {{ product.price }}$ / per piece</p>
          </div>
          <p>Total: {{ total }}$</p>
          <button @click="emptyCart">Empty cart</button>
          <button>
            <router-link
              :to="{
                name: 'SubmitCart',
                params: { approvePath: true, cartData: cartProducts }
              }"
              >Submit cart</router-link
            >
          </button>
        </div>
        <div v-else>
          Your shop cart is so empty!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  methods: {
    showCart() {
      // Get the modal
      const cartModal = document.getElementById('cartModal');
      // Get the <span> element that closes the modal
      const btnClose = document.getElementsByClassName('close')[0];
      // When the user clicks the button, open the modal
      cartModal.style.display = 'block';
      // When the user clicks on (x), close the modal
      btnClose.onclick = function () {
        cartModal.style.display = 'none';
      };
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target === cartModal) {
          cartModal.style.display = 'none';
        }
      };
    },
    emptyCart() {
      this.$store.dispatch('emptyCart');
    },
    removeFromCart(cartProduct) {
      this.$store.dispatch('removeFromCart', cartProduct);
    },
  },
  computed: {
    ...mapState(['cartProducts']),
    ...mapGetters(['total']),
  },
};
</script>

<style scoped lang="scss">
.cart-img {
  width: 10%;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
}
.cart-product {
  margin: 10px 0;
  border-bottom: 1px solid #888;
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding: 5% 0; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 90%; /* Full height - padding */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 3px solid #c44141;
  width: 80%;
}
/* The Close Button */
.close {
  color: #c44141;
  float: right;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    color: #000;
    cursor: pointer;
  }
}
a {
  color: #000;
  text-decoration: none;
}
</style>
