# express-learn
Для запуска:
1) npm i;
2) Создать ENV файл, указать переменную APP_ROOT содержащую путь к корню проекта.
___
# docker:
https://hub.docker.com/repository/docker/nikos28/books
___
# mongo:
1)  ```JavaScript
    > db.books.insertmany([
        {
            title: "title",
            description: "description",
            authors: "authors"
        },
        {
            title: "string",
            description: "string",
            authors: "string"
        },
    ])
    ```
2)  ```JavaScript
    > db.books.find({title: "title"})
    ```
3)  ```JavaScript
    > db.books.updateOne( { '_id': ObjectId('62bd725e7dc3af29e39ab446') }, { $set: { description: 'hmmm', authors: 'anonym' }} )
    ```
