import Vue from 'vue/dist/vue.esm'

// Grid with sortable columns and arrows
Vue.component('products-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

// Retrieve data from products_controllers through content_div
const element = document.getElementById("products-data")
const products_rails = JSON.parse(element.dataset.products)

// Grid component design and functions
const grid = new Vue({
  el: '#products-grid',
  data: {
    searchQuery: '',
    gridColumns: ['id', 'title', 'description', 'price'],
    startRow: 0,
    rowsPerPage: 10,
    productsNumber: products_rails.length,
    gridData: products_rails.slice(0, 10)
  },
  methods: {
    movePages: function(amount) {
      const newStartRow = this.startRow + (amount * this.rowsPerPage);
      if (newStartRow >= 0 && newStartRow < products_rails.length) {
        this.startRow = newStartRow;
        console.log(products_rails.slice(this.startRow, this.startRow + this.rowsPerPage))
        this.gridData = products_rails.slice(this.startRow, this.startRow + this.rowsPerPage)
      }
    },
    tenRows: function() {
      this.startRow = 0
      this.rowsPerPage = 10;
      this.gridData = products_rails.slice(0, this.rowsPerPage)
    },
    twentyRows: function() {
      this.startRow = 0
      this.rowsPerPage = 20;
      this.gridData = products_rails.slice(0, this.rowsPerPage)
    },
    fiftyRows: function() {
      this.startRow = 0
      this.rowsPerPage = 50;
      this.gridData = products_rails.slice(0, this.rowsPerPage)
    },
    hundredRows: function() {
      this.startRow = 0
      this.rowsPerPage = 100;
      this.gridData = products_rails.slice(0, this.rowsPerPage)
    }
  }
});

