<template>
  <div>
    <div class="products">
      <Product
        v-for="product in products"
        :product="product"
        :key="product.code"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Product from '@/components/Product.vue';

export default {
  components: {
    Product,
  },
  computed: {
    ...mapState(['products']),
  },
};
</script>

<style scoped lang="scss">
.products {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
</style>
