"use strict";

const postsContainer = document.querySelector('.posts');
const postsList = document.querySelector('.posts__list');
const arrayOfPosts = [];

const getData = async () => {
  const fetchData = await fetch('https://jsonplaceholder.typicode.com/posts');
  const responseData = await fetchData.json();
  console.log(arrayOfPosts);
  console.log(responseData);
  arrayOfPosts.push([...responseData]);
  console.log(arrayOfPosts);
};

getData();