"use strict";

const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');
const buttonPrev = document.querySelector('.posts__button-prev');
const buttonNext = document.querySelector('.posts__button-next');
const inputTitleInForm = document.querySelector('.posts__input-title');
const inputContentInForm = document.querySelector('.posts__input-body');
const buttonAddPost = document.querySelector('.posts__button-add');
const buttonCleaningForm = document.querySelector('.posts__cleaning-form');
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

  for (const buttonsClip of buttonClip) {
    buttonsClip.addEventListener('click', () => {
      const parent = buttonsClip.parentElement;
      parent.remove();
    });
  }
};

getData();
buttonPrev.addEventListener('click', () => {
  postsList.innerHTML = '';

  if (count === 1) {
    start = 0;
    end = 10;
    count = 1;
    buttonPrev.disabled = true;
  } else {
    start -= 10;
    end -= 10;
    count--;
    buttonNext.disabled = false;
  }
});
buttonNext.addEventListener('click', () => {
  postsList.innerHTML = '';
  count++;
  start += 10;
  end += 10;
  buttonPrev.disabled = false;
});
buttonAddPost.addEventListener('click', () => {
  const title = inputTitleInForm.value;
  const content = inputContentInForm.value;
  makeTag('li', 'posts__element', postsList);
  makeTag('span', 'posts__id', li, id);
  makeTag('h3', 'posts__title', li, title);
  makeTag('p', 'posts__text', li, content);
  makeTag('button', 'button__clip', li);
});
buttonCleaningForm.addEventListener('click', () => {
  inputTitleInForm.value = '';
  inputContentInForm.value = '';
});