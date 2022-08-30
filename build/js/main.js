"use strict";

const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');

const makeTag = function (tagName, tagClass, placeAdd) {
  let tagContent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  const element = document.createElement(tagName);
  element.classList.add(tagClass);
  element.textContent = tagContent;
  placeAdd.append(element);
  return element;
};

const createPost = _ref => {
  let {
    id,
    title,
    body
  } = _ref;
  const li = makeTag('li', 'posts__element', postsList);
  makeTag('h3', 'posts__title', li, title);
  makeTag('p', 'posts__text', li, body);
  makeTag('span', 'posts__id', li, id);
};

const getData = async () => {
  const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseData = await fetchData.json();
  console.log(responseData);
  const arrayOfPosts = responseData.map(element => element);
  arrayOfPosts.forEach(element => {
    createPost(element);
  });
  console.log(arrayOfPosts);
};

getData();