# git使用笔记

###### git在项目管理中是必不可少的，这里总结一下aigit的常用使用步骤及指令



### 主要项目

##### git init

###### 初始化git

##### git  add .	

###### 将所有文件内容添加到索引(将修改添加到暂存区)

##### git commit -m "init app"

###### 提交到master版本区，引号里的名字为文件描述

#####  git remote add origin https://github.com/sqm147896325/back.git

###### 添加远程仓库地址到origin

#####  git push origin master

###### 推送到origin所指代的仓库

然后输入用户名密码即可



### 分支管理

##### git checkout -b dev

###### 创建分支与切换分支

#####  git push origin dev

###### 推送分支到origin地址



### 克隆

##### git clone https://github.com/sqm147896325/back.git

###### 克隆该地址的项目

##### git checkout -b dev origin/dev

###### 根据远程仓库创建与切换dev分支，其实dev在clone时已经下载到本地

###### 

### 其他

##### git branch

###### 查看分支

##### git pull origin dev

###### 拉取远程dev分支更新，并与本地dev合并












