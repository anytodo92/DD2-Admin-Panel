<template>
  <div class="q-pa-sm">
    <div class="text-h6">Company page</div>
    <q-table
      title="Treats"
      :rows="appStore.companyList"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      :filter-method="customFilter"
    >
      <template v-slot:top-right>
        <q-input dense v-model="search" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" label="Add" @click="showModal" size="10px" />
        <q-btn
          class="q-ml-sm"
          color="primary"
          label="Remove"
          @click="removeCompany"
          size="10px"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="editRow(props)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteRow(props)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <CompanyModal
    :modalVisible="modalVisible"
    :hideModal="hideModal"
    :appStore="appStore"
    :modalData="modalData"
  />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAppStore } from "../stores/store";
import CompanyModal from "components/modal/CompanyModal.vue";

export default defineComponent({
  name: "CompanyPage",
  components: {
    CompanyModal,
  },
  setup() {
    const appStore = useAppStore();

    window.stores = { appStore };

    return {
      appStore,
    };
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Company",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "address",
          align: "center",
          label: "Address",
          field: "address",
          sortable: true,
        },
        {
          name: "country",
          align: "center",
          label: "Country",
          field: "country",
          sortable: true,
        },
        {
          name: "contact",
          align: "center",
          label: "Contact Number",
          field: "contact",
          sortable: true,
        },
        {
          name: "website",
          align: "center",
          label: "Website",
          field: "website",
          sortable: true,
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true,
        },
        { name: "actions", label: "Actions", field: "", align: "center" },
      ],
      companyData: [],
      selected: ref([]),
      modalVisible: ref(false),
      modalData: null,
      search: "",
    };
  },
  computed: {
    filter() {
      return {
        search: this.search,
      };
    },
  },
  methods: {
    showModal: function () {
      this.modalVisible = true;
      this.modalData = null;
    },
    hideModal(data, flag) {
      this.modalVisible = false;
      this.modalData = null;
      flag && this.addCompany(data);
    },
    addCompany: function (data) {
      this.appStore.add(data);
    },
    removeCompany: function () {
      let idList = this.selected.map((item) => item.id);
      this.appStore.remove(idList);
    },
    deleteRow: function (data) {
      this.appStore.remove([data.row.id]);
    },
    editRow: function (data) {
      this.modalData = data.row;
      this.modalVisible = true;
    },
    containString(str1, str2) {
      return str1.indexOf(str2) > -1;
    },
    customFilter(rows, terms) {
      const filteredRows = rows.filter((row, i) => {
        if (terms.search && terms.search !== "") {
          console.log(row);
          if (this.containString(row.name, terms.search)) return true;
          if (
            row.address &&
            row.address !== "" &&
            this.containString(row.address, terms.search)
          )
            return true;
          if (
            row.country &&
            row.country !== "" &&
            this.containString(row.country, terms.search)
          )
            return true;
          if (
            row.contact &&
            row.contact !== "" &&
            this.containString(row.contact, terms.search)
          )
            return true;
          if (
            row.website &&
            row.website !== "" &&
            this.containString(row.website, terms.search)
          )
            return true;
          if (
            row.email &&
            row.email !== "" &&
            this.containString(row.email, terms.search)
          )
            return true;
          return false;
        } else return true;
      });
      return filteredRows;
    },
  },
});
</script>
