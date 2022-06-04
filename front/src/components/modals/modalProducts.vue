
<template>
  <b-modal
    ref="modal-products"
    id="modal-products"
    title="Adicionar produto"
    hide-footer
    size="xl"
  >
    <b-container fluid>
      <b-input-group>
        <b-form-input
          id="search"
          v-model="search"
          type="text"
          placeholder="Pesquisar produto"
          required
          class="input-product"
        ></b-form-input>
        <b-input-group-append>
          <b-button
            variant="secondary"
            @click="getProducts()"
            class="btn-product"
            >Buscar</b-button
          >
        </b-input-group-append>
      </b-input-group>
      <div class="products-content">
        <b-row>
          <b-col
            cols="12"
            xl="4"
            lg="6"
            v-for="product in products"
            :key="product._id"
          >
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
                  <b-button
                    variant="primary"
                    class="btn-new-product"
                    @click="addProduct(product._id)"
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
      listId: this.$route.params.id,
      products: [],
      search: "",
      page: 1,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const { page, search } = this;
      this.$api
        .get(`/products/`, { params: { page, search } })
        .then((res) => res.data)
        .then((data) => {
          this.products = data.docs;
        });
    },
    close() {
      this.$refs["modal-products"].hide();
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    addProduct(product) {
      this.$api
        .post(`/list-product/`, {
          productId: product,
          listId: this.$route.params.id,
        })
        .then((res) => {
          this.makeToast("success", res.data.message);
          this.close()
          this.$emit("refresh-data");
        });
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
}
.btn-product,
.btn-product:hover,
.btn-product:focus,
.btn-product:active {
  background-color: #d78db3 !important;
  border-color: #d78db3 !important;
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
.products-content {
  max-height: 69vh;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 1em;
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

