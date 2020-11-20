<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">学生信息管理系统</div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            信息管理
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            教务管理
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            成绩管理
                        </MenuItem>
                        <MenuItem name="4" to="/login">
                            <Icon type="ios-contact" />
                            <span @click="sign">退出</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout class="main">
                <Sider hide-trigger :style="{ background: '#fff' }">
                    <Menu
                            theme="light"
                            width="auto"
                            accordion
                            :active-name="active_name"
                            :open-names="open_names"
                            @on-open-change = 'close'
                    >
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                信息管理
                            </template>
                            <MenuItem name="1-1" @click.native="getUrl('/news_student', '信息管理', '学生信息管理')">
                                学生信息管理
                            </MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                文件管理
                            </template>
                            <MenuItem name="2-1" @click.native="getUrl('/result_upload', '文件管理', '文件上传')">
                                文件上传
                            </MenuItem>
                            <MenuItem name="2-2" @click.native="getUrl('/result_img_download', '文件管理', '图片下载')">
                                图片下载
                            </MenuItem>
                            <MenuItem name="2-3" @click.native="getUrl('/result_download', '文件管理', '文件下载')">
                                文件下载
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{ padding: '0 24px 24px' }">
                    <Breadcrumb :style="{ margin: '24px 0' }">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                        <BreadcrumbItem v-if="Components">{{Components }}</BreadcrumbItem>
                        <BreadcrumbItem v-if="Layout">{{ Layout }}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content
                            :style="{
                padding: '24px',
                minHeight: '280px',
                background: '#fff',
                overflow: 'hidden'
              }"
                    >
                        <router-view />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        computed:{
            ...mapState('main',['theme2','Components','Layout','open_names','active_name'])
        },
        created() {
            this.$router.push('/')
        },
        methods: {
            ...mapMutations('main',['signs','getUrls','closes']),
            sign(){
                this.signs()
            },
            getUrl(item, a, b) {
                this.getUrls({item:item,that:this,a:a,b:b})
            },
            close(a){
                this.closes({that:this,a:a})
            }
        }
    };
</script>

<style lang="less">
    #app {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }
    .main {
        height: calc(100vh - 66px);
    }
    .layout-logo {
        width: 200px !important;
        background: #515a6e !important;
        top: 0 !important;
        color: rgba(255, 255, 255, 0.7);
    }
    .ivu-layout-sider {
        height: 100%;
    }
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav {
        height: 60px;
        width: 520px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>