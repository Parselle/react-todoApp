export default class ApiService {

  _apiBase = 'https://5c164d46e6694800138963b2.mockapi.io';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if(!res.ok) {
      throw new Error(`Не могу подключиться по ${url}, recieved ${res.status}`);
    }

    return await res.json();
  };

  postResource = async (url, method, body = {}) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: method,
      body: JSON.stringify(body)
    });

    if(!res.ok) {
      throw new Error(`Не могу подключиться по ${url}, recieved ${res.status}`);
    }
  }

  getTasks = async () => {
    const res = await this.getResource('/tasks');
    return res;
  }

  deleteTask = async(id) => {
    await this.postResource(`/tasks/${id}`, 'DELETE');
  }

  updateTask = async(id, task) => {
    await this.postResource(`/tasks/${id}`, 'PUT', {...task});
  }

  addTask = async(task) => {
    await this.postResource(`/tasks/`, 'POST', {...task});
  }


}
