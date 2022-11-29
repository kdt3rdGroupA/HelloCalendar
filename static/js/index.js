const URL = "http://localhost";
const PORT = 8001;
let logout = selector("#logout");
if (logout != null) {
  selector("#logout").addEventListener("click", () => {
    axios({
      method: "POST",
      url: "/login/logout",
    }).then(() => {
      location.replace(`${URL}:${PORT}`);
    });
  });
}

selector(".searchBar").addEventListener("keydown", (event) => {
  // print(event, true);
  if (event.code != "Enter") {
    return 0;
  }
  if (!selector("#search_text").value.length) {
    return 0;
  }
  if (event.isComposing == false) {
    let target = selector("#search_text").value;
    window.open(`https://www.google.com/search?q=${target}`, "_blank");
    document.querySelector("#search_text").value = "";
    return 1;
  }
});
selector("#search_btn").addEventListener("click", () => {
  if (!selector("#search_text").value.length) {
    return 0;
  }
  let target = selector("#search_text").value;
  window.open(`https://www.google.com/search?q=${target}`, "_blank");
  document.querySelector("#search_text").value = "";
  return 1;
});

// 로그아웃 토글로 띄우기

const userInfo = document.querySelector("#nav_user_info");
const toggle = document.querySelector(".toggle");
let toggleImg = document.querySelector(".toggleImg");

userInfo == null
  ? null
  : userInfo.addEventListener("click", () => {
      if (toggle.classList.contains("hide")) {
        toggle.classList.remove("hide");
        toggleImg.setAttribute("src", "../static/img/up.png");
      } else {
        toggle.classList.add("hide");
        toggleImg.setAttribute("src", "../static/img/down.png");
      }
    });

const addTodo = (data) => {
  console.log(555, data);
  let todoTr = create("tr");
  let todoName = create("td");
  todoName.innerText = data.task;
  let space = create("td");
  let deleteBtn = create("div");
  deleteBtn.innerHTML = `<span class="material-symbols-outlined">cancel</span>`;
  deleteBtn.addEventListener("click", () => {
    axios({
      method: "POST",
      url: "/del",
      params: { id: data.id },
    }).then((result) => {
      let data = result.data;
      if (data.result == false) {
        return 0;
      }
      todoTr.remove();
    });
  });
  todoTr.append(todoName);
  todoTr.append(space);
  todoTr.append(deleteBtn);
  selector(".todoTabs .table").append(todoTr);
};

axios({
  method: "POST",
  url: "/refresh",
  params: null,
}).then((result) => {
  let todos = result.data.data;
  todos.forEach((element) => {
    addTodo(element);
  });
});

selector("#todoInput").addEventListener("keydown", (event) => {
  if (event.code != "Enter") {
    return 0;
  }
  if (!selector("#todoInput").value.length) {
    return 0;
  }
  if (event.isComposing) {
    return 0;
  }
  axios({
    method: "POST",
    url: "/add",
    params: {
      task: selector("#todoInput").value,
    },
  }).then((result) => {
    console.log(result);
    addTodo({
      task: selector("#todoInput").value,
      id: result.data.data.id,
    });
    selector("#todoInput").value = "";
  });
});
