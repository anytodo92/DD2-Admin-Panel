<template>
  <div>Cat Fat Data</div>
  <CatFatItem
    v-for="data in catFactData"
    :key="data._id"
    v-bind="data"
    @click="showModal(data)"
  />
  <CatFatDetailModal
    :modalVisible="modalVisible"
    :modalData="modalData"
    :hideModal="hideModal"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import { loadCatFacts } from "../actions";
import CatFatItem from "components/CatFatItem.vue";
import CatFatDetailModal from "components/modal/CatFatDetailModal.vue";

export default defineComponent({
  name: "app-dashboard",
  components: {
    CatFatDetailModal,
    CatFatItem,
  },
  data() {
    return {
      catFactData: [],
      modalData: null,
      modalVisible: ref(false),
    };
  },
  mounted() {
    this.loadInitialData();
  },

  methods: {
    async loadInitialData() {
      const catFacts = await loadCatFacts();
      this.catFactData = catFacts.data;
    },
    showModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    hideModal() {
      this.modalVisible = false;
      this.modalData = null;
    },
  },
});
</script>
