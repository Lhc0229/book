<template>
    <div class="download">
<!--        下载数据表-->
        <el-table
                :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                size="small"
        >
            <el-table-column
                    prop="name"
                    label="文件名"
                    width="500">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="上传时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <a :href="down" :download="names">
                        <el-button
                                type="primary"
                                size="mini"
                                @click="open(scope.row)">下载</el-button>
                    </a>

                </template>
            </el-table-column>
        </el-table>
<!--        分页器-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[3, 5, 7, 9]"
                :page-size="pagesize"
                background
                class="page"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list.length">
        </el-pagination>
    </div>
</template>

<script>
    import {  mapState,mapActions,mapMutations } from 'vuex'
    export default {
        computed:{
            //引入data属性
            ...mapState('download',['list','currentPage','pagesize','down','names'])
        },
        created() {
            //初始化数据
            this.pageList()
        },
        methods: {
            // 引入方法
            ...mapMutations('download',['handleSizeChanges','handleCurrentChanges','opens']),
            ...mapActions('download',['init']),
            //当每页的条目发生改变时，触发方法
            handleSizeChange(size){
                this.handleSizeChanges(size);
            },
            // 当页数发生改变时，触发该方法
            handleCurrentChange(currentPage){
                this.handleCurrentChanges(currentPage)
            },
            // 点击下载时触发该方法
            open(item){
                this.opens(item)
            },
            // 初始化数据
            pageList(){
                this.init(this);
            }
        },
    }
</script>

<style scoped lang="less">
    .download{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .page{
        width: 100%;
        text-align: center;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%,0);
    }
</style>
