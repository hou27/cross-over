# API Docs

## Auth

POST /api/auth/register

> 회원가입

<details><summary>req, res body</summary>

### request body

```json
{
    "email":string,
    "userId":string,
    "password":string
}
```

### response body

```json
{
    "statusCode":number,
    "message":string
}
```

</details>

<br>

POST /api/auth/login

> 로그인

<details><summary>req, res body</summary>

### request body

```json
{
    "userId":string,
    "password":string
}
```

### response body

```json
{
    "statusCode": 201,
    "data": {
        "access_token": string
    }
}
```

</details>

<hr>

## Post

GET /api/posts?page=\<int:page>&limit=\<int:limit>

> letter 조회

<details><summary>res body</summary>

### response body

```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 6,
            "createdAt": "2023-06-19T04:25:02.887Z",
            "updatedAt": "2023-06-19T04:25:02.887Z",
            "title": "title",
            "content": "content"
        },
        {
            "id": 5,
            "createdAt": "2023-06-19T04:24:47.782Z",
            "updatedAt": "2023-06-19T04:24:47.782Z",
            "title": "title",
            "content": "content"
        }
        ...
    ]
}
```

</details>
<br>
GET /api/posts/:id

> 특정 letter 상세 정보

<details><summary>res body</summary>

### response body

```json
{
  "statusCode": 200,
  "data": {
    "id": 5,
    "createdAt": "2023-06-19T04:24:47.782Z",
    "updatedAt": "2023-06-19T04:24:47.782Z",
    "title": "title",
    "content": "content"
  }
}
```

</details>
<br>
POST /api/posts

> letter 생성

<details><summary>res body</summary>

### response body

```json
{
  "statusCode": 201,
  "data": {
    "title": "title",
    "content": "content",
    "writer": {
      "id": 2,
      "createdAt": "2023-06-19T03:29:02.491Z",
      "updatedAt": "2023-06-19T03:29:02.491Z",
      "userId": "testuser1",
      "email": "test@mail.com",
      "agreementAt": "2023-06-19T12:29:02.000Z"
    },
    "id": 8,
    "createdAt": "2023-06-19T04:57:39.395Z",
    "updatedAt": "2023-06-19T04:57:39.395Z"
  }
}
```

</details>
<br>
DELETE /api/posts/:id

> letter 삭제

<details><summary>res body</summary>

### response body

```json
{
  "statusCode": 200
}
```

### error case

```json
{
  "statusCode": 404,
  "message": "Post Not Exist"
}
```

```json
{
  "statusCode": 401,
  "message": "No auth token"
}
```

</details>
