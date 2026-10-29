import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/DrinkSelectMenu.css";

const barMenuDatabase = [
  { id: 1, charter: "Cypher", name: "Cyber Cage", category: "dark", badge: "🌙 Тёмная сторона", short: "Черничный ликёр + тоник", view: "Подаётся в закрытом стакане, окутанном густым дымом от сухого льда. Сам напиток глубокого серо-голубого цвета.", taste: "Горько-сладкий, с таинственным мятным послевкусием, которое «проявляется» не сразу, как шпион в засаде.", price: "650.00 руб" },
  { id: 2, charter: "Sage", name: "Healing Orb", category: "light", badge: "☀️ Светлая сторона", short: "Зелёный чай матча + личи + свежий огурец", view: "Ярко-нефритовый, светящийся cocktail с добавлением съедобных блёсток (кандурина). На дне лежит ледяная сфера.", taste: "Освежающий и восстанавливающий. Обладает мягким природным вкусом.", price: "550.00 руб" },
  { id: 3, charter: "Killjoy", name: "Lockdown", category: "light", badge: "☀️ Светлая сторона", short: "Кислый лимонад + немецкий сироп из бузины + киви", view: "Неоново-жёлтый напиток в лабораторной колбе. Подаётся с шипучим леденцом, который взрывается на языке.", taste: "Экстремально кислый лимонад. Буквально парализует рецепторы кислинкой.", price: "550.00 руб" },
  { id: 4, charter: "Deadlock", name: "Sonic Sensor", category: "dark", badge: "🌙 Тёмная сторона", short: "Шнапс + клюквенный кордиал + капля ментола", view: "Кристально прозрачный напиток, украшенный «ледяными» иглами из карамели.", taste: "Леденящий скандинавский микс. Изюминка — экстремально холодная подача.", price: "550.00 руб" },
  { id: 5, charter: "Omen", name: "From the Shadows", category: "dark", badge: "🌙 Тёмная сторона", short: "Кофейный ликёр + тёмный ром + нотка ежевики", view: "Чернильно-чёрный cocktail, слоистый. Сверху налита плотная тёмная пена.", taste: "Терпкий и мрачный. Идеально для тех, кто любит глубокий вкус без лишней сладости.", price: "650.00 руб" },
  { id: 6, charter: "Clove", name: "Not Dead Yet", category: "light", badge: "☀️ Светлая сторона", short: "Сладкий шотландский эль + спелая черника + вересковый мёд", view: "Мутно-розовый с фиолетовыми переливами, подаётся в бокале в форме бессмертного белого цветка.", taste: "Сначала кажется мягким, но быстро бьёт в голову.", price: "550.00 руб" },
  { id: 7, charter: "Viper", name: "Snake Bite", category: "dark", badge: "🌙 Тёмная сторона", short: "Настойка на зеёлном перце чили + ликёр из зелёного яблока + абсент", view: "Ядовито-зелёный шот. По краям бокала — каёмка из кислой кислотной посыпки.", taste: "Жгучий и едкий. Вызывает лёгкое онемение.", price: "450.00 руб" },
  { id: 8, charter: "Brimstone", name: "Orbital Strike", category: "dark", badge: "🌙 Тёмная сторона", short: "Американский бурбон + кленовый сироп + копчёная щепа + апельсиновый биттер", view: "Горящий коктейль янтарного цвета, который поджигается прямо перед гостем.", taste: "Классический согревающий мужской вкус.", price: "650.00 руб" },
  { id: 9, charter: "Astra", name: "Cosmic Divide", category: "light", badge: "☀️ Светлая сторона", short: "Африк. чай ройбуш + лавандовый сироп + игристое вино", view: "Галактический cocktail со слоями фиолетового, синего и золотого цветов, напоминающий туманность.", taste: "Пьянящий вкус с эффектом «звёздных» пузырьков.", price: "550.00 руб" },
  { id: 10, charter: "Jett", name: "Blade Storm", category: "light", badge: "☀️ Светлая сторона", short: "Корейский соджу + цитрусовый юдзу + газировка", view: "Воздушный, нежно-голубой коктейль с высокой шапкой из белой сахарной ваты (символизирует облака).", taste: "Легкий, как ветер. Пьётся очень легко и быстро.", price: "550.00 руб" },
  { id: 11, charter: "Neon", name: "Overdrive", category: "light", badge: "☀️ Светлая сторона", short: "Тропический каламанси + энергетик + Блю Кюрасао", view: "Подаётся в высоком стакане с неоновыми светящимися палочками. Цвет — ярко-синий.", taste: "Энергетический заряд. Оставляет электрическое покалывание на губах.", price: "550.00 руб" },
  { id: 12, charter: "Reyna", name: "Empress", category: "dark", badge: "🌙 Тёмная сторона", short: "Сухое вино + гранатовый сок + текила + кайенский перец", view: "Кроваво-красный, густой коктейль в бокале для мартини.", taste: "Страстный и опасный мексиканский микс.", price: "650.00 руб" },
  { id: 13, charter: "Phoenix", name: "Run It Back", category: "dark", badge: "🌙 Тёмная сторона", short: "Британский джин + сироп корицы + имбирный эль + табаско", view: "Слоистый огненный шот. Нижний слой — красный, верхний слой — золотой.", taste: "Огненный вкус с каплей табаско для «огонька».", price: "450.00 руб" },
  { id: 14, charter: "Raze", name: "Showstopper", category: "light", badge: "☀️ Светлая сторона", short: "Бразильская кашаса + пюре из манго + maракуйя + взрывная карамель", view: "Подаётся в кокосовом орехе, украженном бенгальским огнём.", taste: "Настоящий карнавал тропического вкуса!", price: "650.00 руб" },
  { id: 15, charter: "Iso", name: "Contingency", category: "dark", badge: "🌙 Тёмная сторона", short: "Китайский байховый чай + ликёр из фиалок + джин", view: "Напиток идеально фиолетового цвета в строгом, геометрическом бокале с ровной гранью льда.", taste: "Идеальный баланс и строгая дисциплина вкуса.", price: "550.00 руб" },
  { id: 16, charter: "Sova", name: "Hunter's Fury", category: "light", badge: "☀️ Светлая сторона", short: "Водка + настойка на таёжных травах + брусничный сок + кедровый сироп", view: "Прозрачный, как сибирский лёд, с одной крупной льдиной внутри, в которой заморожена веточка розмарина.", taste: "Крепкий, лесной и освежающий сибирский микс.", price: "550.00 руб" },
  { id: 17, charter: "Fade", name: "Nightfall", category: "dark", badge: "🌙 Тёмная сторона", short: "Турецкий кофе + тёмный шоколад + ликёр из смородины + кардамон", view: "Густой тёмно-пурпурный напиток. Из бокала тянутся нити из чёрной карамели.", taste: "Тяжёлый, плотный, но гипнотизирующий вкус.", price: "550.00 руб" },
  { id: 18, charter: "Breach", name: "Rolling Thunder", category: "dark", badge: "🌙 Тёмная сторона", short: "Скандинавский аквавит + имбирное пиво + грейпфрут", view: "Напиток янтарно-медного цвета, подаётся в тяжёлой вибрирующей кружке.", taste: "Оставляет сильное, плотное и горьковатое послевкусие.", price: "550.00 руб" },
  { id: 19, charter: "Skye", name: "Seekers", category: "light", badge: "☀️ Светлая сторона", short: "Джин + сок лайма + мята + базилик + яблочный фреш", view: "Травянисто-зелёный коктейль, украшенный живым цветком или листиком эвкалипта.", taste: "Освежающий австралийский микс, максимально природный вкус.", price: "550.00 руб" },
  { id: 20, charter: "Gekko", name: "Wingman", category: "light", badge: "☀️ Светлая сторона", short: "Сироп зелёного банана + кокосовое молоко + ананасовый сок + желе (боба)", view: "Небольшой забавный коктейль салатового цвета с желейными шариками на дне.", taste: "Сладкий, фруктовый и весёлый коктейль.", price: "550.00 руб" }
];
export default function DrinkSelectMenu() {
  const navigate = useNavigate();

  const [sideFilter, setSideFilter] = useState("all");
  const [selectedDrink, setSelectedDrink] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [isFlipped, setIsFlipped] = useState(false); 
  const [cart, setCart] = useState([]); 

  const handleSelectDrink = (id) => {
    setLoading(true);
    setIsFlipped(false);
    
    setTimeout(() => {
      const match = barMenuDatabase.find(item => item.id === id);
      setSelectedDrink(match);
      setLoading(false);
    }, 400);
  };

  const toggleCart = (drink) => {
    if (!drink) return;
    const isInCart = cart.some(item => item.id === drink.id);
    if (isInCart) {
      setCart(cart.filter(item => item.id !== drink.id));
    } else {
      setCart([...cart, drink]);
    }
  };

  const filteredMenu = barMenuDatabase.filter(item => {
    if (sideFilter === "all") return true;
    return item.category === sideFilter;
  });

  const hasSelected = selectedDrink !== null;
  const isSelectedInCart = hasSelected && cart.some(item => item.id === selectedDrink.id);
  return (
    <section className="agent-select-screen">
      <header className="topbar">
        <div className="brand">SPLIT<span>®</span></div>
        <div className="top-label">ВЫБОР КОКТЕЙЛЕЙ · ХАБ</div>
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
                    {agent.charter.substring(0, 2).toUpperCase()}
                  </div>
                  <span>{agent.charter.toUpperCase()}</span>
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
    </section>
  );
}
