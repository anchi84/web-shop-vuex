<template>
  <div class="home">
    <img class="logo" alt="web shop logo" src="@/assets/logo.png" />
    <h1>Welcome to car toys web shop</h1>
    <Products />
    <Cart />
  </div>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue';
import Cart from '@/components/Cart.vue';

export default {
  components: {
    Products,
    Cart,
  },
};
</script>

<style scoped>
.logo {
  width: 20%;
  margin: 10px;
}
</style>
