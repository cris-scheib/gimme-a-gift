
<template>
  <div class="content">
    <b-row>
      <b-col cols="12" md="6" xl="4">
        <b-card class="new-product" no-body v-if="isAdmin">
          <b-card-body class="center">
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
  border: unset;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  border-radius: 1rem;
  cursor: pointer;
}
.card.new-product .card-body {
  height: 12em;
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
</style>