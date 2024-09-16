import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthForm from "./context/AuthForm";
import { AuthController } from "./controller/auth";
import HttpConnect from "./util/http";
import TokenStorage from "./controller/token";
import Auth from "./service/auth";

/******************************************************* **********
 * 기능별로 만든 클래스를 의존성 주입 합니다
 *
 *  의존성 주입 : https://velog.io/@wlsdud2194/what-is-di
 *****************************************************************/

//클라이언트 http 요청 설정
const baseURL = "http://localhost:8080";
const authController = new AuthController();
const httpRequest = new HttpConnect(baseURL, authController);

//권한 설정
const tokenController = new TokenStorage();
const authService = new Auth(httpRequest, tokenController);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthForm authService={authService} authController={authController}>
      <App />
    </AuthForm>
  </BrowserRouter>,
  document.getElementById(root),
);
