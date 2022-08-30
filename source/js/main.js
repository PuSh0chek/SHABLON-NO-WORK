const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');

const arrayOfPosts = [];

const makeTag = (tagName, tagClass, placeAdd, tagContent = '') => {
  const element = document.createElement(tagName);
  element.classList.add(tagClass);
  element.textContent = tagContent;
  placeAdd.append(element);
  return element;
};

const createPost = (element) => {
  const li = makeTag('li', 'posts__element', postsList);
  const id = makeTag('span', 'posts__id', li, element.id);
  const title = makeTag('h3', 'posts__title', li, element.title);
  const text = makeTag('p', 'posts__text', li, element.body);
};

const getData = async () => {
  const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseData = await fetchData.json();
  console.log(arrayOfPosts);
  console.log(responseData);
  arrayOfPosts.push([...responseData]);
  console.log(arrayOfPosts);
};

getData();
