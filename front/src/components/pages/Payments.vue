<template>
  <layout>
    <div class="page-content">
      <b-container>
        <h4>Meus pagamentos</h4>
        <b-table
          class="payments-table"
          :items="payments"
          :fields="fields"
        >
          <template #cell(list)="data">
            <a
              :href="`/lista-de-presentes/${data.item.list[0]._id}`"
              target="_blank"
              class="list-link"
            >
              {{ data.item.list[0].name }}</a
            >
          </template>
          <template #cell(product)="data">
            {{ data.item.product[0].name }}
          </template>
          <template #cell(value)="data">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(data.value)
            }}
          </template>
          <template #cell(createdAt)="data">
            {{ moment(data.unformatted).format("DD/MM/YYYY HH:mm:ss") }}
          </template>
        </b-table>
      </b-container>
    </div>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      payments: [],
      fields: [
        { key: "list", label: "Lista" },
        { key: "product", label: "Produto" },
        { key: "value", label: "Valor" },
        { key: "createdAt", label: "Data/Hora" },
      ],
    };
  },
  created() {
    this.getPayments();
  },
  methods: {
    getPayments() {
      this.$api
        .get(`/my-payments/`)
        .then((res) => res.data)
        .then((data) => {
          this.payments = data;
        });
    },
  },
};
</script>
<style scoped>
.list-link {
  color: #69b0b1;
}
</style>
