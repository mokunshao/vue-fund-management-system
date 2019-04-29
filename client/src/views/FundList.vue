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
          <el-button
            type="danger"
            icon="delete"
            size="small"
            @click="onDeleteMoney(scope.row,scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Dialog :dialog="dialog" @update='getProfile'/>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";

export default {
  components: { Dialog },
  name: "FundList",
  methods: {
    onAddMoney() {
      this.dialog.show = true;
    },
    onEditMoney() {
      console.log(123);
    },
    onDeleteMoney() {
      console.log(456);
    },
    getProfile() {
      this.$axios.get("/api/profiles").then(
        res => {
          this.tableData = res.data;
        },
        error => console.log(error)
      );
    }
  },
  data() {
    return {
      tableData: [],
      search_data: {},
      dialog: {
        show: false,
        title: "we"
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
