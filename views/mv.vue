<template>
    <div class="mv-container">
        <div class="mv-wrap">
            <h3 class="title">mv详情</h3>
            <!-- mv -->
            <div class="video-wrap">
                <video controls :src="url"  autoplay></video>
            </div>
            <!-- mv信息 -->
            <div class="info-wrap">
                <div class="singer-info">
                    <div class="avatar-wrap">
                        <img :src="icon+'?param=250y150'" alt="" />
                    </div>
                    <span class="name">{{ mvInfo.artistName }}</span>
                </div>
                <div class="mv-info">
                    <h2 class="title">{{ mvInfo.name }}</h2>
                    <span class="date">发布：{{ mvInfo.publishTime }}</span>
                    <span class="number">播放：{{ mvInfo.playCount }} 次</span>
                    <p class="desc">
                        {{ mvInfo.desc }}
                    </p>
                </div>
            </div>
            
            <!-- 精彩评论 -->
            <div class="comment-wrap" v-if="hotComments !== undefined && hotComments.length !== 0">
                <p class="title">
                精彩评论<span class="number">({{ hotComments.length }})</span>
                </p>
                <div class="comments-wrap" >
                <!-- 评论 -->
                    <div class="item" v-for="(item, index) in hotComments" :key="index">
                        <div class="icon-wrap">
                        <!-- 头像 -->
                        <img :src="item.user.avatarUrl+'?param=50y50'" alt="" />
                        </div>
                        <div class="content-wrap">
                        <div class="content">
                            <span class="name">{{ item.user.nickname }}</span>
                            <span class="comment">：{{ item.content }}</span>
                        </div>
                        <!-- 回复 -->
                        <div class="re-content" v-if="item.beReplied.length !== 0">
                            <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                            <span class="comment">：{{ item.beReplied[0].content }}</span>
                        </div>
                        <div class="date">{{ item.time | dateFormat }}</div>
                        </div>
                    </div>
                </div>
            </div>

             <!-- 最新评论 -->
            <div class="comment-wrap">
                <p class="title">
                最新评论<span class="number">({{ total }})</span>
                </p>
                <div class="comments-wrap">
                <!-- 评论 -->
                <div class="item" v-for="(item, index) in comments" :key="index">
                    <div class="icon-wrap">
                    <!-- 头像 -->
                    <img :src="item.user.avatarUrl+'?param=50y50'" alt="" />
                    </div>
                    <div class="content-wrap">
                    <div class="content">
                        <span class="name">{{ item.user.nickname }}</span>
                        <span class="comment">：{{ item.content }}</span>
                    </div>
                    <!-- 回复 -->
                    <div class="re-content" v-if="item.beReplied.length !== 0">
                        <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                        <span class="comment">：{{ item.beReplied[0].content }}</span>
                    </div>
                    <div class="date">{{ item.time | dateFormat }}</div>
                    </div>
                </div>
                </div>
            </div>
            <!-- 分页器 -->
            <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
            </el-pagination>   
        </div>
        <div class="mv-recommend">
            <h3 class="title">相关推荐</h3>
            <div class="mvs">
                <div class="items">
                <div class="item" v-for="(item, index) in simiMvs" :key="index" @click="playMv(item.id)">
                    <div class="img-wrap">
                    <img :src="item.cover+'?param=250y150'" alt="" />
                    <span class="iconfont iconbofang"></span>
                    <div class="num-wrap">
                        <div class="iconfont iconbofang"></div>
                        <div class="num">{{ item.playCount | playNumFormat }}</div>
                    </div>
                    <span class="time">{{ item.duration | playTimeFormat }}</span>
                    </div>
                    <div class="info-wrap">
                    <div class="name">{{ item.name }}</div>
                    <div class="singer">{{ item.artistName }}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/CSS/mv.css'
export default{
    data(){
        return{
            url: '',
            // 总条数
            total: 20,
            // 页码
            pageNum: 1,
            // 页容量
            pageSize: 10,
            // mv地址
            url: '',
            mvInfo: {},
            simiMvs: [],
            icon: '',
            hotComments: [],
            comments: []
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getMvUrl()
        this.getMvComment()
    },
    methods:{   
        handleCurrentChange(val) {
            this.pageNum = val
            this.getMvComment()
            this.$pubSub.publish('pauseAudio')
        },   
        async getMvUrl(){
            //获取mv地址
            const res=await this.$http.post('/mv/url',{id:this.id,r: 1080}) 
            this.url=res.data.data.url
            //获取mv详情
            const res2=await this.$http.post('/mv/detail',{mvid:this.id}) 
            this.mvInfo=res2.data.data
            //获取歌手头像
            const res3=await this.$http.post('/artists',{id:this.mvInfo.artists[0].id})
            this.icon=res3.data.artist.picUrl  
            //获取相关mv 
            const res4=await this.$http.post('/simi/mv',{mvid:this.id})
            this.simiMvs=res4.data.mvs
          
        },
        async getMvComment() {
            //获取mv评论
            const res=await this.$http.post('/comment/mv',{id:this.id,limit: this.pageSize,offset: (this.pageNum - 1) * this.pageSize}) 
            this.hotComments=res.data.hotComments
            this.comments=res.data.comments
            this.total=res.data.total
        },
        playMv(id) {
            this.pageNum = 1
            this.id = id
            this.getMvUrl()
            this.getMvComment()
        }
        
    }
}

</script>