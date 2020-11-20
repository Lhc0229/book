<template>
  <div class="student">
      <div style="display: flex;justify-content: space-between;">
<!--        搜索框-->
        <el-row style="margin-bottom: 10px;width: 400px;">
          <el-col :span="12">
            <el-input v-model="searchDataS"  placeholder="输入姓名搜索" style="width:200px" @blur="blur"></el-input>
          </el-col>
          <el-col :span="2" style="margin-left: 10px;">
            <el-button type="success" @click="search">搜索</el-button>
          </el-col>
        </el-row>
<!--        添加按钮-->
        <el-col :span="2">
          <el-button type="primary" @click="setModal" v-if="auto">添加</el-button>
        </el-col>
      </div>
<!--    学生数据-->
      <el-table
              :data="list"
              border
              size="small"
      >
        <el-table-column
                prop="cno"
                label="学号"
                width="100"
               >
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="100"
                >
        </el-table-column>
        <el-table-column
                prop="class"
                width="100"
                label="班级">
        </el-table-column>
        <el-table-column
                prop="Web"
                width="100"
                label="wed设计标准">
        </el-table-column>
        <el-table-column
                prop="UI"
                width="100"
                label="UI交互设计">
        </el-table-column>
        <el-table-column
                prop="mzd"
                width="100"
                label="毛泽东思想">
        </el-table-column>
        <el-table-column
                prop="yjcs"
                width="100"
                label="软件测试">
        </el-table-column>
        <el-table-column
                prop="cxfs"
                width="100"
                label="程序范式">
        </el-table-column>
        <el-table-column
                prop="czxt"
                width="100"
                label="操作系统">
        </el-table-column>
        <el-table-column
                prop="rjsx"
                width="100"
                label="软件实训">
        </el-table-column>
        <el-table-column label="操作" width="224" v-if="auto">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="open(scope.row)">编辑</el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--    修改学生信息-->
    <Modal
            v-model="Show"
            title="编辑信息"
            @on-ok="updataval"
            @on-cancel="close_show(show)"
            class="modal"
            >
      <p style="display: none"><span>学号</span><Input placeholder="请输入你的成绩"  v-model="item['cno']" ref="cno"/></p>
      <p><span>wed设计标准</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['Web']" ref="Web"/></p>
      <p><span>UI交互</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['UI']" ref="UI"/></p>
      <p><span>毛泽东思想</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['mzd']" ref="mzd"/></p>
      <p><span>软件测试</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['yjcs']" ref="yjcs"/></p>
      <p><span>程序范式</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['cxfs']" ref="cxfs"/></p>
      <p><span>操作系统</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['czxt']" ref="czxt"/></p>
      <p><span>软件实训</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="item['rjsx']" ref="rjsx"/></p>
    </Modal>
<!--    添加学生信息-->
    <Modal
            v-model="Modal"
            title="添加信息"
            @on-ok="add"
            @on-cancel="close(modal)"
            class="modal"
    >
      <p><span>学号</span><Input placeholder="请输入你的学号" style="width: 184px;margin-left: 10px;" v-model="term['cno']" ref="term_cno"/></p>
      <p><span>姓名</span><Input placeholder="请输入你的姓名" style="width: 184px;margin-left: 10px;" v-model="term['name']" ref="term_name"/></p>
      <p><span>班级</span><Input placeholder="请输入你的班级" style="width: 184px;margin-left: 10px;" v-model="term['class']" ref="term_class"/></p>
      <p><span>wed设计标准</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['Web']" ref="term_Web"/></p>
      <p><span>UI交互</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['UI']" ref="term_UI"/></p>
      <p><span>毛泽东思想</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['mzd']" ref="term_mzd"/></p>
      <p><span>软件测试</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['yjcs']" ref="term_yjcs"/></p>
      <p><span>程序范式</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['cxfs']" ref="term_cxfs"/></p>
      <p><span>操作系统</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['czxt']" ref="term_czxt"/></p>
      <p><span>软件实训</span><Input placeholder="请输入你的成绩" style="width: 184px;margin-left: 10px;" v-model="term['rjsx']" ref="term_rjsx"/></p>
    </Modal>
<!--    分页-->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-sizes="[5,7]"
                     :page-size="limit"
                     background
                     class="auto"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
  </div>
</template>

<script>
  import { mapState,mapActions,mapMutations } from 'vuex'
export default {
  created() {
    this.init();
    this.pageList();
  },
  //属性监听
  computed:{
    //当输入框的值发生变化时，触发该属性
    searchDataS: {
      get () {
        return this.searchData;
      },
      set (value) {
        this.set_searchData(value);
      }
    },
    //当操作弹窗时，触发该属性
    Modal:{
      get () {
        return this.modal;
      },
      set (value) {
        this.set_modal(value);
      }
    },
    //当添加弹窗时，触发该属性
    Show:{
      get () {
        return this.show;
      },
      set (value) {
        this.set_show(value);
      }
    },
    //引入data属性
    ...mapState('student',['auto','modal','searchData','list','data','limit','total','page','searchData','item','show','term'])
  },
  methods: {
    //引入方法
    ...mapMutations('student',['set_modal','close_show','set_show','init','setModal','getList','opens','close','set_searchData']),
    ...mapActions('student',['blurs','pageLists','handleDeletes','updateValue','adds','handleCurrentChanges','handleSizeChanges','search']),
    //输入框失去焦点时触发
    blur(){
      this.blurs(this);
    },
    //切换每页条目是触发
    handleSizeChange(val) {
      this.handleSizeChanges(val);
    },
    //当切换页数时触发
    handleCurrentChange(val) {
      this.handleCurrentChanges(val);
    },
    //点击编辑按钮时触发
    open(item){
      this.opens(item)
    },
    //初始化数据
    pageList() {
     this.pageLists(this);
    },
    //点击删除按钮时触发
    handleDelete(item){
      this.handleDeletes({item:item,that:this});
    },
    //点击修改并确认时触发
    updataval(){
      this.updateValue(this);
    },
    //添加学生信息
    add(){
      this.adds(this);
    }
  },
}
</script>

<style scoped lang="less">
  .student{
    width: 100%;
    height: 100%;
  }
  .tap{
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    height: 400px;
    background-color: #FFBDB1B1;
    overflow: hidden;
    .close{
      position: absolute;
      right: 0px;
      top: 0px;
      cursor: pointer;
    }
    h4{
      text-align: center;
      margin: 20px;
      font-weight: lighter;
    }
  }
  .auto {
    position: absolute;
    top:645px;
    width:80%;
    text-align: center;
  }
  .modal{
    p{
      text-align: center;
      margin-bottom: 10px;
      span{
        display: inline-block;
        width: 90px;
        text-align: right;
      }
    }
  }
</style>
