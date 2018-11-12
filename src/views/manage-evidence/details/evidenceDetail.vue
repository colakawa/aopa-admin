<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑机场</p>
        <FormItem label="许可证编号" prop="licence_num">
            <Input v-model="formValidate.licence_num" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场名称" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场类型" prop="airport_type">
            <Select v-model="formValidate.airport_type">
                <Option v-for="status in statusList" :key="status.id" :value="status.id"> {{status.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="机场类别/级别" prop="airport_rank">
            <Select v-model="formValidate.airport_rank">
                <Option v-for="type in typeList" :key="type.id" :value="type.id"> {{type.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="机场所有人" prop="airport_holder">
            <Input v-model="formValidate.airport_holder" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场运营人" prop="airport_run">
            <Input v-model="formValidate.airport_run" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="发证机关" prop="certificate_unit">
            <Select v-model="formValidate.certificate_unit">
                <Option v-for="certificateUnit in certificateUnitList"
                :key="certificateUnit.id"
                :value="certificateUnit.id"> {{certificateUnit.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="首次颁证日期" prop="air_url">
            <DatePicker type="date" placeholder="YYYY-MM-DD" v-model="formValidate.first_certificate_time"></DatePicker>
        </FormItem>
        <FormItem label="颁证日期" prop="certificate_time">
            <DatePicker type="date" placeholder="YYYY-MM-DD" v-model="formValidate.certificate_time"></DatePicker>
        </FormItem>
        <FormItem label="状态" prop="airport_status">
            <Select v-model="formValidate.airport_status">
                <Option v-for="dataStatus in dataStatusList"
                :key="dataStatus.id"
                :value="dataStatus.id"> {{dataStatus.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="操作时间" prop="operation_time">
            <DatePicker type="date" placeholder="YYYY-MM-DD" v-model="formValidate.operation_time"></DatePicker>
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
                certificate_log_id: '',
                formValidate: {
                    licence_num: '',
                    airport_name: '',
                    address: '',
                    airport_type: '',
                    airport_rank: '',
                    airport_holder: '',
                    airport_run: '',
                    certificate_unit: '',
                    first_certificate_time: '',
                    certificate_time: '',
                    airport_status: '',
                    operation_time: ''
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
                    certificate_unit: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    airport_status: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                },
                statusList: [
                  { id: '', name: '机场类型（全部）' },
                  { id: 1, name: '跑道型机场' },
                  { id: 2, name: '跑道型机场（兼表面直升机场）' },
                  { id: 3, name: '跑道型机场（兼水上机场）' },
                  { id: 4, name: '跑道型机场（兼表面直升机场、水上机场）' },
                  { id: 5, name: '表面直升机场' },
                  { id: 6, name: '高架直升机场' },
                  { id: 7, name: '船上直升机场' },
                  { id: 8, name: '直升机水上平台' },
                  { id: 9, name: '水上机场' },
                ],
                typeList: [
                  { id: 1, name: 'A1' },
                  { id: 2, name: 'A2' },
                  { id: 3, name: 'A3' },
                  { id: 4, name: 'B' },
                ],
                certificateUnitList: [
                  { id: 1, name: '民航华北地区管理局' },
                  { id: 2, name: '民航西北地区管理局' },
                  { id: 3, name: '民航东北地区管理局' },
                  { id: 4, name: '民航华东地区管理局' },
                  { id: 5, name: '民航西南地区管理局' },
                  { id: 6, name: '民航中南地区管理局' },
                  { id: 7, name: '民航新疆地区管理局' },
                ],
                dataStatusList: [
                  { id: 1, name: '新增' },
                  { id: 2, name: '修改' },
                  { id: 3, name: '注销' },
                ],
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
            // 获取详情页数据
            getData(certificate_log_id){
              const that = this;
              this.$fetch
                .post('/admin/Promulgate_airport_manage/getCertificateLog', {
                  token: this.$stores.getToken(),
                  certificate_log_id: this.certificate_log_id
                })
                .then(res => {
                  for( let i in that.formValidate){
                    that.formValidate[i] = res.data[i];
                  }
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
            }
        },
        created(){
          if(this.$route.query.evidenceId != ''){
            this.certificate_log_id = this.$route.query.evidenceId;
            this.getData();
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>

