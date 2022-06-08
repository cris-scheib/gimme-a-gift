
<template>
  <b-modal
    :ref="`modal-payment-${product._id}`"
    :id="`modal-payment-${product._id}`"
    centered
    title="Realizar pagamento"
  >
    <b-form-group id="input-group" v-if="!bought">
      <b-form-input
        id="value"
        v-model="value"
        type="number"
        placeholder="Valor"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-checkbox
      id="buyable"
      v-model="bought"
      v-if="buyable"
      name="buyable"
      :value="true"
    >
      Assumo a compra e entrega do produto
    </b-form-checkbox>
    <template #modal-footer>
      <div class="w-100 flex-end">
        <b-button variant="secondary" @click="close()" class="btn-cancel mr-2">
          Cancelar
        </b-button>
        <b-button variant="primary" @click="sendPayment()">
          Confirmar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["product", "list", "buyable"],
  data() {
    return {
      value: "",
      bought: false,
    };
  },
  methods: {
    close() {
      this.$refs[`modal-payment-${this.product._id}`].hide();
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    getTrueValue() {
      if (this.bought) {
        return this.product.value;
      } else {
        return this.value;
      }
    },
    sendPayment() {
      this.$api
        .post(`/payments/`, {
          productId: this.product._id,
          listId: this.list._id,
          value: this.getTrueValue(),
        })
        .then(() => {
          this.$emit("sycPayments");
          this.value = "";
          this.close();
        })
        .catch((error) => {
          this.close();
          this.makeToast("danger", error.message);
        });
    },
  },
};
</script>
<style scoped>
.form-control {
  border-radius: 1rem !important;
  border: 1px solid #e1e1e1;
}
</style>

