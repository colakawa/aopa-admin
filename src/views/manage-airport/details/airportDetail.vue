<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <p style="font-size: 18px;ont-weight: 600;text-align: center;">编辑导航</p>
        <FormItem label="机场类别" prop="other_airport_type">
            <Select v-model="formValidate.other_airport_type">
                <Option v-for="airport in airportList"
                  :key="airport.id"
                  :value="airport.id"> {{airport.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="机场类型" prop="airport_type">
            <Select v-model="formValidate.airport_type">
                <Option v-for="airportType in airportTypeList"
                  :key="airportType.id"
                  :value="airportType.id"> {{airportType.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="机场类/级别" prop="airport_rank">
            <Select v-model="formValidate.airport_rank">
                <Option v-for="airportRank in airportRankList"
                  :key="airportRank.id"
                  :value="airportRank.id"> {{airportRank.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="机场名称" prop="airport_name">
            <Input v-model="formValidate.airport_name" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="许可证编号" prop="licence_num">
            <Input v-model="formValidate.licence_num" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场状态" prop="status">
            <Select v-model="formValidate.status">
                <Option v-for="airportStauts in airportStautsList"
                  :key="airportStauts.id"
                  :value="airportStauts.id"> {{airportStauts.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="机场运营人" prop="airport_run">
            <Input v-model="formValidate.airport_run" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="所属监管局" prop="certificate_unit">
            <Select v-model="formValidate.certificate_unit">
                <Option v-for="certificateUnit in certificateUnitList"
                  :key="certificateUnit.id"
                  :value="certificateUnit.id"> {{certificateUnit.name}} </Option>
            </Select>
        </FormItem>
        <FormItem label="联系电话" prop="contact_num">
            <Input v-model="formValidate.contact_num" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="E-mail" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="联系地址" prop="contact_address">
            <Input v-model="formValidate.contact_address" placeholder="请输入文本"></Input>
        </FormItem>
         <FormItem label="邮政编码" prop="postal_code">
            <Input v-model="formValidate.postal_code" placeholder="请输入文本"></Input>
        </FormItem>
        <FormItem label="机场基准点坐标" prop="longitude">
            <Input v-model="longitudeArr[0]" placeholder="请输入文本" />°
            <Input v-model="longitudeArr[1]" placeholder="请输入文本" />′
            <Input v-model="longitudeArr[2]" placeholder="请输入文本" />″
        </FormItem>
        <FormItem label="机场基准点坐标" prop="latitude">
            <Input v-model="latitudeArr[0]" placeholder="请输入文本" />°
            <Input v-model="latitudeArr[1]" placeholder="请输入文本" />′
            <Input v-model="latitudeArr[2]" placeholder="请输入文本" />″
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
                airid: '',
                longitudeArr: [],
                latitudeArr: [],
                formValidate: {
                    other_airport_type: '',
                    airport_type: '',
                    airport_rank: '',
                    airport_name: '',
                    licence_num: '',
                    airport_run: '',
                    status: '',
                    certificate_unit: '',
                    contact_num: '',
                    email: '',
                    contact_address: '',
                    postal_code: '',
                    longitude: '',
                    latitude: '',
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
                },
                airportList: [ // 机场类别
                  { id: 1, name: '通用机场' },
                  { id: 2, name: '运输机场' },
                  { id: 3, name: '其他起降场地' },
                ],
                airportTypeList: [ // 机场类型
                  { id: 1, name: '跑道型机场' },
                  { id: 2, name: '跑道型机场（兼表面直升机场）' },
                  { id: 3, name: '跑道型机场（兼水上机场）' },
                  { id: 4, name: '跑道型机场（兼表面直升机场、水上机场）' },
                  { id: 5, name: '表面直升机场' },
                  { id: 6, name: '高架直升机场' },
                  { id: 7, name: '船上直升机场' },
                  { id: 8, name: '直升机水上平台' },
                  { id: 9, name: '水上机场' },
                  { id: 10, name: '运输机场' },
                  { id: 11, name: '其他起降场地' },
                ],
                airportRankList: [ // 机场类/级别
                  { id: 1, name: 'A1' },
                  { id: 2, name: 'A2' },
                  { id: 3, name: 'A3' },
                  { id: 4, name: 'B' },
                  { id: 5, name: '运输机场' },
                  { id: 6, name: '运输机场' },
                ],
                airportStautsList: [ // 机场状态
                  { id: 1, name: '未发布' },
                  { id: 2, name: '已发布' },
                  { id: 3, name: '已取证' },
                  { id: 9, name: '冻结' },
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
            // 获取详情数据
            getData(airid){
              const that = this;
              this.$fetch
                .post('/admin/Airport_manage/findAirport', {
                  token: this.$stores.getToken(),
                  airid: this.airid
                })
                .then(res => {
                  for(let i in that.formValidate){
                    that.formValidate[i] = res.data[i];
                  }
                  that.longitudeArr = that.formValidate.longitude.split('-');
                  that.latitudeArr = that.formValidate.latitude.split('-');
                  console.log(res, 'res');
                })
                .catch(error => {
                  console.log(error);
                });
            }
        },
        created(){
          if(this.$route.query.airId != ''){
            this.airid = this.$route.query.airId;
            this.getData();
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>

