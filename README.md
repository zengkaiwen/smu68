# 西南民族大学68周年校庆H5

## 开始使用
### 1.安装依赖
```bash
cnpm i 
```
### 2.运行
> 注意，如果你没有全局安装gulp请先安装，安装命令 `cnpm i gulp -g`

在全局安装了gulp之后，使用：
```bash
gulp
```
即可，然后访问 localhost:8081端口

### 3.部署
进行了第二步之后，会在项目根目录下面生成dist目录，该目录下面则是可直接部署的项目文件，也是访问localhost:8081的项目文件

## 源码说明
本项目使用的第三方库：

zepto.js  v1.2.0

cropper.js  v1.5.0

前端技术栈：

canvas、less、gulp构建工具

## 源码修改
建议在src/less/index.less修改样式代码，主要的页面操作在src/js/index.js文件，页面为index.html，不建议修改其他文件内容