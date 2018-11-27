<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="导航名称" prop="nav_name">
            <Input v-model="formValidate.nav_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="url地址" prop="url">
            <Input v-model="formValidate.url" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="上级导航" prop="pid">
            <Select v-model="formValidate.pid">
                <Option v-for="(item,index) in OneNavData"
                  :key="index"
                  :value="item.pid"
                  > {{ item.xv }} {{ item.nav_name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="状态" prop="nav_status">
            <Select v-model="formValidate.nav_status">
                <Option v-for="item in statusList" :key="item.id" :value="item.id"> {{ item.name }} </Option>
            </Select>
        </FormItem>
        <FormItem label="排序" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                nav_id: '',
                OneNavData: [],
                statusList: [
                  {id: 1, name: '正常'},
                  {id: 2, name: '隐藏'},
                ],
                formValidate: {
                    nav_name: '',
                    url: '',
                    pid: 0,
                    nav_status: 1,
                    rank: ''
                },
                ruleValidate: {  // 表单校验规则
                    nav_name: [
                        { required: true, message: '请填写导航名称', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请填写url地址', trigger: 'change' }
                    ],
                    pid: [
                        { required: true, message: '必填', trigger: 'none', type: 'number' }
                    ],
                    nav_status: [
                        { required: true, message: '必填', trigger: 'none', type: 'number' }
                    ],
                    rank: [
                        { required: true, message: '必填', trigger: 'none' }
                    ],
                }
            }
        },
        methods: {
            // 表单提交
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const that = this;
                        this.$fetch
                            .post('/admin/Nav_manage/SaveNav', {
                                token: this.$stores.getToken(),
                                nav_name: this.formValidate.nav_name,
                                url: this.formValidate.url,
                                pid: this.formValidate.pid,
                                nav_status: this.formValidate.nav_status,
                                rank: this.formValidate.rank
                            })
                            .then(res => {
                                that.$swal({
                                    title: res.msg,
                                    text: ''
                                }).then(() => {
                                    that.$router.push({path: '/navManage'})
                                })
                                console.log(res, 'res');
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //---------获取数据-----------//
            getData(nav_id) {
              const that = this;
              this.$fetch
                .post('/admin/Nav_manage/getNavDetails', {
                  token: this.$stores.getToken(),
                  nav_id: this.nav_id
                })
                .then(res => {
                  for(let i in that.formValidate){
                    that.formValidate[i] = res.data[i];
                  }
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
              },
            //---------获取上级导航数据-----------//
            getOneNavData() {
              const that = this;
              this.$fetch
                .post('/admin/Nav_manage/getOneNav', {
                  token: this.$stores.getToken(),
                })
                .then(res => {
                  that.OneNavData = res.data;
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
            },
        },
        created(){
          if(this.$route.query.navId != ''){
            this.nav_id = this.$route.query.navId;
            this.getData()
          }
          this.getOneNavData();
        }
    }
</script>

<style lang="scss" scoped>

</style>

