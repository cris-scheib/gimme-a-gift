
<template>
  <b-modal
    :ref="`modal-product-${product._id}`"
    :id="`modal-product-${product._id}`"
    title="Dados do produto"
    hide-footer
    size="lg"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" lg="6">
          <b-link :href="product.link" target="_blank">
            <img class="img-fluid" :src="image" :alt="product.name" />
          </b-link>
          <b-row>
            <b-col
              cols="6"
              lg="4"
              v-for="photo in product.photos"
              :key="photo"
              class="img-content-secondary"
            >
              <img
                class="img-fluid img-secondary"
                :src="photo"
                :alt="product.name"
                @click="definePrimaryImage(photo)"
              />
            </b-col>
          </b-row>
          <p
            v-bind:class="description ? 'description-show' : 'description-hide'"
          >
            <small>{{ product.description }}</small>
          </p>
          <div class="d-flex justify-content-end">
            <b-button @click="description = !description" class="btn-hide">
              <small>Ver {{ description ? "menos" : "mais" }}</small>
            </b-button>
          </div>
        </b-col>
        <b-col cols="12" lg="6">
          <b-link :href="product.link" target="_blank">
            <h5 class="product-title">{{ product.name }}</h5>
          </b-link>
          <div class="d-flex">
            <div>
              <p class="price-title"><small>Preço do produto</small></p>
              <h4 class="product-value">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.value)
                }}
              </h4>
              <p class="m-0" v-if="bought">Comprado</p>
            </div>
            <b-dropdown right class="dropdown-no-style ml-auto" v-if="isAdmin">
              <template #button-content>
                <b-icon
                  icon="three-dots-vertical"
                  class="three-dots-products"
                ></b-icon>
              </template>
              <b-dropdown-item @click="confirmModal()"
                >Remover produto</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <hr />
          <b-card no-body class="m-3 card-payments">
            <b-card-header class="d-flex">
              <b-icon class="mt-auto mb-auto" icon="credit-card"></b-icon>
              <div class="ml-auto">
                <p class="m-0 text-center"><strong>Pagamentos</strong></p>
              </div>
            </b-card-header>
            <b-card-body>
              <b-list-group>
                <b-list-group-item
                  v-for="payment in payments"
                  :key="payment._id"
                  class="list-users"
                  :id="payment._id"
                >
                  <img
                    alt="Avatar"
                    :src="
                      payment.user[0].photo == null
                        ? require('@/assets/user-icon.svg')
                        : dir + payment.user[0].photo
                    "
                    class="photo"
                  />
                  <p class="m-0 pl-2">{{ payment.user[0].name }}</p>
                  <p class="m-0 pl-2 ml-auto price-title">
                    <small v-if="payment.user[0]._id === userId">
                      {{
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(payment.value)
                      }}
                    </small>
                    <small v-else
                      >R$
                      <span class="hidden-value"
                        >&emsp;&emsp;&emsp;</span
                      ></small
                    >
                  </p>
                  <b-button
                    title="Remover pagamento"
                    class="btn-remove-payment"
                    v-if="payment.user[0]._id === userId"
                    @click="confirmModalPayment(payment._id)"
                    >x</b-button
                  >
                </b-list-group-item>
                <b-list-group-item
                  class="list-users add-user center"
                  v-b-modal="`modal-payment-${product._id}`"
                  v-if="!bought"
                >
                  Ajudar com algum Valor
                </b-list-group-item>
                <modal-payment
                  :product="product"
                  :list="list"
                  :buyable="payments.length === 0"
                  @sycPayments="getPayments"
                />
              </b-list-group>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import ModalPayment from "./modalPayment.vue";
export default {
  components: { ModalPayment },
  props: ["product", "list", "isAdmin"],
  data() {
    return {
      image: this.product.photos[0],
      description: false,
      dir: `http://${process.env.VUE_APP_API_URL}:${+process.env
        .VUE_APP_API_PORT}/`,
      payments: [],
      userId: null,
      bought: false,
    };
  },
  created() {
    this.getPayments();
    this.userId = localStorage.getItem("id");
  },
  methods: {
    definePrimaryImage(photo) {
      this.image = photo;
    },
    getPayments() {
      this.$api
        .get(`/payments/`, {
          params: {
            listId: this.list._id,
            productId: this.product._id,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          this.payments = data;
          this.bought =
            this.payments
              .map((item) => item.value)
              .reduce((prev, next) => prev + next) === this.product.value;
        });
    },
    confirmModal() {
      this.$bvModal
        .msgBoxConfirm(`Remover o produto da lista de presentes?`, {
          title: `Remover o produto`,
          centered: true,
          okTitle: "Remover",
          cancelVariant: "info",
          cancelTitle: "Cancelar",
          id: "remove",
        })
        .then((value) => {
          // Value é true quando confirmado e undefined para quando clica fora do modal
          if (value) this.removeProduct();
        });
    },
    confirmModalPayment(id) {
      this.$bvModal
        .msgBoxConfirm(`Remover o seu pagamento deste presentes?`, {
          title: `Remover o pagamento`,
          centered: true,
          okTitle: "Remover",
          cancelVariant: "info",
          cancelTitle: "Cancelar",
          id: "remove",
        })
        .then((value) => {
          // Value é true quando confirmado e undefined para quando clica fora do modal
          if (value) this.removePayment(id);
        });
    },
    removeProduct() {
      this.$api
        .delete(`/list-product/${this.$route.params.id}/${this.product._id}`)
        .then(() => {
          this.close();
          this.$emit("refresh-data");
        })
        .catch((error) => {
          this.close();
          this.makeToast("danger", error.message);
        });
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    close() {
      this.$refs[`modal-product-${this.product._id}`].hide();
    },
    removePayment(id) {
      this.$api
        .delete(`/payments/${id}`)
        .then(() => {
          this.getPayments();
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
.img-secondary {
  margin: 1em 0;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  cursor: pointer;
  padding-right: 10px;
  padding-left: 10px;
}
.img-content-secondary {
  padding: 0;
}
.description-hide,
.description-show {
  color: #a3a3a3;
  margin: 0;
}
.description-hide {
  max-height: 6em;
  overflow: hidden;
}
.btn-remove-payment,
.btn-remove-payment:hover,
.btn-remove-payment:focus,
.btn-remove-payment:active {
  padding: 0;
  background-color: unset !important;
  border: unset;
  color: inherit !important;
  margin-left: 0.5em;
}
.description-show {
  max-height: unset;
  overflow: unset;
}
.price-title {
  color: #a3a3a3;
  margin: 0;
}
.hidden-value {
  background-color: #d9d9d9;
  border-radius: 6px;
}
.btn-hide,
.btn-hide:focus,
.btn-hide:hover,
.btn-hide:active {
  background-color: unset !important;
  border: unset !important;
  color: #a3a3a3 !important;
  outline: unset !important;
}
.card-header {
  color: white;
  background: linear-gradient(45deg, #d78db3, #f4d562);
  border-top-left-radius: 1rem !important;
  border-top-right-radius: 1rem !important;
}
.card-payments {
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  border-radius: 1rem !important;
}
.card-payments.disabled {
  opacity: 0.7;
}
</style>
