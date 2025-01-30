
(function(plugin) {
    plugin.create = function() {
        const CONFIG_URL = "https://raw.githubusercontent.com/ВАШ_ЛОГИН/РЕПОЗИТОРИЙ/main/config.json";
        let currentConfig = null;

        // Загрузка конфига
        async function loadConfig() {
            try {
                const response = await fetch(CONFIG_URL);
                currentConfig = await response.json();
                console.log("Конфиг успешно загружен");
            } catch (error) {
                console.error("Ошибка загрузки конфига. Используются стандартные настройки.");
                currentConfig = {
                    "rezka-ua.org": {
                        search: { /* дефолтные селекторы */ },
                        streams: { /* ... */ }
                    }
                };
            }
        }

        // Парсинг Rezka
        async function parseRezka(query) {
            if (!currentConfig) await loadConfig();
            const { search, streams } = currentConfig["rezka-ua.org"];
            // ... логика парсинга ...
        }

        // Инициализация
        Lampa.Listener.follow("start", async () => {
            await loadConfig();
            Lampa.Activity.push({ 
                title: "Поиск фильмов", 
                component: "search",
                onSearch: (query) => { /* ... */ }
            });
        });

        plugin.add();
    };
})(this);
