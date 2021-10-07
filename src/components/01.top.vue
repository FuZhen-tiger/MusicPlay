<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont iconhome" ></span>
        <span class="iconfont iconicon--"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="right-search">
        <input type="text" v-model="inputVal" @keyup.enter="toResult" autocomplete="off" placeholder="搜索" />
        <span class="iconfont iconsousuo"></span>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/CSS/top.css'
export default{
    data(){
        return{
            inputVal: ''
        }
    },
    methods:{
        
        toResult() {
            if (this.inputVal === '') {
                // 提示用户
                this.$message.warning('请输入内容!')
            } else {
                // 携带数据去搜索页面
                this.$router.push(`/result?q=${this.inputVal}`)
            }
        }
    }
}
</script>
