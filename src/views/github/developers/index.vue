<style>
.link-style {
  color: #007BFF; /* 蓝色链接 */
  text-decoration: none; /* 去除下划线 */
}

.link-style:hover {
  color: #0056b3; /* 鼠标悬停时颜色变深 */
  text-decoration: underline; /* 鼠标悬停时添加下划线 */
}
</style>
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="用户名" prop="login">-->
<!--        <el-input-->
<!--            v-model="queryParams.login"-->
<!--            placeholder="请输入用户名"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="真实姓名" prop="name">-->
<!--        <el-input-->
<!--            v-model="queryParams.name"-->
<!--            placeholder="请输入真实姓名"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="用户位置" prop="location">-->
<!--        <el-input-->
<!--            v-model="queryParams.location"-->
<!--            placeholder="请输入用户位置"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="用户领域" prop="field">
        <el-input
            v-model="queryParams.field"
            placeholder="请输入用户领域"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="国家" prop="field">
        <el-input
            v-model="queryParams.nation"
            placeholder="请输入国家"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="用户国籍" prop="nation">-->
<!--        <el-input-->
<!--            v-model="queryParams.nation"-->
<!--            placeholder="请输入用户国籍"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="GitHub地址" prop="htmlUrl">-->
<!--        <el-input-->
<!--            v-model="queryParams.htmlUrl"-->
<!--            placeholder="请输入GitHub地址"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="人才指数" prop="talentRank">-->
<!--        <el-input-->
<!--            v-model="queryParams.talentRank"-->
<!--            placeholder="请输入人才指数"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="公司" prop="company">-->
<!--        <el-input-->
<!--            v-model="queryParams.company"-->
<!--            placeholder="请输入公司"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="博客链接" prop="blog">-->
<!--        <el-input-->
<!--            v-model="queryParams.blog"-->
<!--            placeholder="请输入博客链接"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="电子邮件" prop="email">-->
<!--        <el-input-->
<!--            v-model="queryParams.email"-->
<!--            placeholder="请输入电子邮件"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否可被雇佣" prop="hireable">-->
<!--        <el-input-->
<!--            v-model="queryParams.hireable"-->
<!--            placeholder="请输入是否可被雇佣"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="Twitter用户名" prop="twitterUsername">-->
<!--        <el-input-->
<!--            v-model="queryParams.twitterUsername"-->
<!--            placeholder="请输入Twitter用户名"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="公共仓库数量" prop="publicRepos">-->
<!--        <el-input-->
<!--            v-model="queryParams.publicRepos"-->
<!--            placeholder="请输入公共仓库数量"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="公共Gist数量" prop="publicGists">-->
<!--        <el-input-->
<!--            v-model="queryParams.publicGists"-->
<!--            placeholder="请输入公共Gist数量"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="粉丝数量" prop="followers">-->
<!--        <el-input-->
<!--            v-model="queryParams.followers"-->
<!--            placeholder="请输入粉丝数量"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="关注的用户数量" prop="following">-->
<!--        <el-input-->
<!--            v-model="queryParams.following"-->
<!--            placeholder="请输入关注的用户数量"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="项目URL" prop="repositoryUrl">-->
<!--        <el-input-->
<!--            v-model="queryParams.repositoryUrl"-->
<!--            placeholder="请输入项目URL"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">更新数据</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
<!--        <el-button icon="Refresh" :loading="loadingDevelopers"  @click="startGetDeveloper" >拉取数据</el-button>-->
<!--        <el-button icon="Delete" @click="stopGetDeveloper">停止拉取数据</el-button>-->
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['test:developers:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['test:developers:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['test:developers:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['test:developers:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table  v-loading="loading" :data="developersList" @selection-change="handleSelectionChange">
      <el-table-column  type="selection" width="55" align="center" />
<!--      <el-table-column label="主键ID，自动增长" align="center" prop="id" />-->
      <el-table-column label="用户名" align="center" prop="login" />
      <el-table-column label="真实姓名" align="center" prop="name" />
      <el-table-column label="用户类型" align="center" prop="type" />
      <el-table-column label="头像" align="center" prop="avatarUrl" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.avatarUrl" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="用户位置" align="center" prop="location" />
      <el-table-column label="用户领域" align="center" prop="field" />
      <el-table-column label="用户国籍" align="center" prop="nation" />
<!--      <el-table-column label="GitHub主页地址" align="center" prop="htmlUrl" />-->
<!--      <el-table-column label="代表项目地址" align="center" prop="repositoryUrl" />-->
      <el-table-column label="GitHub主页地址" align="center" prop="htmlUrl">
        <template #default="scope">
          <a :href="scope.row.htmlUrl" class="link-style" target="_blank" rel="noopener noreferrer">{{ scope.row.htmlUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column label="代表项目地址" align="center" prop="repositoryUrl">
        <template #default="scope">
          <a :href="scope.row.repositoryUrl" class="link-style" target="_blank" rel="noopener noreferrer">{{ scope.row.repositoryUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column label="人才指数" align="center" prop="talentRank" />
      <el-table-column label="评估信息" show-overflow-tooltip align="center" prop="assessment" />
      <el-table-column label="公司" align="center" prop="company" />
      <el-table-column label="博客链接" align="center" prop="blog" />
      <el-table-column label="电子邮件" align="center" prop="email" />
      <el-table-column label="是否可被雇佣" align="center" prop="hireable" />
      <el-table-column label="个人简介" align="center" prop="bio" />
      <el-table-column label="Twitter用户名" align="center" prop="twitterUsername" />
      <el-table-column label="公共仓库数量" align="center" prop="publicRepos" />
      <el-table-column label="公共Gist数量" align="center" prop="publicGists" />
      <el-table-column label="粉丝数量" align="center" prop="followers" />
      <el-table-column label="关注的用户数量" align="center" prop="following" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['test:developers:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['test:developers:remove']">删除</el-button>
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

    <!-- 添加或修改开发者信息对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="developersRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="login">
          <el-input v-model="form.login" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="头像" prop="avatarUrl">
          <image-upload v-model="form.avatarUrl"/>
        </el-form-item>
        <el-form-item label="用户位置" prop="location">
          <el-input v-model="form.location" placeholder="请输入用户位置" />
        </el-form-item>
        <el-form-item label="用户领域" prop="field">
          <el-input v-model="form.field" placeholder="请输入用户领域" />
        </el-form-item>
        <el-form-item label="用户国籍" prop="nation">
          <el-input v-model="form.nation" placeholder="请输入用户国籍" />
        </el-form-item>
        <el-form-item label="GitHub地址" prop="htmlUrl">
          <el-input v-model="form.htmlUrl" placeholder="请输入GitHub地址" />
        </el-form-item>
        <el-form-item label="人才指数" prop="talentRank">
          <el-input v-model="form.talentRank" placeholder="请输入人才指数" />
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="form.company" placeholder="请输入公司" />
        </el-form-item>
        <el-form-item label="博客链接" prop="blog">
          <el-input v-model="form.blog" placeholder="请输入博客链接" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮件" />
        </el-form-item>
        <el-form-item label="是否可被雇佣" prop="hireable">
          <el-input v-model="form.hireable" placeholder="请输入是否可被雇佣" />
        </el-form-item>
        <el-form-item label="个人简介" prop="bio">
          <el-input v-model="form.bio" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="Twitter用户名" prop="twitterUsername">
          <el-input v-model="form.twitterUsername" placeholder="请输入Twitter用户名" />
        </el-form-item>
        <el-form-item label="公共仓库数量" prop="publicRepos">
          <el-input v-model="form.publicRepos" placeholder="请输入公共仓库数量" />
        </el-form-item>
        <el-form-item label="公共Gist数量" prop="publicGists">
          <el-input v-model="form.publicGists" placeholder="请输入公共Gist数量" />
        </el-form-item>
        <el-form-item label="粉丝数量" prop="followers">
          <el-input v-model="form.followers" placeholder="请输入粉丝数量" />
        </el-form-item>
        <el-form-item label="关注的用户数量" prop="following">
          <el-input v-model="form.following" placeholder="请输入关注的用户数量" />
        </el-form-item>
        <el-form-item label="项目URL" prop="repositoryUrl">
          <el-input v-model="form.repositoryUrl" placeholder="请输入项目URL" />
        </el-form-item>
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

<script setup name="Developers">
import { listDevelopers, getDevelopers, delDevelopers, addDevelopers, updateDevelopers } from "@/api/github/developers";
import {startGetDeveloperByField, stopGetDeveloperByField} from "../../../api/github/developers.js";
import {useRoute} from "vue-router";

const { proxy } = getCurrentInstance();

const developersList = ref([]);
const open = ref(false);
const loading = ref(false);
const loadingDevelopers = ref(false);

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
    nation: null
  },
  rules: {
    login: [
      { required: true, message: "用户名不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询开发者信息列表 */
function getList() {
  loading.value = true;
  listDevelopers(queryParams.value).then(response => {
    console.log(response)
    developersList.value = response.data.list;
    total.value = response.data.total;
    loading.value = false;
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
    login: null,
    name: null,
    avatarUrl: null,
    location: null,
    field: null,
    nation: null,
    htmlUrl: null,
    talentRank: null,
    company: null,
    blog: null,
    email: null,
    hireable: null,
    bio: null,
    twitterUsername: null,
    publicRepos: null,
    publicGists: null,
    followers: null,
    following: null,
    type: null,
    repositoryUrl: null
  };
  proxy.resetForm("developersRef");
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

function startGetDeveloper(){
  startGetDeveloperByField(queryParams.value).then(response => {
    if (response.code == 200){
      loadingDevelopers.value = true;
      proxy.$modal.msgSuccess(response.info);
    }else{
      proxy.$modal.msgError(response.info);
    }
  });
}
function stopGetDeveloper(){
  stopGetDeveloperByField(queryParams.value).then(response => {
    if (response.code == 200){
      loadingDevelopers.value = false;
      proxy.$modal.msgSuccess(response.info);
    }else{
      proxy.$modal.msgError(response.info);
    }
  });
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
  title.value = "添加开发者信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getDevelopers(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改开发者信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["developersRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateDevelopers(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addDevelopers(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除开发者信息编号为"' + _ids + '"的数据项？').then(function() {
    return delDevelopers(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('test/developers/export', {
    ...queryParams.value
  }, `developers_${new Date().getTime()}.xlsx`)
}
const pollingInterval = ref(null); // 存储定时器 ID
const route = useRoute();
// 页面加载时启动轮询
onMounted(() => {

  queryParams.value.field = route.params.field; // 接收字符串参数
  getList(); // 首次加载数据
  // pollingInterval.value = setInterval(getList, 10000); // 每10秒调用一次
});

// 组件卸载时清除定时器
// onUnmounted(() => {
//   clearInterval(pollingInterval.value);
// });
getList();
</script>
