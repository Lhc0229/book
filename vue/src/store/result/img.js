export default {
    namespaced:true,
    state:{
        list:[]
    },
    mutations:{
        setData(state,response){
            state.list = response.data.filter((item)=>{
                return item.type == 0;
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