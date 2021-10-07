<template>
    <div class="index-container">
    <!-- 导航区域 -->
        <div class="nav">
            <ul>
                <li>
                    <router-link to="/discovery">
                        <span class="iconfont iconyinle"></span>
                        发现音乐
                    </router-link>
                </li>
                <li>
                    <router-link to="/playlists">
                        <span class="iconfont iconyinleliebiao-"></span>
                        推荐歌单
                    </router-link>
                </li>
                <li>
                    <router-link to="/songs">
                        <span class="iconfont iconyinle1"></span>
                        最新音乐
                    </router-link>
                </li>
                <li>
                    <router-link to="/mvs">
                        <span class="iconfont iconicon-test"></span>
                        最新MV
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 主体区域 -->
        <div class="main">
            <router-view></router-view>
        </div>
        <!-- 播放标签 -->
        <div class="player">
            <audio :src="musicUrl" autoplay controls id="music"></audio>
        </div>
  </div>
</template>
<script>
import '../assets/CSS/index.css'
export default {
    name: 'index',
    data() {
        return {
        musicUrl: ''
        }
    },
}
</script>