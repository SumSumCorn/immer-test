import { useCallback, useRef, useState } from 'react';
import produce from 'immer';

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const nextForm = produce(form, (draft) => {
        draft[name] = value;
      });
      console.log(nextForm);
      setForm({
        ...produce(form, (draft) => {
          draft[name] = value;
        }),
      });
    },
    [form],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData({
        ...produce(data, (draft) => {
          draft.array.push(info);
        }),
      });

      nextId.current += 1;
    },
    [data, form.name, form.username],
  );

  const onRemove = useCallback(
    (id) => {
      setData({
        ...produce(data, (draft) => {
          draft.array.splice(draft.array.findIndex((info) => info.id === id));
        }),
      });
    },
    [data],
  );

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li
              key={info.id}
              onClick={() => {
                onRemove(info.id);
              }}
            >
              {info.username} {info.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
