import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAppStore = defineStore({
  id: 'company',
  state: () => {
    return {
      companyList: localStorage.getItem('companyList') ? JSON.parse(localStorage.getItem('companyList')) : [],
    }
  },

  actions: {
    /**
     * @param {any} company
     */
    add(company) {
      let temp = [...this.companyList];
      let newList;
      console.log(company)
      if (company.id) {
        newList = temp.map((item) => {
          if (item.id === company.id) {
            console.log(item)
            item = company;
          }
          return item;
        })
      } else {
        company.id = new Date().toString();
        temp.push(company);
      }
      console.log(newList, temp)
      this.$patch({
        companyList: newList || temp,
      })
      this.saveLocal();
    },
    /**
     * @param {any[]} removeCompanyList
     */
    remove(removeCompanyList) {
      let temp = [...this.companyList];
      let data = temp.filter((item) => !removeCompanyList.includes(item.id));
      this.$patch({
        companyList: data,
      })
      this.saveLocal();
    },
    saveLocal() {
      localStorage.setItem('companyList', JSON.stringify(this.companyList))
    },
  },
})
