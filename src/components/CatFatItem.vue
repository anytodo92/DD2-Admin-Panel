<template>
  <q-item clickable v-ripple>
    <!-- @click="showModal" -->
    <q-item-section>
      <q-item-label class="text-blue" overline>ID: {{ _id }}</q-item-label>
      <q-item-label>{{ text }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CatFatItem",
  props: {
    _id: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      default: "",
    },
    // showModal: {
    //   type: Function,
    // },
  },
});
</script>
