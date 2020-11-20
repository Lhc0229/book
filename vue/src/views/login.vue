<template>
    <div class="login">
        <div class="main">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 500px;"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" style="width: 500px;"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm(ruleForm)" style="width: 500px;margin-left: 100px; ">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    export default {
        name: "login",
        computed:{
            //引入data属性
            ...mapState('login',['ruleForm','rules'])
        },
        methods:{
            //引入方法
            ...mapActions('login',['submit']),
            //提交表单
            submitForm(ruleForm){
                this.submit({ruleForm:ruleForm,that:this})
            }
        }
    }
</script>

<style scoped lang="less">
    .login{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .demo-ruleForm{
        width: 700px;
        margin: 0 auto;
        margin-top: 300px;
    }
</style>