<template>
  <q-dialog v-model="visible" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ modalData._id }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ modalData.text }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ moment(modalData.createdAt).format("MMMM Do YYYY, h:mm:ss a") }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ moment(modalData.updatedAt).format("MMMM Do YYYY, h:mm:ss a") }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Close"
          color="primary"
          v-close-popup
          @click="closeModal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import moment from "moment";

export default defineComponent({
  name: "CatFatDetailModal",
  props: {
    hideModal: { type: Function },
    modalVisible: { type: Boolean, default: false },
    modalData: { type: Object, default: null },
  },
  watch: {
    modalVisible: function (newVal, oldVal) {
      this.visible = newVal;
    },
  },
  data() {
    return {
      visible: ref(false),
    };
  },
  methods: {
    moment: function () {
      return moment();
    },
    closeModal: function () {
      this.hideModal();
    },
  },
});
</script>
