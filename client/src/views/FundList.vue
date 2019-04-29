<template>
  <div>
    <el-form :inline="true" ref="search_data" :model="search_data">
      <!-- <el-form-item label="投标时间筛选:">
        <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
        <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="onScreeoutMoney()">筛选</el-button>
      </el-form-item>-->
      <el-form-item class="btnRight">
        <el-button type="primary" @click="onAddMoney()" size="small" icon="view">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="date" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date.split('T')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center"></el-table-column>
      <el-table-column prop="description" label="收支描述" align="center"></el-table-column>
      <el-table-column prop="income" label="收入" align="center">
        <template slot-scope="scope">
          <span style="color:#00d053">+ {{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expense" label="支出" align="center">
        <template slot-scope="scope">
          <span style="color:#f56767">- {{ scope.row.expense }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
          <el-button type="danger" icon="delete" size="small" @click="onDeleteMoney(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <el-pagination
          :page-sizes="pagination.page_sizes"
          :page-size="pagination.page_size"
          :layout="pagination.layout"
          :total="pagination.total"
          :current-page.sync="pagination.page_index"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
    <Dialog :dialog="dialog" :form="form" @update="getProfile"/>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";

export default {
  components: { Dialog },
  name: "FundList",
  methods: {
    handleSizeChange(page_size) {
      this.pagination.page_size = page_size;
      this.pagination.page_index = 1;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let totla1 = this.pagination.page_size * (page - 1);
      let total2 = this.pagination.page_size * page;
      let newData = [];
      for (let i = totla1; i < total2; i++) {
        if (this.allTableData[i]) {
          newData.push(this.allTableData[i]);
        }
        this.tableData = newData;
      }
    },
    onAddMoney() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        action: "add"
      };
      this.form = {
        type: "",
        description: "",
        income: "",
        expense: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    onEditMoney(row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        action: "edit"
      };
      this.form = {
        type: row.type,
        description: row.description,
        income: row.income,
        expense: row.expense,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    onDeleteMoney(row) {
      this.$axios.delete(`/api/profile/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    getProfile() {
      this.$axios.get("/api/profile").then(
        res => {
          // this.tableData = res.data;
          this.allTableData = res.data;
          this.setPagination();
        },
        error => console.log(error)
      );
    },
    setPagination() {
      this.pagination.total = this.allTableData.length;
      this.pagination.page_index = 1;
      this.pagination.page_size = 5;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    }
  },
  data() {
    return {
      pagination: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      tableData: [],
      allTableData: [],
      search_data: {},
      dialog: {
        show: false,
        title: "",
        action: ""
      },
      form: {
        type: "",
        description: "",
        income: "",
        expense: "",
        cash: "",
        remark: "",
        id: ""
      }
    };
  },
  created() {
    this.getProfile();
  }
};
</script>

<style lang="scss" scoped>
.btnRight {
  float: right;
}
</style>
