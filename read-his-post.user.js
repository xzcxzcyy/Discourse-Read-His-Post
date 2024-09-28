// ==UserScript==
// @name         水源只看TA的帖子
// @namespace    https://github.com/xzcxzcyy
// @version      0.3
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
          position: relative;
      }
      .view-all-posts-button {
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
      }
      .view-all-posts-button:hover {
          background-color: #e0e0e0;
      }
    `;
    document.head.appendChild(style);

    function addViewPostsButton(avatarElement) {
        const postAvatar = avatarElement.closest('.post-avatar');
        if (!postAvatar || postAvatar.querySelector('.view-all-posts-button')) return;

        const username = avatarElement.getAttribute('data-user-card');
        if (!username) return;

        const button = document.createElement('button');
        button.textContent = '只看TA';
        button.className = 'view-all-posts-button';
        button.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('username_filters', username);
            window.location.href = currentUrl.toString();
        };

        postAvatar.appendChild(button);
    }

    function processAvatars() {
        document.querySelectorAll('.topic-avatar a[data-user-card]').forEach(addViewPostsButton);
    }

    // 初始处理
    processAvatars();

    // 使用 MutationObserver 监视新添加的内容
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                processAvatars();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
