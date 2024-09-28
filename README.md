# Discourse User Posts Script

这个用户脚本为 Discourse 论坛添加了一个便捷功能。它在每个用户的头像旁边添加一个"只看他"按钮。

## 功能

- 在用户头像旁添加"只看他"按钮
- 点击按钮自动为当前链接追加`?username_filters={username}`

## 安装

1. 确保您的浏览器已安装 Tampermonkey 或类似的用户脚本管理器
2. [点击这里](https://github.com/xzcxzcyy/Discourse-Read-His-Post/raw/main/discourse-user-posts.user.js) 安装脚本

## 使用方法

1. 安装脚本后，刷新论坛
2. 在用户头像旁边会出现"只看TA"按钮
3. 点击按钮即可查看该用户的所有帖子

## 注意事项

- 此脚本默认为水源论坛（shuiyuan.sjtu.edu.cn）设置
- 如果您使用其他 Discourse 论坛，请修改脚本中的 @match 行
