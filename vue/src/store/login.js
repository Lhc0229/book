export default {
    namespaced:true,
    state:{
        ruleForm:{
            name:"",
            pwd:''
        },
        rules: {
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在2 到 5 个字符', trigger: 'blur' }
            ],
            pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 10, max: 10, message: '长度为10个字符', trigger: 'blur' }
            ],
        }
    },
    mutations:{

    },
    actions:{
        submit({commit,state,dispatch},items){
            items.that.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    items.that.$axios({
                        method:'get',
                        url:'http://localhost:5000/select',
                    }).then((response) =>{
                        const bool = response.data.some((item)=>{
                            return item.name== items.ruleForm.name && item.cno==items.ruleForm.pwd
                        });
                        if(bool){
                            localStorage.setItem('token', items.ruleForm.pwd);
                            const obj = response.data.find((item)=>{
                                return item.cno == items.ruleForm.pwd
                            })
                            if(obj.auto){
                                localStorage.setItem('auto', 'true');
                            }
                            items.that.$router.push('/');
                        }else{
                            items.that.$message({
                                message: '输入有误，请重新输入',
                                type: 'warning'
                            });
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    }
}