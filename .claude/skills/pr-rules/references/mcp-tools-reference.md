# MCP Tools 详细参考

## ado-tools 服务器工具

### create_draft_pr
创建Azure DevOps草稿PR

**必需参数：**
- `branchName`: 源分支名称
- `repoName`: 仓库名称（SmartGotMail）

**可选参数：**
- `title`: PR标题（仅用于创建，不支持更新）
- `description`: PR描述（仅用于创建，不支持更新）
- `projectName`: 项目名称（默认：Concordia）
- `orgUrl`: 组织URL（默认：https://dev.azure.com/AIVertical）
- `adoTaskId`: ADO任务ID（用于关联工作项）
- `targetBranch`: 目标分支（默认：main，仅用于创建）

**返回值：**
- PR ID和URL
- 草稿状态确认

### publish_draft_pr
发布草稿PR使其可供审查

**必需参数：**
- `prIdOrUrl`: PR ID或完整URL

**可选参数：**
- `repoName`: 仓库名称（如环境变量未设置）
- `projectName`: 项目名称（如环境变量未设置）
- `orgUrl`: 组织URL（如环境变量未设置）

### submit_changes
提交本地更改并创建/更新PR（完整流程）

**可选参数：**
- `branchName`: 分支名称（默认使用当前分支）

**注意：** 此工具会执行完整的commit + push + create PR流程

### get_pr_content
获取PR的内容、评论和变更文件

**必需参数：**
- `prIdOrUrl`: PR ID或完整URL

**可选参数：**
- `repoName`, `projectName`, `orgUrl`: 项目配置

## git-tools 服务器工具

### commit_and_push
暂存更改、提交并推送到远端分支

**必需参数：**
- `commitMessage`: 提交信息（单行，无换行符）
- `workingDir`: 工作目录路径

**可选参数：**
- `branchName`: 推送的分支名称（默认当前分支）
- `includeUntrackedFiles`: 是否包含未追踪文件（默认：false）
- `remoteName`: 远端名称（默认：origin）

**注意：**
- 默认仅暂存已追踪文件（`git add -u`）
- 设置 `includeUntrackedFiles: true` 则暂存所有文件（`git add .`）

### git_implementation_setup
设置git实现环境并验证分支状态

**必需参数：**
- `workingDir`: 工作目录
- `branchName`: 目标分支名称

**可选参数：**
- `repoName`: 仓库名称验证
- `rebaseEnabled`: 是否启用rebase（默认：false）
- `remoteName`: 远端名称（默认：origin）

### create_new_branch
创建标准格式的新分支

**必需参数：**
- `workingDir`: 工作目录

**可选参数：**
- `featureName`: 功能名称（用于分支命名）
- `repoName`: 仓库名称验证

**生成格式：** `users/<user-alias>/<feature-name>`

## 工具选择指南

### 何时使用 create_draft_pr
- 用户仅要求"创建PR"
- 代码已经推送到远端
- 需要精确控制PR创建过程

### 何时使用 submit_changes
- 用户明确要求"提交并创建PR"
- 需要执行完整的代码提交流程
- 一站式解决方案

### 何时使用 commit_and_push
- 需要独立的代码提交操作
- 在创建PR之前先推送代码
- 精确控制提交过程

## 错误处理模式

### 分支不存在
```json
{
  "error": "Branch not found",
  "solution": "create_new_branch或手动创建分支"
}
```

### 无提交可推送
```json
{
  "error": "No commits to push", 
  "solution": "检查是否有代码更改需要提交"
}
```

### PR已存在
```json
{
  "error": "PR already exists",
  "solution": "使用publish_draft_pr发布现有PR"
}
```

### Upstream tracking错误
```json
{
  "error": "No upstream branch",
  "solution": "git branch --set-upstream-to=origin/<branch>"
}