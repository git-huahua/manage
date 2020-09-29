<template>
  <div class="cash">
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="供应商">
              <span>{{ props.row.supplier }}</span>
            </el-form-item>

            <el-form-item label="更新日期">
              <span>{{ props.row.nowTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="新增+" scoped-slot>
        <!-- 给表头添加事件的方法 -->
        <template slot="header">
          <el-button-group>
            <!-- <el-tooltip :disabled="false" placement="bottom" effect="light">批量编辑</el-tooltip> -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-circle-plus"
              @click="open"
              >新增</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>

      <el-table-column label="任务单号" prop="orderr"></el-table-column>
      <el-table-column label="物料型号" prop="namee"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="数量" prop="number"></el-table-column>
      <el-table-column label="总价" prop="total"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="messageBox" v-show="appear">
      <div class="insidemessage">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="任务单号">
            <el-input v-model="sizeForm.orderr"></el-input>
          </el-form-item>
          <el-form-item label="物料型号">
            <el-input v-model="sizeForm.namee"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="sizeForm.price"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="sizeForm.num"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="sizeForm.supplier"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      sizeForm: {
        orderr: "",
        namee: "",
        price: null,
        num: null,
        supplier: "",
      },
      appear: false, //弹出框是否显示
      paging: {
        currentPage: 1, // 当前页
        total: null, // 数据总条数, 总数/每页条数=分成多少页
        pageSize: 8, // 每页条数
      },
    };
  },
  created() {
    this.getData(); //每次加载页面时执行
  },
  methods: {
    getData() {
      //获取数据库中数据
      this.axios
        .get("http://127.0.0.1:3000/getdata")
        .then((res) => {
          this.tableData = res.data.getData;
          this.calcul(); //得到数据后执行calcul方法添加total属性
          this.paging.total = res.data.totaldata;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleDelete(item) {
      //删除功能
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h("span", null, "此操作将永久删除该文件, 是否继续?"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 700);
          } else {
            done();
          }
        },
      }).then(() => {
         this.axios.post('http://127.0.0.1:3000/handle',item)
         .then(res => {
            this.tableData=res.data.newData
            this.calcul()
            this.paging.total=res.data.total
         })
         .catch(err => {
           console.error(err);
         })      
      }).catch(() =>{}); //由于elementUI的弹框用promise写的，所以要加上catch，否则虽不影响效果，但会报错，看着烦
    },
    open() {
      //添加功能 ：1 先弹出对话框，点击对话框的添加才向数据库添加内容
      this.appear = true;
    },
    cancel() {
      this.appear = false;
      // this.sizeForm={ orderr:'',namee: '',price: null, num:null,supplier:''}  //加这条有Bug
    },
    onSubmit() {
      //添加功能
      this.cancel();
      this.axios
        .post("http://127.0.0.1:3000/add", this.sizeForm)
        .then((res) => {
          this.tableData = res.data.mydata;
          this.calcul();
          this.paging.total = res.data.total;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    edit() {
      //编辑功能
    },
    calcul() {
      if (this.tableData.length == 0) {
        //tableData里没数据时不执行foreach
        return false;
      } else {
        this.tableData.forEach((item) => {
          //给tableData数组中的对象添加total属性
          item["total"] = Math.floor(item.price * item.number);
          item["nowTime"] = new Date().toLocaleString();
        });
      }
    },
    //分页功能
    getAccountListByPage() {
      //每次换页或更改显示条数是执行此函数
      let pageSize = this.paging.pageSize;
      let currentPage = this.paging.currentPage;
      this.axios
        .get("http://127.0.0.1:3000/paging", {
          params: {
            pageSize,
            currentPage,
          },
        })
        .then((res) => {
          this.paging.total = res.data.total;
          this.tableData = res.data.data;
          this.calcul();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSizeChange(val) {
      //每页显示条数改变触发,此val系统自带的，记录当前每页多少条数据
      this.paging.pageSize = val;
      this.getAccountListByPage();
    },
    handleCurrentChange(val) {
      //当前页码改变触发，此val系统自带的，记录当前第几页
      this.paging.currentPage = val;
      this.getAccountListByPage();
    },
  },
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table td,
.el-table th {
  text-align: center;
}
.el-table__expanded-cell {
  text-align-last: left;
}
.el-table_1_column_2 .cell {
  cursor: pointer;
  font-weight: bold;
  color: crimson;
}
.insidemessage .el-button--primary {
  width: 30%;
}
.messageBox {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
}
.insidemessage {
  width: 500px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  margin-left: 50%;
  margin-top: 10%;
  transform: translateX(-50%);
}
.block {
  text-align: center;
  position: absolute;
  left: 35%;
  bottom: 70px;
}
</style>