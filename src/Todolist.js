import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Menambahkan tugas baru
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  // Menghapus tugas
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Menandai tugas sebagai selesai/belum selesai
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Daftar Tugas</h1>
      
      {/* Form untuk menambahkan tugas baru */}
      <form onSubmit={addTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          Tambah
        </button>
      </form>
      
      {/* Daftar tugas */}
      <div>
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada tugas. Tambahkan tugas baru!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onDelete={deleteTodo}
                onToggle={toggleComplete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Komponen anak untuk menampilkan item tugas
const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <li className="flex items-center p-3 border border-gray-200 rounded bg-gray-50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mr-2"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        Hapus
      </button>
    </li>
  );
};

export default TodoList;