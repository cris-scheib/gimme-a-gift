
<template>
  <b-modal
    :ref="`modal-product-${product._id}`"
    :id="`modal-product-${product._id}`"
    title="Adicionar produto"
    hide-footer
    size="lg"
  >
    <b-container fluid> {{ product }} </b-container>
  </b-modal>
</template>

<script>
export default {
  props: ["product", "listProduct"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
</style>

