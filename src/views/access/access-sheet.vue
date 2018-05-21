<style scoped>
    .zjl-content {
        background: #fff;
        padding: 40px 20px;
        height: 100%;
    }
</style>

<template>
    <div class="zjl-content">
        <h2>权限表</h2>
        <Table border :columns="columns1" :data="data1" style="margin-top:40px;"></Table>
    </div>
</template>

<script>
    import util from '@/libs/util';
    export default {
        created: function() {
            // 请求数据
            util.ajax('/SJWCRM/showPermitionTable', {
                    method: 'post'
                })
                .then(res => {
                    this.data1 = res.data.data;
                })
                .catch(function(error) {
                    console.log(error);
    
                });
        },
        data() {
            return {
                columns1: [{
                        title: '序号',
                        align: 'center',
                        type: 'index',
                        width: '10%'
                    },
                    {
                        title: '角色名称',
                        key: 'roleName',
                        align: 'center'
                    },
                    {
                        title: '权限',
                        key: 'roleDescribe',
                        align: 'center'
                    }, {
                        title: '备注',
                        key: 'remarks',
                        align: 'center'
                    }
                ],
                data1: []
            }
        },
        methods: {
    
        }
    }
</script>
