import Vue from 'vue';
import Vuex from 'vuex';
import items from '@/db.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: items.products,
    cartProducts: [],
  },
  mutations: {
    addToCart(state, product) {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.code === product.code && item.color === product.color,
      );

      if (itemIndex !== -1) {
        state.cartProducts[itemIndex].pieces += product.pieces;
      } else {
        state.cartProducts.push(product);
      }
    },
    removeFromCart(state, cartProduct) {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.code === cartProduct.code && item.color === cartProduct.color,
      );
      state.cartProducts.splice(itemIndex, 1);

      const productIndex = state.products.findIndex((product) => product.code === cartProduct.code);
      const subproductIndex = state.products[productIndex].subproducts
        .findIndex((subproduct) => cartProduct.color === subproduct.color);

      state.products[productIndex].subproducts[subproductIndex].count += cartProduct.pieces;
    },
    emptyCart(state) {
      state.cartProducts.forEach((item) => {
        const productIndex = state.products.findIndex((product) => item.code === product.code);
        const subproductIndex = state.products[productIndex].subproducts
          .findIndex((subproduct) => item.color === subproduct.color);

        state.products[productIndex].subproducts[subproductIndex].count += item.pieces;
      });

      state.cartProducts = [];
    },
    clearCart(state) {
      state.cartProducts = [];
    },
  },
  actions: {
    addToCart: ({ commit }, product) => commit('addToCart', product),
    removeFromCart: ({ commit }, cartProduct) => commit('removeFromCart', cartProduct),
    emptyCart: ({ commit }) => commit('emptyCart'),
    clearCart: ({ commit }) => commit('clearCart'),
  },
  getters: {
    total: (state) => {
      let total = 0;
      state.cartProducts.forEach((item) => {
        total += item.pieces * item.price;
      });
      return total;
    },
  },
});
