class TaskClass {
  constructor() {
    console.log();
  }

  createTask(task) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/tasks", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(task),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getTasks() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/tasks", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteTasks(task) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/tasks", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: task._id,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(task);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  updateTask({ id, completed, important }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/tasks", {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id,
            completed,
            important,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default TaskClass;
