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
                <Option value="1">正常</Option>
                <Option value="2">隐藏</Option>
            </Select>
        </FormItem>
        <FormItem label="排序" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                nav_id: '',
                OneNavData: [],
                formValidate: {
                    nav_name: '',
                    url: '',
                    pid: '',
                    nav_status: 1,
                    rank: ''
                },
                ruleValidate: {
                    nav_name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    pid: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    nav_status: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    rank: [
                        { required: true, message: '????', trigger: 'none' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
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
                  // that.navData = res.data;
                  that.formValidate.nav_name = res.data.nav_name;
                  that.formValidate.url = res.data.url;
                  that.formValidate.pid = res.data.pid;
                  that.formValidate.nav_status = res.data.nav_status;
                  that.formValidate.rank = res.data.rank;
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
              },
            //---------获取上级导航数据-----------//admin/Nav_manage/getOneNav
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
          this.nav_id = this.$route.query.navId;
          this.getData()
          this.getOneNavData();
        }
    }
</script>

<style lang="scss" scoped>

</style>

