const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');
const buttonPrev = document.querySelector('.button__prev');
const buttonNext = document.querySelector('.button__next');
const buttonNew = document.querySelector('.button__new');
const buttonAddPost = document.querySelector('.posts__button-add');
const buttonCleaningForm = document.querySelector('.posts__cleaning-form');

let count = 1;
let start = 0;
let end = 10;
const newPostId = end - 1;
let countPage = 

const makeTag = (tagName, tagClass, placeAdd, tagContent = '') => {
  const element = document.createElement(tagName);
  element.classList.add(tagClass);
  element.textContent = tagContent;
  placeAdd.append(element);
  return element;
};

const createPost = ({ id, title, body }) => {
  const li = makeTag('li', 'posts__element', postsList);
  makeTag('span', 'posts__id', li, id);
  makeTag('h3', 'posts__title', li, title);
  makeTag('p', 'posts__text', li, body);
  makeTag('button', 'button__clip', li);
};

const getData = async () => {
  const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseData = await fetchData.json();
  const arrayOfPosts = responseData.map((element) => element);
  arrayOfPosts.slice(start, end).forEach((element) => {
    createPost(element);
  });
  const buttonClip = document.querySelectorAll('.button__clip');
  for (const buttonsClip of buttonClip) {
    buttonsClip.addEventListener('click', () => {
      const parent = buttonsClip.parentElement;
      parent.remove();
      console.log(buttonsClip.parentElement);
    });
  }

};

getData();

buttonPrev.addEventListener('click', () => {
  postsList.innerHTML = '';
  getData();
  if (count === 1) {
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
  getData();
  if (count !== 1) {
    count++;
    start += 10;
    end += 10;
    buttonPrev.disabled = false;
  } else {

  }
});
