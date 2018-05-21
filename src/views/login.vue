<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                        <Icon :size="16" type="person"></Icon>
                                    </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                        <Icon :size="14" type="locked"></Icon>
                                    </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        data() {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            handleSubmit() {
                // let that = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.util.ajax('/SJWCRM/login', {
                                method: 'post',
                                params: {
                                    userName: this.form.userName,
                                    password: this.form.password
                                }
                            })
                            .then(response => {
                                let curData = response.data;
                                // 登陆成功后存储用户信息；
                                if (curData.code === 20000) {
                                    // 用户名称
                                    Cookies.set('user', curData.data.userName);
                                    Cookies.set('topOrganize', curData.data.topOrganize); 
                                    // 用户id
                                    Cookies.set('userId', curData.data.id);
                                    //机构等级
                                    Cookies.set('organizeId', curData.data.organizeId);
                                    //绑定等级
                                    Cookies.set('bindId', curData.data.bindId);
                                    //用户等级
                                    Cookies.set('levelArent', curData.data.levelArent);
                                    // 第一条订单交易时间
                                    Cookies.set('firstOrderTime', curData.data.firstOrderTime);
                                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                    this.$router.push({
                                        name: 'home_index'
                                    });
                                    this.util.ajax('/SJWCRM/getUserUrlMenu', {
                                        method: 'post',
                                        params:{
                                            id : curData.data.id
                                        }
                                    }).then(res => {
                                        if(res.data.code==20000){
                                            localStorage.menuList = JSON.stringify(res.data.data)
                                        }
                                    })
                                    // if (this.form.userName === 'iview_admin') {
                                    //     Cookies.set('access', 0);
                                    // } else {
                                    //     Cookies.set('access', 1);
                                    // }
                                } else {
                                    this.$Message.error(curData.msg);
                                }
    
                            })
                            .catch(error => {
                                this.$Message.error('当前网络不佳，请稍后重试');
                            });
    
    
                    }
                });
            }
        }
    };
</script>

<style>
    
</style>
