<template>
  <div class="product">
    <p>{{ product.name }}</p>
    <p>{{ product.description }}</p>
    <div class="product-colors">
      <button
        class="color"
        v-for="subproduct in product.subproducts"
        :key="subproduct.color"
        :style="{ backgroundColor: subproduct.color }"
        :class="selectedSubproduct.color === subproduct.color ? 'selected' : ''"
        @click="selectColor(subproduct)"
      ></button>
      <div>{{ selectedSubproduct.price }}$ / per piece</div>
      <div>
        {{ selectedSubproduct.count }}
        {{ selectedSubproduct.count === 1 ? "piece" : "pieces" }} available
      </div>
      <button class="decrement" @click="decrement">-</button>
      <span class="count">{{ selectedSubproduct.pieces }}</span>
      <button class="increment" @click="increment">+</button>
      <div>
        <button
          class="add-to-cart"
          @click="addToCart"
          :disabled="selectedSubproduct.pieces === 0"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      selectedSubproduct: this.product.subproducts[0],
    };
  },
  methods: {
    selectColor(subproduct) {
      this.selectedSubproduct = subproduct;
      if (!this.selectedSubproduct.addedToCart) {
        if (!('pieces' in this.selectedSubproduct)) {
          this.selectedSubproduct.pieces = 0;
        }
      } else {
        this.selectedSubproduct.pieces = 0;
      }
    },
    decrement() {
      this.selectedSubproduct.addedToCart = false;
      if (this.selectedSubproduct.pieces > 0) {
        this.selectedSubproduct.pieces -= 1;
        this.selectedSubproduct.count += 1;
      }
    },
    increment() {
      this.selectedSubproduct.addedToCart = false;
      if (this.selectedSubproduct.count > 0) {
        this.selectedSubproduct.pieces += 1;
        this.selectedSubproduct.count -= 1;
      }
    },
    addToCart() {
      const cartProduct = {
        code: this.selectedSubproduct.code,
        color: this.selectedSubproduct.color,
        pieces: this.selectedSubproduct.pieces,
        price: this.selectedSubproduct.price,
      };
      this.selectedSubproduct = {
        ...this.selectedSubproduct,
        ...{
          pieces: 0,
          addedToCart: true,
        },
      };
      this.$store.dispatch('addToCart', cartProduct);
    },
  },
  watch: {
    selectedSubproduct() {
      const subprodactIndex = this.product.subproducts.findIndex(
        (subproduct) => subproduct.color === this.selectedSubproduct.color,
      );
      this.product.subproducts[subprodactIndex] = this.selectedSubproduct;
    },
  },
  created() {
    this.product.subproducts.forEach(
      (subproduct) => { Object.assign(subproduct, { code: this.product.code }); },
    );
    if (!('pieces' in this.selectedSubproduct)) {
      this.selectedSubproduct.pieces = 0;
    }
  },
};
</script>

<style scoped lang="scss">
.product {
  box-sizing: border-box;
  border: 5px inset #c44141;
  margin: 1%;
  min-width: 23%;
}
.product-colors {
  padding: 10px;
  border-top: 2px solid #c44141;
}
.color {
  margin: 10px;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  &.selected {
    width: 25px;
    height: 25px;
  }
}
.increment,
.decrement {
  margin: 5px;
}
.add-to-cart {
  width: 100px;
  margin: 10px 0;
  &:disabled {
    cursor: not-allowed;
  }
}
</style>
