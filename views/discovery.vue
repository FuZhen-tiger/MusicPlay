<template>
    <div class="discovery-container">
        <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(item,index) in bannerImg" :key="index">
                <img :src="item" alt="">
            </el-carousel-item>
        </el-carousel>
        <!-- 推荐歌单 -->
        <div class="recommend">
            <h3 class="title">
                推荐歌单
            </h3>
            <div class="items">
                <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
                <div class="img-wrap">
                    <div class="desc-wrap">
                    <span class="desc">{{ item.copywriter }}</span>
                    </div>
                    <img :src="item.picUrl+'?param=200y200'" alt="" />
                    <span class="iconfont iconbofang"></span>
                </div>
                <p class="name">{{ item.name }}</p>
                </div>
            </div>
        </div>

        <!-- 最新音乐 -->
        <div class="news">
            <h3 class="title">
                最新音乐
            </h3>
            <div class="items">
                <div class="item" v-for="(item, index) in newSongs" :key="index" @click="playMusic(item.id)">
                <div class="img-wrap">
                    <img :src="item.picUrl+'?param=130y130'" alt="" />
                    <span class="iconfont iconbofang"></span>
                </div>
                <div class="song-wrap">
                    <div class="song-name">{{ item.name }}</div>
                    <div class="singer">{{ item.song.artists[0].name }}</div>
                </div>
                </div>
            </div>
        </div>
        <!-- 推荐MV -->
        <div class="mvs">
            <h3 class="title">推荐MV</h3>
            <div class="items">
                <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
                <div class="img-wrap">
                    <img :src="item.picUrl+'?param=250y150'" alt="" />
                    <span class="iconfont iconbofang"></span>
                    <div class="num-wrap">
                    <div class="iconfont iconbofang"></div>
                    <div class="num">{{ item.playCount }}</div>
                    </div>
                </div>
                <div class="info-wrap">
                    <div class="name">{{ item.name }}</div>
                    <div class="singer">{{ item.artistName }}</div>
                </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import '@/assets/CSS/discovery.css'
export default {
    data(){
        return{
            bannerImg:[],
            playList:[],
            newSongs:{},
            mvs:[]
        }
    },
    methods:{
        async fetchResource(){
            const res=await this.$http.get('/banner')
            const res2=await this.$http.get('/personalized/playlist',{params:{limit:10}} )
            const res3=await this.$http.get('/personalized/newsong')   
            const res4=await this.$http.get('/personalized/mv')                    
            this.bannerImg=res.data.banners.map(item=>item.imageUrl)
            this.playList=res2.data.result
            this.newSongs=res3.data.result
            this.mvs=res4.data.result
        },
        toPlaylist(id){
            this.$router.push(`/playlist?id=${id}`)
        },
        toMv(id){
            this.$router.push(`/mv?id=${id}`)
            
        }
     
    },
    created(){
        this.fetchResource();
    }
}
</script>