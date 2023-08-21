fetch('/board')
  .then((response) => response.json())
  .then((data) => {
    const boardList = document.querySelector('.board_list');
    boardList.innerHTML = ''; // 기존 목록 초기화

    data.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const num = document.createElement('div');
      num.classList.add('num');
      num.textContent = post.boardid;

      const title = document.createElement('div');
      title.classList.add('title');
      const titleLink = document.createElement('a');
      titleLink.href = `/view/${post.boardid}`;
      titleLink.textContent = post.title;
      title.appendChild(titleLink);

      const author = document.createElement('div');
      author.classList.add('author');
      author.textContent = post.author;

      const date = document.createElement('div');
      date.classList.add('date');
      date.textContent = post.inserttime;

      const count = document.createElement('div');
      count.classList.add('count');
      count.textContent = post.viewcnt;

      postElement.appendChild(num);
      postElement.appendChild(title);
      postElement.appendChild(author);
      postElement.appendChild(date);
      postElement.appendChild(count);

      boardList.appendChild(postElement);
    });
  });
