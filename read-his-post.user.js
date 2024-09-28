// ==UserScript==
// @name         水源只看TA的帖子
// @namespace    https://github.com/xzcxzcyy
// @version      0.2
// @description  Add a button to view all posts by a user on Discourse forums
// @match        https://shuiyuan.sjtu.edu.cn/*
// @grant        none
// @author       xzcxzcyy
// @homepage     https://github.com/xzcxzcyy
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
      .post-avatar {
          width: auto !important;
      }
      .post-avatar-wrapper {
          width: 100%;
      }
      .view-all-posts-button:hover {
          background-color: #e0e0e0;
      }
  `;
    document.head.appendChild(style);

    // 函数：创建并添加按钮
    function addViewPostsButton(avatarElement, username) {
        const postAvatar = avatarElement.closest('.post-avatar');
        if (!postAvatar) return;

        // 检查是否已经存在按钮
        if (postAvatar.querySelector('.view-all-posts-button')) {
            return; // 如果按钮已存在，则不再添加
        }

        const button = document.createElement('button');
        button.textContent = '只看TA';
        button.className = 'view-all-posts-button';
        button.style.cssText = `
          position: absolute;
          bottom: -20px;
          right: 0;
          font-size: 10px;
          padding: 2px 4px;
          background-color: rgba(240, 240, 240, 0.9);
          border: 1px solid #ccc;
          border-radius: 3px;
          cursor: pointer;
          z-index: 10;
      `;
        button.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('username_filters', username);
            window.location.href = currentUrl.toString();
        };

        // 将按钮插入到 post-avatar 元素中
        postAvatar.style.position = 'relative';
        postAvatar.appendChild(button);
    }

    // 函数：处理新添加的头像元素
    function handleNewAvatars(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const avatars = node.querySelectorAll('.topic-avatar .post-avatar a');
                        avatars.forEach(processAvatar);
                    }
                });
            }
        }
    }

    // 函数：处理单个头像
    function processAvatar(avatar) {
        const postElement = avatar.closest('.topic-post');
        if (postElement) {
            const usernameElement = postElement.querySelector('.username a');
            if (usernameElement) {
                const username = usernameElement.textContent.trim();
                addViewPostsButton(avatar, username);
            }
        }
    }

    // 初始化：为现有的头像添加按钮
    document.querySelectorAll('.topic-avatar .post-avatar a').forEach(processAvatar);

    // 设置MutationObserver来监视新添加的头像
    const observer = new MutationObserver(handleNewAvatars);
    observer.observe(document.body, { childList: true, subtree: true });
})();
