<template>
  <div class="container">
    <h1>Submit cart form</h1>
    <form class="form" action="">
      <div class="form-group">
        <label for="name">Full name:</label>
        <input
          v-model.trim="$v.name.$model"
          type="text"
          name="name"
          placeholder="John M. Doe"
          :disabled="uiState === 'form submitted'"
        />
        <p class="error" v-if="!$v.name.required && $v.name.$anyDirty">
          Name is required.
        </p>
        <p class="error" v-else-if="!$v.name.minLength">
          Field must have min {{ $v.name.$params.minLength.min }} characters.
        </p>
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input
          v-model.trim="$v.address.$model"
          type="text"
          name="address"
          placeholder="Kosovska 15, Beograd"
          :disabled="uiState === 'form submitted'"
        />
        <p class="error" v-if="!$v.address.required && $v.address.$anyDirty">
          Adrress is required.
        </p>
        <p class="error" v-else-if="!$v.address.minLength">
          Field must have min {{ $v.address.$params.minLength.min }} characters.
        </p>
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input
          v-model.trim="$v.email.$model"
          type="email"
          name="email"
          placeholder="john@example.com"
          :disabled="uiState === 'form submitted'"
        />
        <p class="error" v-if="!$v.email.required && $v.email.$anyDirty">
          E-mail is required.
        </p>
        <p class="error" v-else-if="!$v.email.email">
          Needs to be a valid email.
        </p>
      </div>
      <div class="form-group">
        <label for="tel">Telephone:</label>
        <input
          v-model.trim="$v.tel.$model"
          type="text"
          name="tel"
          placeholder="+38163777777"
          :disabled="uiState === 'form submitted'"
        />
        <p class="error" v-if="!$v.tel.required && $v.tel.$anyDirty">
          Telephone number is required.
        </p>
        <p class="error" v-else-if="!$v.tel.isValidTel && $v.tel.$anyDirty">
          Needs to be a valid telephone number +3816*******.
        </p>
      </div>
      <div class="form-group">
        <input
          type="submit"
          @click.prevent="submitCart"
          value="Order"
          :disabled="uiState === 'form submitted'"
        />
        <p v-if="errors" class="error">
          The form above has errors, please get your act together and resubmit!
        </p>
        <p v-else-if="empty && uiState === 'submit clicked'" class="error">
          The form above is empty, you can't submit an empty form!
        </p>
        <p v-else-if="uiState === 'form submitted'" class="success">
          Hooray! Your form was submitted!
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  props: ['cartData'],
  data() {
    return {
      name: null,
      address: null,
      email: null,
      tel: null,
      uiState: 'submit not clicked',
      errors: false,
      empty: true,
    };
  },
  validations: {
    name: { required, minLength: minLength(5) },
    address: { required, minLength: minLength(7) },
    email: { required, email },
    tel: {
      required,
      isValidTel: (value) => /^\+3816\d{7,8}$/.test(value),
    },
  },
  methods: {
    submitCart() {
      this.uiState = 'submit clicked';
      this.empty = !this.$v.name.$anyDirty
        && !this.$v.address.$anyDirty
        && !this.$v.email.$anyDirty
        && !this.$v.tel.$anyDirty;
      if (!this.empty) {
        this.$v.$touch();
      }
      this.errors = this.$v.$anyError;
      if (!this.errors && !this.empty) {
        console.log('buyer data:', this.name, this.address, this.email, this.tel);
        console.log('cart data:', this.cartData);
        this.uiState = 'form submitted';
        this.$store.dispatch('clearCart');
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.uiState === 'form submitted') {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals
      const confirmLeave = confirm('If you navigate from this page, your data will be lost!');
      if (confirmLeave) {
        this.$router.go();
      } else {
        next(false);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 70%;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  background-color: #f2f2f2;
}
label {
  display: inline-block;
  width: 20%;
  color: #769cce;
}
input[type="text"],
input[type="email"] {
  box-sizing: border-box;
  width: 70%;
  margin: 10px 0;
  padding: 10px;
  color: #769cce;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input[type="submit"] {
  width: 35%;
  margin: 15px 0;
  padding: 10px 20px;
  background-color: #5b60a5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #292e6d;
  }
  &:disabled {
    background: #ccc;
    cursor: default;
  }
}
.error {
  color: #f03e3e;
}
.success {
  color: #5b60a5;
}
</style>
