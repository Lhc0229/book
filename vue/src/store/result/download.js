export default {
    namespaced:true,
    state:{
        list: [],
        currentPage:1, //初始页
        pagesize:3,    //每页的数据
        down:'',
        names:''
    },
    mutations:{
        handleSizeChanges(state,size) {
            state.pagesize = size;
        },
        handleCurrentChanges(state,currentPage){
            state.currentPage = currentPage;
        },
        opens(state,item){
            state.down = item.src;
            state.names = item.name;
        },
        setData(state,response){
            state.list = response.data.filter((item)=>{
                return item.type == 1;
            });
        }
    },
    actions:{
        init({ commit },obj){
            obj.$axios({
                method:'get',
                url:'http://localhost:5000/img',
            }).then((response) =>{
                commit('setData',response)
            })
        },
    }
}