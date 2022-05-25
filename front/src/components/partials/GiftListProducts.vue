
<template>
  <div class="content">
    <b-row>
      <modal-products />
      <b-col cols="12" md="6" xl="4">
        <b-card
          class="new-product"
          no-body
          v-if="isAdmin"
          v-b-modal.modal-products
          key="product-modal"
        >
          <b-card-body class="center">
            <div>
              <div class="center mb-2">
                <div class="icon-content">
                  <b-icon icon="plus-lg"></b-icon>
                </div>
              </div>
              <p class="text-center m-0">Adicionar novo <br />produto</p>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col
        cols="12"
        md="6"
        xl="4"
        v-for="(product, index) in list.products"
        :key="product.productId"
      >
        <modal-product
          :product="product"
          :listProduct="list.listProduct[index]"
        />
        <b-card
          class="existing-product"
          no-body
          v-b-modal="`modal-product-${product._id}`"
        >
          <b-card-body class="center">
            <div>
              <div class="img-content">
                <img
                  :src="product.photos[0]"
                  :alt="product.name"
                  class="img-fluid"
                />
              </div>
              <h6 class="product-title">{{ product.name }}</h6>
              <p class="product-value">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.value)
                }}
              </p>
              <p class="product-shop">
                <small>{{ product.shop }}</small>
              </p>
              <b-button variant="primary">Ver mais</b-button>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import ModalProduct from "../modals/modalProduct.vue";
import modalProducts from "../modals/modalProducts.vue";
export default {
  components: { modalProducts, ModalProduct },
  props: ["list"],
  data() {
    return {
      isAdmin: true,
    };
  },
};
</script>
<style scope>
.content {
  padding: 0.375rem 0.75rem;
}
.card.new-product,
.card.existing-product {
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  border-radius: 1rem;
  margin-bottom: 1em;
  cursor: pointer;
}
.card.new-product .card-body {
  height: 23em;
}
.icon-content {
  padding: 1.2em;
  background-color: #d78db3;
  height: 0.7em;
  width: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: white;
}
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #69b0b1;
  margin-top: 0.5em;
}
.product-value {
  color: #d78db3;
  margin: 0;
}
.product-shop {
  color: #a3a3a3;
}
.img-content {
  height: 11em;
}
.img-content .img-fluid {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>