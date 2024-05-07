const form = document.getElementById("form");
const input = document.getElementById("input");
const ul =document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));
//localstrageからデータをとってきてる

if(todos){
    todos.forEach(todo=>{
        add(todo);
    })
}
//もしストレージの中身があればadd関数に引数todoを渡す

form.addEventListener("submit",function(event){
      event.preventDefault(); //リロード処理止める
      console.log(input.value);
      add();
});

function add(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
    const li = document.createElement("li");
    li.innerText = todoText;
    //liタグの中にinputされたテキスト追加
    li.classList.add("list-group-item");

    if(todo && todo.completed){
        li.classList.add("text-decoration-line-through");
    }
    //デザイン加えるためにクラス名付与
    li.addEventListener("contextmenu",function
        (event){
            event.preventDefault(); //メニュー表示をブロック
            li.remove(); //listタグ削除
            saveData();
        }
    );

    li.addEventListener("click",function(){
        li.classList.toggle("text-decoration-line-through");
        saveData();
    })
    ul.appendChild(li);
    //ulクラスの最後にli追加
    input.value = "";
    //inputの中身空に
    saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach(list=>{
        let todo = {
            text: list.innerText ,
            completed: list.classList.contains
            ("text-decoration-line-through")

        };
        todos.push(todo);
    })
    localStorage.setItem("todos",JSON.stringify(todos));

}