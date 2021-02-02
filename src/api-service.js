export class API{
    static loginUser(body){
        return fetch(
            `https://todo-django-rest-framework.herokuapp.com/api/authenticate/`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        ).then(resp => resp.json())
    }

    static registerUser(body){
        return fetch(
            `https://todo-django-rest-framework.herokuapp.com/api/users/`, 
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
            "https://todo-django-rest-framework.herokuapp.com/api/task/",
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
        return fetch(`https://todo-django-rest-framework.herokuapp.com/api/task/${task_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }})
    }

    static addTask(body, token){
        return fetch(`https://todo-django-rest-framework.herokuapp.com/api/task/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then( resp => resp.json())
    }
}