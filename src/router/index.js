import Vue from 'vue'
import Router from 'vue-router'
import Result from '../../views/result'
import Discovery from '../../views/discovery'
import Mv from '../../views/mv'
import Mvs from '../../views/mvs'
import Playlist from '../../views/playlist'
import Playlists from '../../views/playlists'
import Songs from '../../views/songs'
import Top from '../components/01.top'
import Index from '../components/02.index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/discovery' },
    { path: '/discovery', component: Discovery },
    { path: '/playlists', component: Playlists },
    { path: '/playlist', component: Playlist },
    { path: '/songs', component: Songs },
    { path: '/mvs', component: Mvs },
    { path: '/mv', component: Mv },
    { path: '/result', component: Result }
  ]
  
})
