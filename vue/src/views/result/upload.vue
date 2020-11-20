<template>
    <div class="upload">
<!--        上传组件-->
        <Upload
                multiple
                type="drag"
                :on-success="success"
                :before-upload="uploadFile"
                action="http://localhost:5000/upload">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或拖拽文件进行上传</p>
            </div>
        </Upload>
    </div>
</template>
<script>
    import {  mapState,mapMutations,mapActions } from 'vuex'
export default {
  name: "student",
    computed:{
      ...mapState('upload',['chunkSize'])
    },
    methods:{
      ...mapMutations('upload',['success_init']),
        ...mapActions('upload',['uploadFiles','uploads']),
        //上传文件时触发方法
        uploadFile(file){
            this.uploadFiles({that:this,file:file,index:0})
        },
        success(){
            this.success_init(this)
        },
        upload(file,index) {
            this.uploads({file:file,index:index,that:this})
        }
    }
};
</script>

<style scoped></style>
