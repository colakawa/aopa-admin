<template>
<div>
    <Table border stripe :columns="columns7" :data="userData">
    </Table>
    <Page :total="100" 
    :page-size="pageSize" 
    @on-page-size-change="changePage"
    show-sizer show-total/>
</div>
    
</template>
<script>
import axios from "axios"

    export default {
        data () {
            return {
                columns7: [
                    // {
                    //     title: "Name",
                    //     key: "name",
                    //     render: (h, params) => { //自定义渲染当前列，包括渲染自定义组件，它基于 Vue 的 Render 函数
                    //     //render 函数传入两个参数，第一个是 h，第二个是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。
                    //         return h("div", [
                    //             h("Icon", {
                    //                 props: {
                    //                     type: "person"
                    //                 }
                    //             }),
                    //             h("strong", params.row.name)
                    //         ]);
                    //     }
                    // },
                    {
                        title: "ID",
                        key: "userid"
                    },
                    {
                        title: "用户类型",
                        key: "usergroupid"
                    },
                    {
                        title: "手机",
                        key: "mobile_phone"
                    },
                    {
                        title: "真实姓名",
                        key: "real_name"
                    },
                    {
                        title: "性别",
                        key: "sex"
                    },
                    {
                        title: "昵称",
                        key: "username"
                    },
                    {
                        title: "状态",
                        key: "user_status"
                    },
                    {
                        title: "操作",
                        key: "user_status",
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        // marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '事件')
                            ])
                        }
                    },
                    {
                        title: "注册时间",
                        key: "add_time"
                    },
                    {
                        title: "最后修改时间",
                        key: "last_save_time"
                    },
                    
                    // {
                    //     title: "Action",
                    //     key: "action",
                    //     width: 150,
                    //     align: "center",
                    //     render: (h, params) => {
                    //         return h("div", [
                    //             h("Button", {
                    //                 props: {
                    //                     type: "primary",
                    //                     size: "small"
                    //                 },
                    //                 style: {
                    //                     marginRight: "5px"
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.show(params.index)
                    //                     }
                    //                 }
                    //             }, "View"),
                    //             h("Button", {
                    //                 props: {
                    //                     type: "error",
                    //                     size: "small"
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.remove(params.index)
                    //                     }
                    //                 }
                    //             }, "Delete")
                    //         ]);
                    //     }
                    // }
                ],
                data6: [
                    {
                        name: "John Brown",
                        age: 18,
                        address: "New York No. 1 Lake Park"
                    },
                    {
                        name: "Jim Green",
                        age: 24,
                        address: "London No. 1 Lake Park"
                    },
                    {
                        name: "Joe Black",
                        age: 30,
                        address: "Sydney No. 1 Lake Park"
                    },
                    {
                        name: "Jon Snow",
                        age: 26,
                        address: "Ottawa No. 2 Lake Park"
                    }
                ],
                userData: [],
                pageSize: 10, // 每页显示条数
                pageCount: 0, //总条数
                pages: 1 //当前页
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: "User Info",
                    // content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                    content: `123`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            getData(pageSize,pages){
                let that = this;
                axios.post("http://www.csairport.com/admin/index/adminUserInfo",{
                    token:"dd4eba2fad49723084239198a4bb9dcd",
                    pages: pages,
                    page_num:pageSize
                })
                .then(function (res) {
                    that.userData = res.data.data
                    this.dataCount = this.data.length;
                    this.nowData = [];
                    console.log(that.userData)
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
            // 点击切换分页
            changePage(){
                this.pageSize = 20;
                this.pages = this.pages+1
                getData(this.pageSize, this.pages)
                console.log(this.pageSize, this.pages)
                // let _start = (index - 1)*this.pageSize;
                // let _end = index*this.pageSize;
                // this.nowData = this.data.slice(_start, _end);
                // this.pageCur = index;
            },
            _nowPageSize(index){
                this.pageSize = index;
            }
        },
        created () {
            this.getData()
        }
    }
</script>
