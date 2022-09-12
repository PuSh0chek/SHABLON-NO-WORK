"use strict";

const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
const form = document.querySelector('.posts__form');
const inputTitle = document.querySelector('.posts__input-title');
const inputContent = document.querySelector('.posts__input-body');
const buttonAddPost = document.querySelector('.posts__button-add');
const buttonCleaningForm = document.querySelector('.posts__cleaning-form');
let count = 1;
let start = (count - 1) * 10;
let end = count * 10;
const arrayCreatedPost = [];

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

const pushOfArray = (input, array) => {
  const arrayPush = input.value;
  array.push(arrayPush);
}; // const sliceArrays = () => {
//   const arrayOfPosts.push(pushOfArray);
// }


buttonAddPost.addEventListener('click', () => {
  pushOfArray(inputTitle, arrayCreatedPost);
  pushOfArray(inputContent, arrayCreatedPost);
});
form.addEventListener('click', evt => {
  evt.preventDefault();
});
buttonPrev.addEventListener('click', () => {
  postsList.innerHTML = '';

  if (count === 1) {
    count = 1;
    buttonPrev.disabled = true;
  } else {
    start -= 10;
    end -= 10;
    count--;
    buttonNext.disabled = false;
  }

  getData();
});
buttonNext.addEventListener('click', () => {
  postsList.innerHTML = '';
  count++;
  start += 10;
  end += 10;
  buttonPrev.disabled = false;
  getData();
});