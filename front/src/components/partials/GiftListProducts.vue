
<template>
  <div class="content">
    <b-row>
      <b-col cols="12" lg="6">
        <b-card class="new-product" v-if="isAdmin">
          <b-card-body>
            <div>
              <div class="center mb-2">
                <div class="icon-content">
                  <b-icon icon="plus-lg"></b-icon>
                </div>
              </div>
              <p class="text-center m-0">Adicinar novo <br />produto</p>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
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
.card.new-product {
  border-radius: 1em;
  border: 2px dashed #d78db3;
  cursor: pointer;
  height: 10em;
  position: relative;
  overflow: hidden;
}
.card.new-product .card-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-content {
  padding: 1.2em;
  background-color: #d78db3;
  height: .7em;
  width: .7em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: white;
}
</style>