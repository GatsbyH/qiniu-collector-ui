<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="领域" prop="field">
        <el-input
            v-model="queryParams.field"
            placeholder="请输入领域"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="上次执行时间" prop="lastExecutionTime">-->
<!--        <el-date-picker clearable-->
<!--                        v-model="queryParams.lastExecutionTime"-->
<!--                        type="date"-->
<!--                        value-format="YYYY-MM-DD"-->
<!--                        placeholder="请选择上次执行时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="下次执行时间" prop="nextExecutionTime">-->
<!--        <el-date-picker clearable-->
<!--                        v-model="queryParams.nextExecutionTime"-->
<!--                        type="date"-->
<!--                        value-format="YYYY-MM-DD"-->
<!--                        placeholder="请选择下次执行时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="逻辑删除" prop="deleted">-->
<!--        <el-input-->
<!--            v-model="queryParams.deleted"-->
<!--            placeholder="请输入逻辑删除"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
<!--        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="Refresh" @click="resetQuery">重置</el-button>-->
        <el-button icon="Refresh" @click="startGetDeveloper" >拉取数据</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['test:tasks:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['test:tasks:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['test:tasks:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['test:tasks:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tasksList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID，自动增长" align="center" prop="id" />
<!--      <el-table-column label="领域" align="center" prop="field" />-->
      <el-table-column label="领域" align="center" prop="field">
        <template #default="{ row }">
          <a @click="handleFieldClick(row.field)" style="cursor: pointer; color: blue;">
            {{ row.field }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="任务状态：PENDING(待执行), RUNNING(执行中), COMPLETED(已完成), FAILED(失败)" align="center" prop="status" />
      <el-table-column label="上次执行时间" align="center" prop="lastExecutionTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.lastExecutionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下次执行时间" align="center" prop="nextExecutionTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.nextExecutionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次失败信息" align="center" prop="lastFailureMessage" />
<!--      <el-table-column label="逻辑删除" align="center" prop="deleted" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['test:tasks:edit']">修改</el-button>-->
<!--          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['test:tasks:remove']">删除</el-button>-->
          <el-button link type="primary" icon="Edit" @click="startGetDeveloperRow(scope.row)" >开始</el-button>
          <el-button link type="primary" icon="Delete" @click="stopGetDeveloper(scope.row)">停止</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改任务调度对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="tasksRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="领域" prop="field">
          <el-input v-model="form.field" placeholder="请输入领域" />
        </el-form-item>
        <el-form-item label="上次执行时间" prop="lastExecutionTime">
          <el-date-picker clearable
                          v-model="form.lastExecutionTime"
                          type="date"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择上次执行时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下次执行时间" prop="nextExecutionTime">
          <el-date-picker clearable
                          v-model="form.nextExecutionTime"
                          type="date"
                          value-format="YYYY-MM-DD"
                          placeholder="请选择下次执行时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上次失败信息" prop="lastFailureMessage">
          <el-input v-model="form.lastFailureMessage" type="textarea" placeholder="请输入内容" />
        </el-form-item>
<!--        <el-form-item label="逻辑删除" prop="deleted">-->
<!--          <el-input v-model="form.deleted" placeholder="请输入逻辑删除" />-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Tasks">
import { listTasks, getTasks, delTasks, addTasks, updateTasks } from "../../../api/github/tasks.js";
import {startGetDeveloperByField, stopGetDeveloperByField} from "../../../api/github/developers.js";

const { proxy } = getCurrentInstance();

const tasksList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    field: null,
    status: null,
    lastExecutionTime: null,
    nextExecutionTime: null,
    lastFailureMessage: null,
    deleted: null
  },
  rules: {
    field: [
      { required: true, message: "领域不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "任务状态：PENDING(待执行), RUNNING(执行中), COMPLETED(已完成), FAILED(失败)不能为空", trigger: "change" }
    ],
    nextExecutionTime: [
      { required: true, message: "下次执行时间不能为空", trigger: "blur" }
    ],
    deleted: [
      { required: true, message: "逻辑删除不能为空", trigger: "blur" }
    ]
  }
});
const router = useRouter();

const handleFieldClick = (field) => {
  // 根据需要执行跳转
  console.log(`跳转到领域: ${field}`);
  // 例如，使用 router 跳转
  // router.push({ name: 'FieldDetail', params: { field } });github/developers
  router.push({ name: 'developers', params: { field: field } });

};

const { queryParams, form, rules } = toRefs(data);

/** 查询任务调度列表 */
function getList() {
  loading.value = true;
  listTasks(queryParams.value).then(response => {
    tasksList.value = response.data.list;
    total.value = response.data.total;
    loading.value = false;
  });
}

function startGetDeveloper(){
  startGetDeveloperByField(queryParams.value).then(response => {
    if (response.code == 200){
      getList()
      proxy.$modal.msgSuccess(response.info);
    }else{
      proxy.$modal.msgError(response.info);
    }
  });
}

function startGetDeveloperRow(row){
  startGetDeveloperByField(row).then(response => {
    if (response.code == 200){
      proxy.$modal.msgSuccess(response.info);
      //延迟5s刷新
      setTimeout(function(){
        getList()
      },3000)
    }else{
      proxy.$modal.msgError(response.info);
    }
  });
}


function stopGetDeveloper(row){
  stopGetDeveloperByField(row).then(response => {
    if (response.code == 200){
      proxy.$modal.msgSuccess(response.info);
      //延迟5s刷新
      setTimeout(function(){
        getList()
      },3000)
    }else{
      proxy.$modal.msgError(response.info);
    }
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    field: null,
    status: null,
    lastExecutionTime: null,
    nextExecutionTime: null,
    lastFailureMessage: null,
    createTime: null,
    updateTime: null,
    createBy: null,
    updateBy: null,
    deleted: null
  };
  proxy.resetForm("tasksRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加任务调度";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getTasks(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改任务调度";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["tasksRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateTasks(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTasks(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除任务调度编号为"' + _ids + '"的数据项？').then(function() {
    return delTasks(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('test/tasks/export', {
    ...queryParams.value
  }, `tasks_${new Date().getTime()}.xlsx`)
}

getList();
</script>
