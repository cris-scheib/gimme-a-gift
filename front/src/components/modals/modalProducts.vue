
<template>
  <b-modal
    ref="modal-product"
    id="modal-product"
    title="Adicionar produto"
    hide-footer
    size="lg"
  >
    <b-container fluid>
      <b-input-group>
        <b-form-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Nome do produto"
          required
          class="input-product"
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="secondary" class="btn-product">Buscar</b-button>
        </b-input-group-append>
      </b-input-group>
      <div class="pt-3">
        <b-row>
          <b-col cols="12" lg="6" v-for="product in products" :key="product.id">
            <b-card>
              <b-carousel id="carousel-product" :interval="4000" indicators>
                <b-carousel-slide
                  v-for="photo in product.photos"
                  :key="photo"
                  :img-src="photo"
                ></b-carousel-slide>
              </b-carousel>
              <div>
                <b-link :href="product.link" target="_blank">
                  <h5 class="product-title">{{ product.name }}</h5>
                </b-link>
                <p class="product-description">{{ product.shop }}</p>
                <h6 class="product-value">
                  <strong>
                    {{
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.value)
                    }}
                  </strong>
                </h6>
                <p class="product-description">
                  <small> {{ product.description }}</small>
                </p>
                <div class="d-flex align-items-center">
                  <b-link
                    class="product-link"
                    :href="product.link"
                    target="_blank"
                    >Ir para o site</b-link
                  >
                  <b-button variant="primary" class="btn-new-product"
                    >Adicionar a lista</b-button
                  >
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      listId: this.$route.params.id,
      products: [],
    };
  },
  created() {
    this.$api
      .get(`/products/`)
      .then((res) => res.data)
      .then((data) => {
        this.products = data.docs;
      });
  },
  methods: {
    close() {
      this.$refs["modal-product"].hide();
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    addProduct() {
      console.log("ok");
    },
  },
};
</script>
<style scoped>
.form-control {
  border-radius: 1rem !important;
  border: 1px solid #a3a3a3;
}
.input-product {
  border-top-right-radius: unset !important;
  border-bottom-right-radius: unset !important;
}
.btn-product {
  border-top-right-radius: 1rem !important;
  border-bottom-right-radius: 1rem !important;
  background-color: #d78db3;
  border-color: #d78db3;
}
.card {
  border-radius: 1em;
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  position: relative;
  overflow: hidden;
  margin-bottom: 1em;
}

.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #69b0b1;
  margin-top: 0.5em;
}
.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #a3a3a3;
  line-height: 1;
}
.product-value {
  color: #d78db3;
}
.product-link {
  color: #69b0b1;
}
.btn-new-product {
  width: unset;
  margin-left: auto;
  padding: 0.5rem 1rem;
}
</style>

