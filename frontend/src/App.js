import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [itemList, setitemList] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const items = await axios.get("http://localhost:5000/api/items");
        setitemList(items.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);

  const addItem = async (event) => {
    try {
      const res = await axios.post("http://localhost:5000/api/item", {
        item: text,
      });
      setitemList((prev) => [...prev, res.data]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios
        .delete(`http://localhost:5000/api/item/${id}`)
        .then((res) => {
          console.log(res);
        });
      const filterItem = itemList.filter((item) => {
        return item._id !== id;
      });
      setitemList(filterItem);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async () => {
    try {
      const res =await axios.post(`http://localhost:5000/api/item/${isUpdating}`, {
        item: updateItemText,
      });
      setUpdateItemText("");
      setIsUpdating("")
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <form>
        <h1>ToDo List</h1>

        <div className="input_div">
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            className="input"
          />
          <button type="button" className="add" onClick={() => addItem()}>
            +
          </button>
        </div>
        <div className="list_container">
          {itemList.map((item) => {
            console.log(item._id);
            return (
              <>
                <div className="single_list" key={item._id}>
                  {isUpdating === item._id ? (
                    <div className="update-form">
                      <input
                        type="text"
                        placeholder="New Item"
                        onChange={(e) => setUpdateItemText(e.target.value)}
                      />
                      <button className="update" onClick={() => updateItem()} >
                        Update
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>{item.item}</p>
                      <div className="btns">
                        <button onClick={() => setIsUpdating(item._id)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </form>
    </div>
  );
}

export default App;
