export default {
    namespaced:true,
    state:{
        auto:false,
        modal:false,
        list: [],
        data: [],
        limit: 5,
        total: null,
        page: 1,
        searchData: "",
        item:[],
        show:false,
        term:{
            cno:'',
            name:'',
            class:'',
            Web:'',
            UI:'',
            mzd:'',
            yjcs:'',
            cxfs:'',
            czxt:'',
            rjsx:''
        }
    },
    mutations:{
        set_searchData(state,val){
            state.searchData = val;
        },
        set_modal(state,val){
            state.modal = val;
        },
        setModal(state){
            state.modal = true;
        },
        set_show(state){
            state.show = true;
        },
        init(state){
            if(localStorage['auto'] == 'true') {
                state.auto = true;
            }
        },
        searchData(state,obj){
            state.searchData = obj
        },
        getList(state) {
            // es6过滤得到满足搜索条件的展示数据list
            let list = state.data.filter((item) =>
                item.name.includes(state.searchData) || item.class.includes(state.searchData)|| item.cno.includes(state.searchData)
            )
            state.list = list.filter((item, index) =>
                index < state.page * state.limit && index >= state.limit * (state.page - 1)
            )
            state.total = list.length
        },
        opens(state,item){
            state.show = true;
            state.item = {
                cno:item['cno'],
                Web:item['Web'],
                UI:item['UI'],
                mzd:item['mzd'],
                yjcs:item['yjcs'],
                cxfs:item['cxfs'],
                czxt:item['czxt'],
                rjsx:item['rjsx'],
            }
        },
        close_show(state){
            state.show = false;
        },
        close(state){
            state.modal =  false;
            state.term={cno:'',name:'',class:'',Web:'',UI:'', mzd:'', yjcs:'', cxfs:'', czxt:'', rjsx:''}
        }
    },
    actions: {
        handleSizeChanges({commit,state},val) {
            state.limit = val;
            commit('getList')
        },
        // 搜索过滤数据
        search({commit,state}) {
            state.page = 1
            commit('getList')
        },
        handleCurrentChanges({commit,state},val) {
            state.page = val
            commit('getList')
        },
        blurs({state,dispatch},obj){
            if(!state.searchData){
                dispatch('pageLists',obj)
            }
        },
        pageLists({commit,state},obj) {
            obj.$axios({
                method:'get',
                url:'http://localhost:5000/select',
            }).then((response) =>{
                state.data = response.data.reverse();
            }).then(()=>{
                commit('getList')
            })
        },
        handleDeletes({dispatch},obj){
            obj.that.$Modal.confirm({
                title: '删除信息',
                content: `<p>${obj.item.name}</p><p>${obj.item.cno}</p>`,
                onOk: () => {
                    obj.that.$axios({
                        method:'post',
                        url:'http://localhost:5000/delete',
                        data:{
                            cno:obj.item['cno']
                        },
                    }).then((response) =>{
                        dispatch('pageLists',obj.that)
                        obj.that.$Message.success('删除成功');
                    })
                },
                onCancel: () => {
                    obj.that.$Message.info('删除失败');
                }
            });
        },
        updateValue({dispatch,state},obj){
            obj.$axios({
                method:'post',
                url:'http://localhost:5000/update',
                data:{
                    Web:obj.$refs['Web'].value,
                    UI:obj.$refs['UI'].value,
                    mzd:obj.$refs['mzd'].value,
                    yjcs:obj.$refs['yjcs'].value,
                    cxfs:obj.$refs['cxfs'].value,
                    czxt:obj.$refs['czxt'].value,
                    rjsx:obj.$refs['rjsx'].value,
                    cno:obj.$refs['cno'].value
                },
            }).then((response) =>{
                dispatch('pageLists',obj)
                state.show = false;
                obj.$Message.success('修改成功');
            })
        },
        adds({state,dispatch},obj){
            obj.$axios({
                method:'post',
                url:'http://localhost:5000/add',
                data:{
                    name:obj.$refs['term_name'].value,
                    class: obj.$refs['term_class'].value,
                    Web:obj.$refs['term_Web'].value,
                    UI:obj.$refs['term_UI'].value,
                    mzd:obj.$refs['term_mzd'].value,
                    yjcs:obj.$refs['term_yjcs'].value,
                    cxfs:obj.$refs['term_cxfs'].value,
                    czxt:obj.$refs['term_czxt'].value,
                    rjsx:obj.$refs['term_rjsx'].value,
                    cno:obj.$refs['term_cno'].value
                },
            }).then((response) =>{
                dispatch('pageLists',obj)
                state.term={cno:'',name:'',class:'',Web:'',UI:'', mzd:'', yjcs:'', cxfs:'', czxt:'', rjsx:''}
                state.modal = false;
                obj.$Message.success('添加成功');
            })
        }
    }
}