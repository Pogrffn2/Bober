import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCluster({ showNotification }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("split_bar_agent");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regPassword) {
      alert("Заполните все поля регистрации!");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(regEmail)) {
      alert("Неверный формат электронной почты! Используйте адрес в формате: agent@gmail.com");
      return;
    }

    try {
      const response = await fetch("http://localhost/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showNotification("Агент успешно зарегистрирован!", "success");
        setIsRegOpen(false);
      } else {
        showNotification(data.message || "Ошибка регистрации!", "error");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Сбой связи с сервером API.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert("Введите логин и пароль!");
      return;
    }

    try {
      const response = await fetch("http://localhost/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.id) {
        setCurrentUser(data);
        localStorage.setItem("split_bar_agent", JSON.stringify(data));
        showNotification(`Агент ${data.username} подключен к хабу!`, "success");
        setIsLoginOpen(false);
      } else {
        showNotification(data.message || "Ошибка доступа!", "error");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Сбой связи с сервером API.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("split_bar_agent");
    showNotification("Доступ агента отозван!", "error");
  };

  return (
    <>
      <div className="val-auth-cluster" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!currentUser ? (
          <>
            <button className="val-auth-btn" onClick={() => setIsRegOpen(true)}>
              Регистрация
            </button>
            <button className="val-auth-btn val-auth-btn-primary" onClick={() => setIsLoginOpen(true)}>
              Логин
            </button>
          </>
        ) : (
          <>
            <span className="agent-session-name" style={{ color: "#ff4655", fontWeight: "bold", marginRight: "10px" }}>
              АГЕНТ: {currentUser.username.toUpperCase()}
            </span>
            <button className="val-auth-btn val-cabinet-btn" onClick={() => navigate("/profile")}>
              Личный кабинет
            </button>
            <button className="val-auth-btn" style={{ background: "#222", borderColor: "#444" }} onClick={handleLogout}>
              Выход
            </button>
          </>
        )}
      </div>

      {/* Модальное окно Регистрации */}
      {isRegOpen && (
        <div className="val-modal-overlay">
          <div className="val-modal-box">
            <div className="val-modal-header">
              <h3>РЕГИСТРАЦИЯ АГЕНТА</h3>
              <button className="close-modal-btn" onClick={() => setIsRegOpen(false)}>✖</button>
            </div>
            <form onSubmit={handleRegister} className="val-modal-form">
              <div className="val-input-group">
                <label>ПОЗЫВНОЙ (ЛОГИН):</label>
                <input type="text" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} placeholder="Введите имя..." />
              </div>
              <div className="val-input-group">
                <label>ЭЛЕКТРОННАЯ ПОЧТА (EMAIL):</label>
                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="agent@gmail.com..." />
              </div>
              <div className="val-input-group">
                <label>ПАРОЛЬ ДЛЯ СВЯЗИ:</label>
                <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Введите пароль..." />
              </div>
              <button type="submit" className="val-modal-submit-btn">СОЗДАТЬ АККАУНТ</button>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно Входа */}
      {isLoginOpen && (
        <div className="val-modal-overlay">
          <div className="val-modal-box">
            <div className="val-modal-header">
              <h3>АВТОРИЗАЦИЯ В СИСТЕМЕ</h3>
              <button className="close-modal-btn" onClick={() => setIsLoginOpen(false)}>✖</button>
            </div>
            <form onSubmit={handleLogin} className="val-modal-form">
              <div className="val-input-group">
                <label>ПОЗЫВНОЙ:</label>
                <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Имя агента..." />
              </div>
              <div className="val-input-group">
                <label>КЛЮЧ ДОСТУПА:</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Пароль..." />
              </div>
              <button type="submit" className="val-modal-submit-btn">ПОДКЛЮЧИТЬСЯ</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
