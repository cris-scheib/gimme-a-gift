
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
          <b-form-checkbox
            id="buyable"
            v-model="bought"
            name="buyable"
            value="true"
          >
            Assumo a compra e entrega do produto
          </b-form-checkbox>
          <b-card
            no-body
            class="m-3 card-payments"
            v-bind:class="bought ? 'disabled' : ''"
          >
            <b-card-header class="d-flex">
              <b-icon class="mt-auto mb-auto" icon="credit-card"></b-icon>
              <div class="ml-auto">
                <p class="m-0 text-center"><strong>Pagamentos</strong></p>
              </div>
            </b-card-header>
            <b-card-body>
              <b-list-group>
                <b-list-group-item
                  v-for="payment in listProduct.payments"
                  :key="payment._id"
                  class="list-users"
                  :id="payment._id"
                >
                  <img
                    alt="Avatar"
                    :src="
                      payment.photo == null
                        ? require('@/assets/user-icon.svg')
                        : dir + payment.photo
                    "
                    class="photo"
                  />
                  <p class="m-0 pl-2">{{ payment.name }}</p>
                </b-list-group-item>
                <b-list-group-item
                  class="list-users add-user center"
                  v-b-modal.modal-invite
                  :disabled="bought === 'true'"
                >
                  Ajudar com algum Valor
                </b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  props: ["product", "listProduct", "isAdmin"],
  data() {
    return {
      image: this.product.photos[0],
      description: false,
      bought: !this.listProduct.buyable,
    };
  },
  methods: {
    definePrimaryImage(photo) {
      this.image = photo;
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
    removeProduct() {
      this.$api
        .delete(`/list-product/${this.$route.params.id}/${this.product._id}`)
        .then(() => {
          this.close()
        })
        .catch((error) => {
          this.close();
          this.makeToast("danger", error.message);
        });
    },
    close() {
      this.$refs[`modal-product-${this.product._id}`].hide();
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
.description-show {
  max-height: unset;
  overflow: unset;
}
.price-title {
  color: #a3a3a3;
  margin: 0;
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
