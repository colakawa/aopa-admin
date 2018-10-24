<template>
    <div class="table-wrap">
        <div class="filter-search">
            <p>筛选条件</p>
            <div>一大堆的筛选条件</div>
        </div>
        <div class="table-sub-wrap">
            <p>机场管理</p>
            <table class="table-data">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>机场名称</th>
                        <th>机场类别</th>
                        <th>机场类型</th>
                        <th>机场类/级别</th>
                        <th>机场运营人</th>
                        <th>所属用户</th>
                        <th>状态</th>
                        <th>操作</th>
                        <th>发布时间</th>
                        <th>最后修改时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in airportData" :key="item.airid">
                        <td>{{item.airid}}</td>
                        <td>{{item.airport_name}}</td>
                        <td>{{item.other_airport_type}}</td>
                        <td>{{item.airport_type}}</td>
                        <td>{{item.airport_rank}}</td>
                        <td>{{item.airport_run}}</td>
                        <td>{{item.mobile_phone}}</td>
                        <td>{{item.status}}</td>
                        <td>
                            <span>{{item.status}}</span>
                            <span>{{item.status}}</span>
                            <span>{{item.status}}</span>
                        </td>
                        <td>{{item.release_time}}</td>
                        <td>{{item.save_time}}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            airportData: [
                {
                    add_time: "2018-05-22 11:35:47",
                    airid: 82,
                    airport_name: "北京八达岭机场",
                    airport_rank: "A1 ",
                    airport_run: "北京八达岭机场管理有限公司",
                    airport_type: "跑道型机场（兼表面直升机场）",
                    mobile_phone: "13811282531",
                    other_airport_type: "通用机场",
                    release_time: "2018-05-22 11:35:55",
                    save_time: "2018-07-23 10:53:40",
                    status: "未发布",
                    type: 1,
                    userid: 55
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let that = this;
            axios
                .post(
                    "http://www.csairport.com/admin/Airport_manage/AdminAirportInfo",
                    {
                        token: "bbdd968782f7dd467b2e6846acae584b",
                        pages: 1,
                        page_name: 10
                    }
                )
                .then(function(res) {
                    that.airportData = res.data.data;
                    console.log(that.airportData);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>


<style lang="scss" scoped>
.table-wrap {
    width: 100%;
    height: 850px;
    // background-color: yellowgreen;
    .table-sub-wrap {
        .table-data {
            border-collapse: collapse;
            tbody {
                tr {
                    td {
                        border: 1px solid #000;
                    }
                }
            }
        }
    }
}
</style>
