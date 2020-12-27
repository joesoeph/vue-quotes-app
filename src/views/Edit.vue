<template>
  <div class="row">
    <div class="col-md-12">
      <h1 class="text-center">Edit Form</h1>
    </div>
    <div class="col-md-6 offset-md-3">
      <form>
        <div class="mb-3">
          <label for="content" class="form-label">Content:</label>
          <textarea v-model="quotes.content" class="form-control" name="content" id="content" rows="4"></textarea>
        </div>
        <div class="mb-3">
          <label for="quoteBy" class="form-label">Quote By:</label>
          <input v-model="quotes.quoteBy" type="text" class="form-control" id="quoteBy">
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category:</label>
          <input v-model="quotes.category" type="text" class="form-control" id="category">
        </div>
        <button @click="update()" type="button" class="btn btn-primary">Let's update</button>
      </form>
    </div>
  </div>
</template>
<script>
const domain = 'https://5fe374928bf8af001766e6a1.mockapi.io/api/v1'
const api = `${domain}/quotes`
export default {
  name: 'Edit',
  data () {
    return {
      quotes:
      {
        content: '',
        quoteBy: '',
        category: ''
      }
    }
  },
  methods: {
    retrieveQuotes () {
      fetch(`${api}/${this.$route.params.id}`, {
        method: 'get',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
        .then(result => {
          this.quotes = result
        })
        .catch(err => console.log(err))
        .finally(console.log('done'))
    },
    update () {
      const payload = JSON.stringify(this.quotes)
      fetch(`${api}/${this.$route.params.id}`, {
        method: 'put',
        headers: {
          'Content-type': 'application/json'
        },
        body: payload
      }).then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        this.$router.push({ name: 'Home' })
      })
        .catch(err => console.log(err))
        .finally(console.log('data updated'))
    }
  },
  mounted () {
    this.retrieveQuotes()
  }
}
</script>
