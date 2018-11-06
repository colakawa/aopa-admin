<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="机场名称" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场网址" prop="air_url">
            <Input v-model="formValidate.air_url" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="排序" prop="rank">
            <Input v-model="formValidate.rank" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status">
                <Option v-for="item in statusList" :value="item.id"> {{item.name}} </Option>
            </Select>
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
               airUrlId: '',
               statusList: [
                  {id: 1, name: '显示'},
                  {id: 2, name: '不显示'},
                ],
                formValidate: {
                    airport_name: '',
                    air_url: '',
                    rank: '',
                    status: '',
                },
                ruleValidate: {
                    airport_name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    air_url: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    rank: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
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
            getDetailData(airUrlId) {
              const that = this;
              this.$fetch
                .post('/admin/Air_url_manage/getAirUrl', {
                  token: this.$stores.getToken(),
                  air_url_id: this.airUrlId
                })
                .then(res => {
                  that.formValidate.airport_name = res.data.airport_name;
                  that.formValidate.air_url = res.data.air_url;
                  that.formValidate.status = res.data.status;
                  that.formValidate.rank = res.data.rank;
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
            },
        },
         created(){
            if(this.$route.query.airUrlId != ''){
              this.airUrlId = this.$route.query.airUrlId;
              this.getDetailData()
            }
            // this.getOneNavData();
          }
    }
</script>

<style lang="scss" scoped>

</style>

