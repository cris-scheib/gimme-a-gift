
<template>
  <b-modal
    :ref="`modal-product-${product._id}`"
    :id="`modal-product-${product._id}`"
    title="Dados do produto"
    hide-footer
    size="xl"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="12" lg="6">
          <img class="img-fluid" :src="image" :alt="product.name" />
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
          <h5 class="product-title">{{ product.name }}</h5>
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
          <b-form-checkbox
            id="buyable"
            v-model="bought"
            name="buyable"
            value="true"
          >
            Assumo a compra e entrega do produto
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  props: ["product", "listProduct"],
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
.btn-hide,
.btn-hide:focus,
.btn-hide:hover,
.btn-hide:active {
  background-color: unset !important;
  border: unset !important;
  color: #a3a3a3 !important;
  outline: unset !important;
}
</style>

