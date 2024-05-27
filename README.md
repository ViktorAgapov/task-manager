## Task manager
Для id использовал uuid.  

*****
Тестировал через расширение Thunder Client:

#### Создание задачи (POST):
URL: http://localhost:3000/tasks  
Method: POST  
Headers: Content-Type: application/json  
Body:  
```json
{
  "title": "Task 1",
  "description": "This is task 1"
}
```

#### Получение всех задач (GET):  
URL: http://localhost:3000/tasks  
Method: GET  

#### Получение задачи по ID (GET):  
URL: http://localhost:3000/tasks/{id} (заменяем {id} на реальный ID задачи)  - тут нужен uuid (!)  
Method: GET  

#### Обновление задачи (PATCH):  
URL: http://localhost:3000/tasks/{id} (заменяем {id} на реальный ID задачи)  - тут нужен uuid (!)
Method: PATCH  
Headers: Content-Type: application/json  
Body:  
```json
{
  "title": "Updated Task 1",
  "description": "This is the updated task 1",
  "status": "Pending"
}
```

#### Удаление задачи (DELETE):  
URL: http://localhost:3000/tasks/{id} (заменяем {id} на реальный ID задачи) - тут нужен uuid (!)  
Method: DELETE  