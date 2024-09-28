// ==UserScript==
// @name         水源只看TA的帖子
// @namespace    https://github.com/xzcxzcyy
// @version      0.2
// @description  Add a button to view all posts by a user on Discourse forums
// @match        https://shuiyuan.sjtu.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // 函数：创建并添加按钮
  function addViewPostsButton(avatarElement, username) {
      if (avatarElement.parentNode.querySelector('.view-all-posts-button')) {
          return; // 如果按钮已存在，则不再添加
      }

      const button = document.createElement('button');
      button.textContent = '只看TA';
      button.className = 'view-all-posts-button';
      button.style.cssText = 'position: absolute; z-index: 1000; font-size: 12px; padding: 2px 5px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 3px; cursor: pointer; margin-top: 5px;';
      button.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set('username_filters', username);
          window.location.href = currentUrl.toString();
      };
      avatarElement.parentNode.appendChild(button);
  }

  // 函数：处理新添加的头像元素
  function handleNewAvatars(mutationsList, observer) {
      for(let mutation of mutationsList) {
          if (mutation.type === 'childList') {
              mutation.addedNodes.forEach(node => {
                  if(node.nodeType === Node.ELEMENT_NODE) {
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
          if(usernameElement) {
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
