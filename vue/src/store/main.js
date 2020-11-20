export default {
    namespaced:true,
    state:{
        theme2:'',
        Components:"",
        Layout:"",
        open_names:[],
        active_name:""
    },
    mutations:{
        signs(state){
            localStorage.removeItem("auto");
        },
        getUrls(state,obj){
            obj.that.$router.push(obj.item);
            state.Components = obj.a;
            state.Layout = obj.b;
        },
        closes(state){
            state.Components = '';
            state.Layout = '';
        }
    },
    actions:{

    }
}