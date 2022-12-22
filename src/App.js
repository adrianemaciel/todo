import "./App.css";

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // load todos on page load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // await segura o codigo até carregar tudo, logo após retira do loading
      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));

      setLoading(false);
      setTodos(res);
    };
    // carrega os dados e execulta o loadData
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    // não recarrega a página ao enviar o formulário permitindo o fluxo SPA.
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      // envia para a api como string
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // adiciona um item ao estado anterior e gera um novo estado
    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1> React Todo</h1>
      </div>
      <div className="form-todo">
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que vocÊ vai fazer?</label>
            <input
              type="text"
              name="title"
              placeholder="Título da tarefa"
              //setTitle: altera o estato do titulo e: evento; target: input; value: valor do input.
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input
              type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              //setTitle: altera o estato do titulo e: evento; target: input; value: valor do input.
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>

          <input type="submit" value="Criar tarefas" />
        </form>
      </div>
      <div className="list-todo">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className="actions">
              <span>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
