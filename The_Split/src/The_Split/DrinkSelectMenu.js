import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/DrinkSelectMenu.css";

export default function DrinkSelectMenu() {
  const navigate = useNavigate();

  // --- СТЭЙТ ДЛЯ КИБЕРСПОРТИВНОГО УВЕДОМЛЕНИЯ ---
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Функция для вызова уведомления (автоматически исчезает через 4 секунды)
  const showNotification = (message, type = "success") => {
    setToast({ show: true, message: message.toUpperCase(), type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  // Стандартные стейты страницы коктейлей
  const [drinks, setDrinks] = useState([]);
  const [sideFilter, setSideFilter] = useState("all");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cart, setCart] = useState([]);

  // Загружаем меню напитков из базы данных XAMPP
  useEffect(() => {
    fetch("http://localhost/TheSplitBar.php")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки меню:", err);
        showNotification("Ошибка связи с базой меню!", "error");
      });
  }, []);

  // Обработчик выбора коктейля в сетке
  const handleSelectDrink = (id) => {
    setLoading(true);
    setIsFlipped(false);
    
    setTimeout(() => {
      const match = drinks.find(item => item.id === id);
      setSelectedDrink(match);
      setLoading(false);
    }, 400);
  };

  // Логика добавления и удаления элементов из заказа
  const toggleCart = (drink) => {
    if (!drink) return;
    const isInCart = cart.some(item => item.id === drink.id);
    if (isInCart) {
      setCart(cart.filter(item => item.id !== drink.id));
    } else {
      setCart([...cart, drink]);
    }
  };

  // Фильтрация меню по сторонам (Светлая / Темная / Все)
  const filteredMenu = drinks.filter(item => {
    if (sideFilter === "all") return true;
    return item.category === sideFilter;
  });

  const hasSelected = selectedDrink !== null;
  const isSelectedInCart = hasSelected && cart.some(item => item.id === selectedDrink.id);

  return (
    <section className="agent-select-screen">
      
      {/* ШАПКА */}
      <header className="topbar">
        <div className="brand">SPLIT<span>®</span></div>
        
        <div className="header-navigation-block">
          <div className="top-label">ВЫБОР КОКТЕЙЛЕЙ · ХАБ</div>
        </div>
      </header>

      <div className="val-grid-container">
        
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="val-left-panel">
          <div className="val-side-tabs">
            <button className={sideFilter === "all" ? "side-tab-btn active" : "side-tab-btn"} onClick={() => setSideFilter("all")}>
              ВСЕ НАПИТКИ
            </button>
            <button className={sideFilter === "light" ? "side-tab-btn light-tab active" : "side-tab-btn light-tab"} onClick={() => setSideFilter("light")}>
              ☀️ СВЕТЛАЯ СТОРОНА
            </button>
            <button className={sideFilter === "dark" ? "side-tab-btn dark-tab active" : "side-tab-btn dark-tab"} onClick={() => setSideFilter("dark")}>
              🌙 ТЁМНАЯ СТОРОНА
            </button>
          </div>

          <div className="val-agent-grid">
            {filteredMenu.map(agent => {
              const isCurrent = selectedDrink && selectedDrink.id === agent.id;
              const cardClass = agent.category === "dark" ? "val-agent-card item-dark-style" : "val-agent-card item-light-style";
              const finalClass = isCurrent ? cardClass + " selected" : cardClass;

              return (
                <button 
                  key={agent.id} 
                  className={finalClass}
                  onClick={() => handleSelectDrink(agent.id)}
                >
                  <div className="agent-icon-mini-box">
                    {(agent.charter || "??").substring(0, 2).toUpperCase()}
                  </div>
                  <span>{(agent.charter || "БЕЗ ИМЕНИ").toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className="val-right-panel">
          {loading && (
            <div className="val-loading-db">ЗАГРУЗКА ДАННЫХ ИЗ БАЗЫ...</div>
          )}

          {!loading && !hasSelected && (
            <div className="val-empty-preview">
              <div className="val-target-lock"></div>
              <p>ОЖИДАНИЕ ВЫБОРА... НАЖМИТЕ НА НАПИТОК СЛЕВА</p>
            </div>
          )}

          {!loading && hasSelected && (
            <div className={isFlipped ? "val-preview-card flipped" : "val-preview-card"} onClick={() => setIsFlipped(!isFlipped)}>
              
              {/* СТОРОНА А */}
              <div className={selectedDrink.category === "dark" ? "card-face card-front face-dark" : "card-face card-front face-light"}>
                <span className="val-drink-role">{selectedDrink.badge}</span>
                <h2 className="val-drink-title">{selectedDrink.name.toUpperCase()}</h2>
                <div className="val-agent-tag-name">КОДОВОЕ ИМЯ: {selectedDrink.charter.toUpperCase()}</div>
                
                <div className="val-info-section-box">
                  <small>ОСНОВНОЙ МИКС:</small>
                  <p className="val-short-mix">{selectedDrink.short}</p>
                </div>

                <div className="val-info-section-box">
                  <small>ПОДАЧА И ВНЕШНИЙ ВИД:</small>
                  <p className="val-desc-text-long">{selectedDrink.view}</p>
                </div>

                <div className="val-drink-price-tag">{selectedDrink.price}</div>
                <div className="val-card-overlay-hint">КЛИКНИТЕ, ЧТОБЫ ПЕРЕВЕРНУТЬ И УЗНАТЬ ВКУС</div>
              </div>

              {/* СТОРОНА Б */}
              <div className={selectedDrink.category === "dark" ? "card-face card-back face-dark-back" : "card-face card-back face-light-back"}>
                <span className="val-drink-role">{selectedDrink.badge}</span>
                <h2 className="val-drink-title">{selectedDrink.name.toUpperCase()}</h2>
                
                <div className="val-info-section-box" style={{ marginTop: "30px" }}>
                  <small>ВКУСОВЫЕ КАЧЕСТВА:</small>
                  <p className="val-desc-text-long">{selectedDrink.taste}</p>
                </div>

                <div className="val-drink-price-tag">{selectedDrink.price}</div>
                <div className="val-card-overlay-hint">КЛИКНИТЕ, ЧТОБЫ ВЕРНУТЬСЯ К ОПИСАНИЮ ПОДАЧИ</div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ ДЕЙСТВИЙ */}
      <footer className="val-bottom-action-bar">
        <div className="val-bottom-box footer-left">
          <button 
            className="val-action-btn toggle-cart-btn" 
            onClick={() => toggleCart(selectedDrink)} 
            disabled={!hasSelected}
          >
            {isSelectedInCart ? "✖ УБРАТЬ ИЗ ЗАКАЗА" : "➕ ДОБАВИТЬ В КОРЗИНУ"}
          </button>
          <div className="val-cart-status">
            <small>КОРЗИНА С ВЫБРАННЫМИ НАПИТКАМИ:</small>
            <p>
              {cart.length === 0 ? "ПУСТО" : cart.map(i => i.name.toUpperCase()).join(", ")}
            </p>
          </div>
        </div>

        <div className="val-bottom-box footer-center">
          <button 
            className="val-main-lock-btn" 
            onClick={() => {
              if (cart.length > 0) {
                alert(`Заказ успешно оформлен! Позиций: ${cart.length}`);
              } else {
                alert("Корзина пуста.");
              }
            }}
          >
            СДЕЛАТЬ ЗАКАЗ
          </button>
          <button className="val-link-back-btn" onClick={() => navigate("/")}>
            УЙТИ В МЕНЮ С НАВИГАЦИЕЙ (НАЗАД К КАРТЕ)
          </button>
        </div>

        <div className="val-bottom-box footer-right">
          <button className="val-action-btn table-btn" onClick={() => alert("Выбор столика станет доступен позже.")}>
            ВЫБРАТЬ СТОЛИК
          </button>
        </div>
      </footer>

      {/* КАСТОМНЫЙ VALORANT TOAST */}
      {toast.show && (
        <div className={`val-toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          <div className="toast-accent-line"></div>
          <div className="toast-content">
            <span className="toast-status-code">{toast.type === "error" ? "SYS_ERR //" : "SYS_OK //"}</span>
            <p className="toast-msg-text">{toast.message}</p>
          </div>
        </div>
      )}

    </section>
  );
}
