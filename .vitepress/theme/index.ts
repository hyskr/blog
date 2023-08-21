import Layout from './layouts/Layout.vue'
import Tags from './components/Tags.vue'
import NotFoundComponent from './components/404.vue'
// import Info from './components/Info.vue'

import './styles/tailwind.postcss'
import './styles/custom.scss'

export default {
    Layout,
    NotFound: NotFoundComponent,
    enhanceApp({ app, router, siteData }) {
        app.component('Tags', Tags)
        app.component('NotFoundComponent', NotFoundComponent)
        // app.component('Info', Info)
    }
}