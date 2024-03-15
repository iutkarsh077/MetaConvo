
# Meta Convo - A Chat app

The chat application under development aims to provide users with seamless communication capabilities utilizing web sockets and WebRTC technology. This combination enables real-time, one-to-one interactions between users, allowing them to exchange messages, images, and potentially even conduct video calls directly within the application. The integration of web sockets ensures instant message delivery and updates, while WebRTC facilitates high-quality audio and video communication without the need for additional plugins or software. Overall, this application seeks to offer a user-friendly and efficient platform for individuals to connect and communicate with each other in real-time.


## API Reference

#### Get all items

```http
  POST /api/auth/signupapi
  POST /api/auth/loginapi
  POST api/auth/forgotPassword

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `MONGODB_URI` | `string` | **Required**. Your API key |
| `JWT_SECRET` | `string` | **Required**. Your API key |
| `SMTp_EMAIL` | `string` | **Required**. Your API key |
| `SMTP_PASSWORD` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### /signupapi(name, email)

You can signup through the above parameters.

#### /loginapi(email, password)

You can Login through the above parameters.



## Author

- [@iutkarsh077](https://github.com/iutkarsh077)


## Deployed at Vercel

Insert gif or link to demo
https://meta-convo.vercel.app/
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`JWT_SECRET`
`SMTP_EMAIL`
`SMTP_PASSWORD`

## 🚀 About Me
I'm a full stack developer...

I am a second year student at IK Gujral Punjab Technical University pursuing a bachelor’s degree in Computer Science Engineering || MERN Developer
## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://iutkarsh077.github.io/Portfolio/)


## Installation

Install my-project with npm
First, run the development server:
```bash
  npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.
    
## Tech Stack

**Client:** React, Redux, TailwindCSS, NextJs 14, shadcn

**Server:** Node, Express, Mongodb


