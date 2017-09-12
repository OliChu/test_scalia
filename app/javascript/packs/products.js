import Vue from 'vue/dist/vue.esm'

var products = new Vue({
  el: '#products-table',
  data: {
    products: []
  },
  ready: function() {
    var that;
    that = this;
    $.ajax({
      url: '/products.json',
      success: function(res) {
        that.products = res;
      }
    });
  }
});
