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
                <!-- <Option value="1">显示 </Option>
                <Option value="2"> 不显示 </Option> -->
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
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    air_url: [
                        { required: true, message: '必填', trigger: 'blur' }
                    ],
                    rank: [
                        { required: true, message: '必填', trigger: 'none', type:'number' }
                    ],
                    status: [
                        { required: true, message: '必填', trigger: 'none', type:'number' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    console.log(this.formValidate, 'callback')
                    if (valid) {
                        const that = this;
                        this.$fetch
                            .post('/admin/Air_url_manage/saveAirUrl', {
                                token: this.$stores.getToken(),
                                air_url_id: this.airUrlId,
                                airport_name: this.formValidate.airport_name,
                                air_url: this.formValidate.air_url,
                                rank: this.formValidate.rank,
                                status: this.formValidate.status,
                            })
                            .then(res => {
                                that.$swal({
                                    title: res.msg
                                }).then((dismiss) => {
                                    if(dismiss.value){
                                        that.$router.push({path: '/urlManage'})
                                    }
                                })
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
            getDetailData(airUrlId) {
              const that = this;
              this.$fetch
                .post('/admin/Air_url_manage/getAirUrl', {
                  token: this.$stores.getToken(),
                  air_url_id: this.airUrlId
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

