"use strict";

const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
const form = document.querySelector('.posts__form');
const inputTitle = document.querySelector('.posts__input-title');
const inputContent = document.querySelector('.posts__input-body');
const inputSearch = document.querySelector('.posts__search');
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

const filterArraytForPost = array => {
  array.slice(start, end).forEach(element => {
    createPost(element);
  });
};

const getData = async () => {
  const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseData = await fetchData.json();
  const arrayOfPosts = responseData.map(element => element);
  filterArraytForPost(arrayOfPosts);
  const buttonClip = document.querySelectorAll('.button__clip');

  for (const buttonsClip of buttonClip) {
    buttonsClip.addEventListener('click', () => {
      const parent = buttonsClip.parentElement;
      parent.remove();
    });
  }

  const pushOfArray = (input, array) => {
    const arrayPush = input.value;
    array.push(arrayPush);
  };

  inputSearch.addEventListener('input', () => {
    postsList.innerHTML = '';
    arrayOfPosts.filter(element => {
      if (element.title.includes(inputSearch.value)) {
        const post = createPost(element);
        postsList.append(post);
      }
    });
    console.log(arrayOfPosts);
  });
  buttonNext.addEventListener('click', () => {
    postsList.innerHTML = '';
    inputTitle.value = '';
    inputContent.value = '';
    count++;
    start += 10;
    end += 10;
    buttonPrev.disabled = false;
    const quantityOfPosts = filterArraytForPost(arrayOfPosts);
    const quantityOfPostsOnNextPage = arrayOfPosts.slice(count * 10, (count + 1) * 10);
    quantityOfPosts <= 10 || quantityOfPostsOnNextPage <= 1 ? buttonNext.classList.add('disabled') : buttonNext.classList.remove('disabled');
  });
  buttonPrev.addEventListener('click', () => {
    postsList.innerHTML = '';
    inputTitle.value = '';
    inputContent.value = '';

    if (count === 1) {
      count = 1;
      buttonPrev.disabled = true;
    } else {
      start -= 10;
      end -= 10;
      count--;
      buttonNext.disabled = false;
    }

    filterArraytForPost(arrayOfPosts);
  });
  buttonAddPost.addEventListener('click', () => {
    pushOfArray(inputTitle, arrayCreatedPost);
    pushOfArray(inputContent, arrayCreatedPost);
    inputTitle.value = '';
    inputContent.value = '';
  });
  form.addEventListener('submit', evt => {
    evt.preventDefault();
  });
};

getData(); // const sliceArrays = () => {
//   const arrayOfPosts.push(pushOfArray);
// }