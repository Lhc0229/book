export default {
    namespaced:true,
    state:{
        chunkSize: 1024 * 1024
    },
    mutations:{
        success_init(state,that){
            that.$Message.success('文件上传成功');
        },
    },
    actions:{
        uploadFiles({commit,dispatch},obj){
            dispatch('uploads',{file:obj.file,index:obj.index,that:obj.that})
        },
        uploads({state,dispatch},obj) {
            let [fname,fext] = obj.file.name.split('.');

            let start = obj.index * state.chunkSize;

            if(start > obj.file.size){
                merge(obj.file.name);
                return;
            }
            let blob = obj.file.slice(start,start+state.chunkSize);
            let blobName = `${fname}.${obj.index}.${fext}`;
            let blobFile = new File([blob],blobName);

            let formData = new FormData();
            formData.append('file',blobFile)
            obj.that.$axios.post('http://localhost:5000/upload',formData).then((res)=>{
                dispatch('uploads',{file:obj.file,index:++obj.index,that:obj.that})
            })
            function merge(name){
                obj.that.$axios.post('http://localhost:5000/merge', {name:name}).then((res)=>{
                    console.log(res);
                })
            }
        }
    }
}