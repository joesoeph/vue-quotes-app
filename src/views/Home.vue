<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 mb-3" v-for="(data, index) in quotes" :key="index">
      <div class="card">
        <div class="card-body">
          <figure class="text-end">
            <blockquote class="blockquote">
              <p>{{ data.content }}</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              <cite title="Source Title">{{ data.quoteBy }}</cite>
            </figcaption>
          </figure>
        </div>
        <div class="card-footer">
          <router-link :to="'/edit/' + data.id" class="btn btn-sm rounded-pill btn-warning mx-1">Edit</router-link>
          <QuoteDelete :data-id="data.id" :reload="retrieveQuotes" />
        </div>
      </div>
    </div>
    <div class="col-md-6 offset-md-3 mb-3 text-center" v-if="isLoadmore">
      <button @click="loadMore()" type="button" class="btn btn-lg btn-outline-secondary">Load more</button>
    </div>
    <div class="col-md-6 offset-md-3 mb-3 text-center" v-if="!isLoadmore">
      <button type="button" class="btn btn-lg btn-outline-secondary" disabled>No Content!</button>
    </div>
  </div>
</template>
<script>
import QuoteDelete from '../components/QuoteDelete'

const domain = 'https://5fe374928bf8af001766e6a1.mockapi.io/api/v1'
const api = `${domain}/quotes`
export default {
  components: {
    QuoteDelete
  },
  name: 'Home',
  data () {
    return {
      quotes: [],
      page: 1,
      limit: 10,
      isLoadmore: true,
      headingTitle: 'Quote App',
      fontSize: 1
    }
  },
  methods: {
    retrieveQuotes () {
      fetch(`${api}?page=${this.page}&limit=${this.limit}&sortBy=createdAt&&order=desc`, {
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
    loadMore () {
      this.page++
      fetch(`${api}?page=${this.page}&limit=${this.limit}`, {
        method: 'get',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => response.json())
        .then(result => {
          if (result.length === 0) {
            this.isLoadmore = false
          }
          const push = this.quotes.concat(result)
          this.quotes = push
        })
        .catch(err => console.log(err))
        .finally(console.log('done'))
    },
    deleteCallback (dialog, id) {
      fetch(`${api}/${id}`, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        this.retrieveQuotes()
      })
        .catch(err => console.log(err))
        .finally(console.log('data deleted'))
      dialog.close()
    },
    cancelCallback () {}
  },
  mounted () {
    this.retrieveQuotes()
  }
}
</script>
