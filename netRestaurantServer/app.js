import express from "express";
import cors from "cors";
import authRouter from "./router/auth.js";
// import foodRouter from './router/food.js'

//express 미들웨어 사용 - express server를 만들게 되면 이 서버는 이제 요청을 받을수 있게됨
// * 미들웨어 :  클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 목적에 맞게 처리를 하는, 말하자면 거쳐가는 함수
const app = express();

app.use(express.json());
app.use(cors());

// router 를 이용한 처리 간결화
// app.use('/auth', authRouter) : /auth 로 받은 경로처리를 authRouter 내부에서 처리한다
app.use("/auth", authRouter);

//👨 10 주차 예시
// app.use('/food',foodRouter)

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

//client 응답 대기 포트 8080
app.listen(8080);
