<template>
    <div class="IMG">
<!--        瀑布流布局组件-->
        <vue-waterfall-easy :imgsArr="list"
                            :gap="20"
                            :height="500"
                            class="easy"
                            :loadingDotCount='0'
                            :imgWidth='240'>
        </vue-waterfall-easy>
    </div>
</template>

<script>
    import {  mapState,mapActions } from 'vuex'
    import vueWaterfallEasy from 'vue-waterfall-easy';
    export default {
        name: "IMG",
        components: {
            vueWaterfallEasy
        },
        computed:{
            // 引入data属性
            ...mapState('img',['list'])
        },
        created() {
            // 初始化数据
            this.initData();
        },
        methods:{
            //引入方法
            ...mapActions('img',['init']),
           initData(){
                var that = this;
                this.init(that);
           }
        }
    }
</script>

<style scoped>
.IMG{
    width:100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
}
    .easy{
        width:100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
</style>