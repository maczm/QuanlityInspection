<template>
    <div class="table-name">
        <el-table ref="singleTable" :data="dataList" border highlight-current-row :height="contentHeightNumer"
            @current-change="handleCurrentChange" @row-click="handleCurrentChange" style="width: 100%" :cell-style="cellStyle">
            <el-table-column type="index" width="50" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="CharacteristicText" label="检验描述">
            </el-table-column>
            <el-table-column prop="Status" class-name="jieguo" label="结果" width="60"
                :filters="[{ text: '未检测', value: 0 }, { text: 'NG', value: 8 }, { text: 'OK', value: 14 }]"
                :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                    {{ scope.row.Status == 14 ? 'OK' : scope.row.Status == 8 ? 'NG' : '' }}
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
export default {
    name: "TableContent",
    components: {},
    data() {
        return {
            currentRow: null,
            heightNumer: 0
        };
    },
    props: {
        dataList: {
            type: Array
        },
        tableIndex: {
            type: Number
        },
        showTableContent: {
            type: Boolean
        },
        showSpecialConfiguration: {
            type: Boolean
        },
        contentHeightNumer: {
            type: Number
        },
    },
    watch: {
        showSpecialConfiguration() {
            setTimeout(() => { this.btn() }, 100)
        }, showTableContent() {
            setTimeout(() => { 
                this.$nextTick(() => {
                this.scrollToRow(this.dataList[this.tableIndex])
            })

             }, 100)
        },
        tableIndex() {
            setTimeout(() => {
                this.setCurrent(this.dataList[this.tableIndex], 100)
               
                
            })
        },
        contentHeightNumer() {
            setTimeout(() => {
                this.heightNumer = this.contentHeightNumer;
                this.setCurrent(this.dataList[this.tableIndex], 100)
            })
        }
    },
    mounted() {
        this.heightNumer = document.querySelector('.table-name').offsetHeight;

        this.heightNumer = this.contentHeightNumer;
        setTimeout(() => {
            this.setCurrent(this.dataList[this.tableIndex], 100)

            
        })
    },
    methods: {
        filterTag(value, row) {
            console.log(row, value)
            if (value == 0) {
                return !(row.Status == 8 || row.Status == 14)
            }

            return row.Status === value;
        },
        btn() {
            this.heightNumer = document.querySelector('.table-name').offsetHeight;
            console.log(document.querySelector('.table-name'))
            this.$nextTick(() => {
                this.$refs.singleTable.doLayout()
            })
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
            if (val) {
                this.$emit("updateTableIndex", val.index);
            }
        },
        scrollToRow() {
            //   this.$refs.singleTable.scrollTo(rowIndex);
            this.$nextTick(() => {

                const TableRows = this.$refs.singleTable.bodyWrapper.querySelectorAll('.el-table__body tbody .el-table__row')
                let scrollTop = 0
                for (let i = 0; i < TableRows .length; i++) {
                    if (i === this.tableIndex) {
                        break
                    }
                    scrollTop += TableRows [i].offsetHeight
                }
                this.$refs.singleTable.bodyWrapper.scrollTop = scrollTop


            });
            },
        cellStyle(row) {
            if (row.columnIndex == 2) {
                if (row.row.Status == 8) {
                    return '  background-color: red'
                } else if (row.row.Status == 14) {
                    return '  background-color: #67C23A'
                } else {
                    return 'color: #2c3e50'
                }
            }

        }

    },
};
</script>
<style lang="less" >
td.jieguo {
    color: #fff;
    font-size: 18px;
    text-align: center !important;
    font-weight: 600;
}

.el-table th.el-table__cell>.cell {
    padding: 0;
    text-align: center;
}

.table-name {
    height: 100%;
}

.el-table__body-wrapper.is-scrolling-none::-webkit-scrollbar {}

// .el-table__body-wrapper.is-scrolling-none::-webkit-scrollbar-thumb{
//     border-radius: 10px;
//     box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
//     background: rgb(205 205 205 / 90%);
// }
// .el-table__body-wrapper.is-scrolling-none::-webkit-scrollbar-track{
//     border-radius: 0;
//     box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
//     background: #9b9b9b;
// }
</style>
