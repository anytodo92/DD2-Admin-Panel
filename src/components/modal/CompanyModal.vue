<template>
  <q-dialog v-model="visible" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">
          {{ this.data.id ? "Edit Company" : "New Company" }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="data.name" label="Name (*)" :error="!isValid.name" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="data.address" label="Address" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="data.country" label="Country" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="data.contact"
          label="Contact Number"
          :error="!isValid.contact"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="data.website"
          label="Website"
          :error="!isValid.website"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="data.email" label="Email" :error="!isValid.email" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="closeModal(false)" />
        <q-btn flat label="Save" color="primary" @click="closeModal(true)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import moment from "moment";

const defaultData = {
  id: null,
  name: null,
  address: null,
  country: null,
  contact: null,
  website: null,
  email: null,
};

const defaultValid = {
  isValid: true,
  name: true,
  address: true,
  country: true,
  contact: true,
  website: true,
  email: true,
};

const phonePattern =
  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

var linkPattern = new RegExp(
  "^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

const emailPattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export default defineComponent({
  name: "CompanyModal",
  props: {
    hideModal: { type: Function },
    modalVisible: { type: Boolean, default: false },
    modalData: { type: Object, default: null },
  },
  watch: {
    modalVisible: function (newVal, oldVal) {
      this.visible = newVal;
    },
    modalData: function (newVal, oldVal) {
      this.data = newVal ? { ...newVal } : { ...defaultData };
    },
  },
  data() {
    return {
      visible: false,
      data: { ...defaultData },
      isValid: { ...defaultValid },
    };
  },
  methods: {
    moment: function () {
      return moment();
    },
    validateData() {
      let temp = this.data;
      this.isValid = { ...defaultValid };
      if (!temp.name || temp.name == "") {
        this.isValid.name = false;
        this.isValid.isValid = false;
      }

      if (temp.contact && !phonePattern.test(temp.contact)) {
        this.isValid.contact = false;
        this.isValid.isValid = false;
      }

      if (temp.website && !linkPattern.test(temp.website)) {
        this.isValid.website = false;
        this.isValid.isValid = false;
      }

      if (temp.email && !emailPattern.test(temp.email)) {
        this.isValid.email = false;
        this.isValid.isValid = false;
      }

      console.log("this.isValid", this.isValid);
    },
    resetData: function (flag) {
      this.data = flag
        ? { ...this.modalData }
          ? { ...this.modalData }
          : { ...defaultData }
        : { ...defaultData };

      this.isValid = { ...defaultValid };
    },
    closeModal: function (flag) {
      if (flag) {
        this.validateData();
        if (!this.isValid.isValid) return;
      }
      this.hideModal({ ...this.data }, flag);
      this.resetData(false);
    },
  },
});
</script>
