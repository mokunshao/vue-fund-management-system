<template>
  <div>
    <el-form :inline="true" ref="search_data" :model="search_data" style="margin: 10px 0 0 10px;">
      <el-form-item label="时间筛选:">
        <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
        <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="onScreening()">筛选</el-button>
      </el-form-item>

      <el-form-item class="btnRight">
        <el-button
          type="primary"
          @click="onAddMoney()"
          size="small"
          icon="el-icon-document-add"
          v-if="userInfo.identity =='manager'"
        >添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" align="center"></el-table-column>
      <el-table-column prop="date" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <!-- <span style="margin-left: 10px">{{ new Date(scope.row.date).toLocaleString() }}</span> -->
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
      <el-table-column
        prop="operation"
        align="center"
        label="操作"
        width="150"
        v-if="userInfo.identity =='manager'"
      >
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="onEditMoney(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="onDeleteMoney(scope.row)">删除</el-button>
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
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  components: { Dialog },
  name: "FundList",
  methods: {
    onScreening() {
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
      } else {
        const stime = this.search_data.startTime.getTime();
        const etime = this.search_data.endTime.getTime();
        this.allTableData = this.filterTableData.filter(item => {
          let date = new Date(item.date);
          let time = date.getTime();
          return time >= stime && time <= etime;
        });
        this.setPagination();
      }
    },
    handleSizeChange(page_size) {
      this.pagination.page_size = page_size;
      this.pagination.page_index = 1;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 另一种实现方式：
      // let totla1 = this.pagination.page_size * (page - 1);
      // let total2 = this.pagination.page_size * page;
      // let newData = [];
      // for (let i = totla1; i < total2; i++) {
      //   if (this.allTableData[i]) {
      //     newData.push(this.allTableData[i]);
      //   }
      //   this.tableData = newData;
      // }
      let unwantedData = this.pagination.page_size * (page - 1);
      let newData = this.allTableData.filter((item, index) => {
        return index >= unwantedData;
      });
      this.tableData = newData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
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
      this.$axios.delete(`/api/profile/delete/${row._id}`).then(() => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    getProfile() {
      this.$axios.get("/api/profile").then(res => {
        this.filterTableData = res.data;
        this.allTableData = res.data;
        this.setPagination();
      });
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
      filterTableData: {},
      search_data: {
        startTime: "",
        endTime: ""
      },
      pagination: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      tableData: [],
      allTableData: [],
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
