"use strict";

const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
let count = 1;
let start = 0;
let end = 10;

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
  makeTag('span', 'posts__id', li, id);
  makeTag('h3', 'posts__title', li, title);
  makeTag('p', 'posts__text', li, body);
  makeTag('button', 'button__clip', li);
};

const getData = async () => {
  const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseData = await fetchData.json();
  const arrayOfPosts = responseData.map(element => element);
  arrayOfPosts.slice(start, end).forEach(element => {
    createPost(element);
  });
  const buttonClip = document.querySelectorAll('.button__clip');
  buttonClip.addEventListener('click', () => {
    console.log('data');
  });
};

getData();
buttonPrev.addEventListener('click', () => {
  postsList.innerHTML = '';
  getData();

  if (count === 1) {
    count = 1;
  } else {
    start -= 10;
    end -= 10;
    count--;
  }
});
buttonNext.addEventListener('click', () => {
  postsList.innerHTML = '';
  getData();
  count++;
  start += 10;
  end += 10;
});