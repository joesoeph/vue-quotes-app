<template>
  <button @click="confirm"
          type="button"
          class="btn btn-sm rounded-pill btn-danger mx-1">
    Delete
  </button>
</template>
<script>
import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

const domain = 'https://5fe374928bf8af001766e6a1.mockapi.io/api/v1'
const api = `${domain}/quotes`

Vue.use(VuejsDialog)

export default {
  name: 'QuoteDelete',
  props: {
    dataId: String,
    reload: Function
  },
  methods: {
    confirm () {
      const that = this
      this.$dialog
        .confirm('Sure to delete?', {
          loader: true
        })
        .then(function (dialog) {
          fetch(`${api}/${that.dataId}`, {
            method: 'delete',
            headers: {
              'Content-type': 'application/json'
            }
          }).then(response => {
            if (!response.ok) {
              throw new Error('HTTP status ' + response.status)
            }
            that.reload()
          })
            .catch(err => console.log(err))
            .finally(console.log('data deleted'))
          dialog.close()
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
