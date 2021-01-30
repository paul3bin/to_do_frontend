export class API{
    static loginUser(body){
        return fetch(
            `http://127.0.0.1:8000/api/authenticate/`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then( resp => resp.json())
    }

    static registerUser(body){
        return fetch(
            `http://127.0.0.1:8000/api/users/`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then( resp => resp.json())       
    }

    static getTasks(token){
        return fetch(
            "http://127.0.0.1:8000/api/task/",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }
        ).then(resp => resp.json())
    }

    static deleteTask(task_id, token){
        return fetch(`http://127.0.0.1:8000/api/task/${task_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }})
    }

    static addTask(body, token){
        return fetch(`http://127.0.0.1:8000/api/task/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }
}