import { createApp, h } from 'vue'
import App from './App.vue'
import FilmsPage from './components/content-pages/FilmsPage.vue'
import BooksPage from './components/content-pages/BooksPage.vue'
import GamesPage from './components/content-pages/GamesPage.vue'
import RecommendationsPage from './components/RecommendationsPage.vue'
import ProfilePage from './components/ProfilePage.vue'


const routes = {
    '/': App,
    '/films': FilmsPage,
    '/books': BooksPage,
    '/games': GamesPage,
    '/recomendations': RecommendationsPage,
    '/profile': ProfilePage
  }
  const NotFoundComponent = { template: '<p>Page not found</p>'}
  
  const SimpleRouter = {
    data: () => ({
      currentRoute: window.location.pathname
    }),
  
    computed: {
      CurrentComponent() {
        return routes[this.currentRoute] || NotFoundComponent
      }
    },
  
    render() {
      return h(this.CurrentComponent)
    }
  }

createApp(SimpleRouter).mount('#app')
