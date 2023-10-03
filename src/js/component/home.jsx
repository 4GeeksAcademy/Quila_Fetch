import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setToDos] = useState([]);

  // Add into array -> concat
  // Delete from array -> filter
  // Update -> map
  useEffect(() => {
    console.log("use effect gets called");
    makeList();
    getList();
  }, []);

  const makeList = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/andreaQuila", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  };

  const getList = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/andreaQuila", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is where your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
        setToDos(data);
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  };

  const addToList = (e) => {
    if (e.key == "Enter") {
      let body = [...todos, { label: inputValue, done: false }];
      fetch("https://playground.4geeks.com/apis/fake/todos/user/andreaQuila", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok); // will be true if the response is successfull
          console.log(resp.status); // the status code = 200 or code = 400 etc.
          console.log(resp.body); // will try return the exact result as string
          return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        })
        .then((data) => {
          //here is where your code should start after the fetch finishes
          console.log(data); //this will print on the console the exact object received from the server
          setToDos(body);
        })
        .catch((error) => {
          //error handling
          console.log(error);
        });
      setInputValue("");
    }
  };

  const deleteFromList = (index) => {
    let newList = todos.filter((t, currentIndex) => index != currentIndex);
    console.log("delete got called");
    if (newList.length == 0) {
      deleteWholeList();
    } else {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/andreaQuila", {
        method: "PUT",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok); // will be true if the response is successfull
          console.log(resp.status); // the status code = 200 or code = 400 etc.
          return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        })
        .then((data) => {
          //here is where your code should start after the fetch finishes
          console.log(data);
          setToDos(newList);
        })
        .catch((error) => {
          //error handling
          console.log(error);
        });
    }
  };

  const deleteWholeList = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/andreaQuila", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        setToDos([]);
        makeList();
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>My To Do's</h1>
      <ul className="card list-group">
        <li className="list-group-item">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={addToList}
            placeholder="What Do You Need To Do?"
          ></input>
        </li>

        {todos.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item.label}{" "}
            <i
              className="fas fa-trash-alt "
              onClick={(e) => deleteFromList(index)}
            ></i>
          </li>
        ))}
        <li className="list-group-item">{todos.length} Items Left</li>
      </ul>
    </div>
  );
};

export default Home;
