
"use strict";

/* ==========================================
   LUAUFORGE AI — APP.JS
   Languages: English, Ukrainian, Russian, Polish
========================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const welcome = $("#welcome");
const messages = $("#messages");
const form = $("#chatForm");
const input = $("#messageInput");
const sendButton = $("#sendButton");
const newChatButton = $("#newChat");
const statusText = $("#statusText");
const statusDot = $("#statusDot");
const settingsPanel = $("#settingsPanel");
const historyPanel = $("#historyPanel");
const historyList = $("#historyList");
const pageTitle = $("#pageTitle");
const languageSelect = $("#languageSelect");

const STORAGE_KEYS = {
    language: "luauforge-language",
    history: "luauforge-chat-history"
};

const translations = {
    en: {
        navChat: "Chat", navHistory: "History", navSettings: "Settings",
        promoTitle: "Build Amazing Games",
        promoDescription: "Your assistant in the world of Roblox Studio.",
        checkingAI: "Checking AI...", localServer: "Local AI server",
        topLabel: "YOUR DEVELOPMENT STUDIO", workspace: "AI Workspace",
        newChat: "＋ New Chat", languageLabel: "Language",
        heroTitle: 'Hello, Developer!<br><span>What shall we build today?</span>',
        heroDescription: "Write code, create mechanics, and turn your ideas into Roblox games.",
        featureCode: "Luau Code", featureCodeDescription: "Create scripts",
        featureGUI: "GUI & Design", featureGUIDescription: "Interfaces and animations",
        featureFix: "Debugging", featureFixDescription: "Find the error",
        featureIdeas: "Game Ideas", featureIdeasDescription: "Create something unique",
        popularPrompts: "POPULAR PROMPTS",
        promptShop: "🛒 Shop System", promptSaving: "💾 Data Saving",
        promptRemotes: "⚡ RemoteEvents",
        historyTitle: "Chat History",
        historyDescription: "Your previous conversations will appear here.",
        settingsTitle: "Settings", interfaceVersion: "Interface version:",
        aiModel: "AI model:",
        localAIInfo: "AI runs locally through Ollama on your computer.",
        languageDescription: "Choose the language used throughout the interface.",
        messagePlaceholder: "Ask about Roblox Studio or Luau...",
        composerHint: "↵ Enter to send · Shift + Enter for a new line",
        disclaimer: "LuauForge AI can make mistakes. Check your code before publishing.",
        send: "Send message", sendTitle: "Send",
        sendNewStopPrevious: "Send a new request and stop the previous one",
        thinking: "🧠 Thinking...", generating: "✍️ Generating response...",
        stop: "⏹ Stop", stopped: "⏹ Stopped after", done: "✓ Done in",
        error: "⚠️ Error", serverError: "Server error:",
        browserStreamError: "Your browser does not support streaming responses.",
        emptyReply: "The AI returned an empty response.",
        requestFailed: "⚠️ Failed to get a response:",
        checkServer: "Check Ollama and the LuauForge AI server.",
        ollamaOffline: "Ollama offline", modelMissing: "Model not found",
        aiReady: "AI is ready", serverUnavailable: "Server unavailable",
        currentConversation: "Current Conversation",
        historyEmpty: "No messages in this conversation.",
        historyUser: "You", historyAI: "LuauForge AI",
        noHistory: "No conversations yet.",
        noHistoryDetails: "Start chatting to see your messages here.",
        promptCode: "Create a server-side leaderstats coins system for Roblox.",
        promptGUI: "Teach me how to create a beautiful animated GUI in Roblox Studio.",
        promptFix: "Help me find and fix this Roblox Luau error.",
        promptIdeas: "Suggest an original Roblox game idea with a progression system.",
        promptShopFull: "Create a shop system with server-side purchase validation.",
        promptSavingFull: "Create a player data saving system using DataStoreService.",
        promptRemotesFull: "Explain how RemoteEvents work in Roblox.",
        userAvatar: "YOU"
    },

    uk: {
        navChat: "Чат", navHistory: "Історія", navSettings: "Налаштування",
        promoTitle: "Створюй круті ігри",
        promoDescription: "Твій помічник у світі Roblox Studio.",
        checkingAI: "Перевірка AI...", localServer: "Локальний AI-сервер",
        topLabel: "ТВОЯ СТУДІЯ РОЗРОБКИ", workspace: "Робочий простір AI",
        newChat: "＋ Нова розмова", languageLabel: "Мова",
        heroTitle: "Привіт, розробнику!<br><span>Що створимо сьогодні?</span>",
        heroDescription: "Пиши код, створюй механіки та перетворюй ідеї на ігри Roblox.",
        featureCode: "Luau-код", featureCodeDescription: "Створюй скрипти",
        featureGUI: "GUI та дизайн", featureGUIDescription: "Інтерфейси й анімації",
        featureFix: "Виправлення", featureFixDescription: "Знайди помилку",
        featureIdeas: "Ідеї ігор", featureIdeasDescription: "Створи щось своє",
        popularPrompts: "ПОПУЛЯРНІ ЗАПИТИ",
        promptShop: "🛒 Магазин", promptSaving: "💾 Збереження",
        promptRemotes: "⚡ RemoteEvents",
        historyTitle: "Історія чату",
        historyDescription: "Тут відображатимуться попередні розмови.",
        settingsTitle: "Налаштування", interfaceVersion: "Версія інтерфейсу:",
        aiModel: "AI-модель:",
        localAIInfo: "AI працює локально через Ollama на твоєму комп'ютері.",
        languageDescription: "Вибери мову всього інтерфейсу.",
        messagePlaceholder: "Запитай про Roblox Studio або Luau...",
        composerHint: "↵ Enter — надіслати · Shift + Enter — новий рядок",
        disclaimer: "LuauForge AI може помилятися — перевіряй код перед публікацією.",
        send: "Надіслати повідомлення", sendTitle: "Надіслати",
        sendNewStopPrevious: "Надіслати новий запит і зупинити попередній",
        thinking: "🧠 Думає...", generating: "✍️ Генерує відповідь...",
        stop: "⏹ Зупинити", stopped: "⏹ Зупинено через",
        done: "✓ Готово за", error: "⚠️ Помилка",
        serverError: "Помилка сервера:",
        browserStreamError: "Браузер не підтримує потокову відповідь.",
        emptyReply: "AI повернув порожню відповідь.",
        requestFailed: "⚠️ Не вдалося отримати відповідь:",
        checkServer: "Перевір Ollama та сервер LuauForge AI.",
        ollamaOffline: "Ollama офлайн", modelMissing: "Модель не знайдена",
        aiReady: "AI готовий до роботи", serverUnavailable: "Сервер недоступний",
        currentConversation: "Поточна розмова",
        historyEmpty: "У цій розмові поки немає повідомлень.",
        historyUser: "Ти", historyAI: "LuauForge AI",
        noHistory: "Розмов поки немає.",
        noHistoryDetails: "Почни чат, щоб побачити тут свої повідомлення.",
        promptCode: "Створи серверну систему монет leaderstats для Roblox.",
        promptGUI: "Навчи мене створювати красивий анімований GUI у Roblox Studio.",
        promptFix: "Допоможи знайти та виправити помилку в Roblox Luau.",
        promptIdeas: "Запропонуй оригінальну ідею гри Roblox із системою прогресу.",
        promptShopFull: "Створи систему магазину із серверною перевіркою покупок.",
        promptSavingFull: "Створи систему збереження даних гравця через DataStoreService.",
        promptRemotesFull: "Поясни, як працюють RemoteEvents у Roblox.",
        userAvatar: "ТИ"
    },

    ru: {
        navChat: "Чат", navHistory: "История", navSettings: "Настройки",
        promoTitle: "Создавай крутые игры",
        promoDescription: "Твой помощник в мире Roblox Studio.",
        checkingAI: "Проверка AI...", localServer: "Локальный AI-сервер",
        topLabel: "ТВОЯ СТУДИЯ РАЗРАБОТКИ", workspace: "Рабочее пространство AI",
        newChat: "＋ Новый чат", languageLabel: "Язык",
        heroTitle: "Привет, разработчик!<br><span>Что создадим сегодня?</span>",
        heroDescription: "Пиши код, создавай механики и превращай идеи в игры Roblox.",
        featureCode: "Код Luau", featureCodeDescription: "Создавай скрипты",
        featureGUI: "GUI и дизайн", featureGUIDescription: "Интерфейсы и анимации",
        featureFix: "Исправление ошибок", featureFixDescription: "Найди ошибку",
        featureIdeas: "Идеи игр", featureIdeasDescription: "Создай что-то своё",
        popularPrompts: "ПОПУЛЯРНЫЕ ЗАПРОСЫ",
        promptShop: "🛒 Магазин", promptSaving: "💾 Сохранение",
        promptRemotes: "⚡ RemoteEvents",
        historyTitle: "История чата",
        historyDescription: "Здесь будут отображаться предыдущие разговоры.",
        settingsTitle: "Настройки", interfaceVersion: "Версия интерфейса:",
        aiModel: "AI-модель:",
        localAIInfo: "AI работает локально через Ollama на твоём компьютере.",
        languageDescription: "Выбери язык всего интерфейса.",
        messagePlaceholder: "Спроси о Roblox Studio или Luau...",
        composerHint: "↵ Enter — отправить · Shift + Enter — новая строка",
        disclaimer: "LuauForge AI может ошибаться — проверяй код перед публикацией.",
        send: "Отправить сообщение", sendTitle: "Отправить",
        sendNewStopPrevious: "Отправить новый запрос и остановить предыдущий",
        thinking: "🧠 Думает...", generating: "✍️ Генерирует ответ...",
        stop: "⏹ Остановить", stopped: "⏹ Остановлено за",
        done: "✓ Готово за", error: "⚠️ Ошибка",
        serverError: "Ошибка сервера:",
        browserStreamError: "Браузер не поддерживает потоковые ответы.",
        emptyReply: "AI вернул пустой ответ.",
        requestFailed: "⚠️ Не удалось получить ответ:",
        checkServer: "Проверь Ollama и сервер LuauForge AI.",
        ollamaOffline: "Ollama не в сети", modelMissing: "Модель не найдена",
        aiReady: "AI готов к работе", serverUnavailable: "Сервер недоступен",
        currentConversation: "Текущий разговор",
        historyEmpty: "В этом разговоре пока нет сообщений.",
        historyUser: "Ты", historyAI: "LuauForge AI",
        noHistory: "Разговоров пока нет.",
        noHistoryDetails: "Начни чат, чтобы увидеть здесь свои сообщения.",
        promptCode: "Создай серверную систему монет leaderstats для Roblox.",
        promptGUI: "Научи меня создавать красивый анимированный GUI в Roblox Studio.",
        promptFix: "Помоги найти и исправить ошибку в Roblox Luau.",
        promptIdeas: "Предложи оригинальную идею игры Roblox с системой прогресса.",
        promptShopFull: "Создай систему магазина с серверной проверкой покупок.",
        promptSavingFull: "Создай систему сохранения данных игрока через DataStoreService.",
        promptRemotesFull: "Объясни, как работают RemoteEvents в Roblox.",
        userAvatar: "ТЫ"
    },

    pl: {
        navChat: "Czat", navHistory: "Historia", navSettings: "Ustawienia",
        promoTitle: "Twórz świetne gry",
        promoDescription: "Twój asystent w świecie Roblox Studio.",
        checkingAI: "Sprawdzanie AI...", localServer: "Lokalny serwer AI",
        topLabel: "TWOJE STUDIO DEWELOPERSKIE", workspace: "Przestrzeń robocza AI",
        newChat: "＋ Nowa rozmowa", languageLabel: "Język",
        heroTitle: "Cześć, deweloperze!<br><span>Co dziś stworzymy?</span>",
        heroDescription: "Pisz kod, twórz mechaniki i zamieniaj pomysły w gry Roblox.",
        featureCode: "Kod Luau", featureCodeDescription: "Twórz skrypty",
        featureGUI: "GUI i design", featureGUIDescription: "Interfejsy i animacje",
        featureFix: "Naprawianie błędów", featureFixDescription: "Znajdź błąd",
        featureIdeas: "Pomysły na gry", featureIdeasDescription: "Stwórz coś wyjątkowego",
        popularPrompts: "POPULARNE POLECENIA",
        promptShop: "🛒 Sklep", promptSaving: "💾 Zapisywanie danych",
        promptRemotes: "⚡ RemoteEvents",
        historyTitle: "Historia czatu",
        historyDescription: "Tutaj pojawią się poprzednie rozmowy.",
        settingsTitle: "Ustawienia", interfaceVersion: "Wersja interfejsu:",
        aiModel: "Model AI:",
        localAIInfo: "AI działa lokalnie przez Ollama na Twoim komputerze.",
        languageDescription: "Wybierz język całego interfejsu.",
        messagePlaceholder: "Zapytaj o Roblox Studio lub Luau...",
        composerHint: "↵ Enter — wyślij · Shift + Enter — nowa linia",
        disclaimer: "LuauForge AI może się mylić. Sprawdź kod przed publikacją.",
        send: "Wyślij wiadomość", sendTitle: "Wyślij",
        sendNewStopPrevious: "Wyślij nowe zapytanie i zatrzymaj poprzednie",
        thinking: "🧠 Myślę...", generating: "✍️ Generowanie odpowiedzi...",
        stop: "⏹ Zatrzymaj", stopped: "⏹ Zatrzymano po",
        done: "✓ Gotowe w", error: "⚠️ Błąd",
        serverError: "Błąd serwera:",
        browserStreamError: "Twoja przeglądarka nie obsługuje odpowiedzi strumieniowych.",
        emptyReply: "AI zwróciło pustą odpowiedź.",
        requestFailed: "⚠️ Nie udało się uzyskać odpowiedzi:",
        checkServer: "Sprawdź Ollama i serwer LuauForge AI.",
        ollamaOffline: "Ollama offline", modelMissing: "Nie znaleziono modelu",
        aiReady: "AI jest gotowe", serverUnavailable: "Serwer niedostępny",
        currentConversation: "Bieżąca rozmowa",
        historyEmpty: "W tej rozmowie nie ma jeszcze wiadomości.",
        historyUser: "Ty", historyAI: "LuauForge AI",
        noHistory: "Brak rozmów.",
        noHistoryDetails: "Rozpocznij czat, aby zobaczyć tutaj wiadomości.",
        promptCode: "Utwórz serwerowy system monet leaderstats w Roblox.",
        promptGUI: "Naucz mnie tworzyć piękny animowany GUI w Roblox Studio.",
        promptFix: "Pomóż znaleźć i naprawić błąd w Roblox Luau.",
        promptIdeas: "Zaproponuj oryginalny pomysł na grę Roblox z systemem postępów.",
        promptShopFull: "Utwórz sklep z serwerową weryfikacją zakupów.",
        promptSavingFull: "Utwórz system zapisywania danych gracza przez DataStoreService.",
        promptRemotesFull: "Wyjaśnij, jak działają RemoteEvents w Roblox.",
        userAvatar: "TY"
    }
};

const featurePromptKeys = {
    featureCode: "promptCode",
    featureGUI: "promptGUI",
    featureFix: "promptFix",
    featureIdeas: "promptIdeas",
    promptShop: "promptShopFull",
    promptSaving: "promptSavingFull",
    promptRemotes: "promptRemotesFull"
};

let currentLanguage = "en";
let chatHistory = [];
let activeRequest = null;
let currentPage = "chat";
let statusState = "checkingAI";

function t(key) {
    return translations[currentLanguage]?.[key]
        ?? translations.en[key]
        ?? key;
}

function safeStorageGet(key, fallback = null) {
    try {
        return localStorage.getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.warn("Could not save local data:", error);
    }
}

function saveHistory() {
    safeStorageSet(STORAGE_KEYS.history, JSON.stringify(chatHistory));
}

function loadHistory() {
    try {
        const saved = JSON.parse(safeStorageGet(STORAGE_KEYS.history, "[]"));
        if (!Array.isArray(saved)) return [];

        return saved.filter(item =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string"
        ).slice(-200);
    } catch {
        return [];
    }
}

function updatePageTitle() {
    if (!pageTitle) return;

    const key = currentPage === "settings"
        ? "settingsTitle"
        : currentPage === "history"
            ? "currentConversation"
            : "workspace";

    pageTitle.textContent = t(key);
}

function updateStatusLabel() {
    if (statusText) statusText.textContent = t(statusState);
}

function applyLanguage(language) {
    currentLanguage = translations[language] ? language : "en";
    document.documentElement.lang = currentLanguage;

    $$("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const value = t(key);

        if (key === "heroTitle") {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });

    $$("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    // Translate each prompt button without losing its original key.
    $$("[data-prompt]").forEach(button => {
        const key = button.dataset.promptKey;
        if (key) button.dataset.prompt = t(key);
    });

    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.setAttribute("aria-label", t("languageLabel"));
        languageSelect.title = t("languageLabel");
    }

    if (sendButton) {
        sendButton.title = activeRequest ? t("sendNewStopPrevious") : t("sendTitle");
        sendButton.setAttribute("aria-label", t("send"));
    }

    updatePageTitle();
    updateStatusLabel();
    renderHistory();

    if (activeRequest) {
        activeRequest.statusElement.textContent =
            `${t(activeRequest.elapsed < 3 ? "thinking" : "generating")} ${activeRequest.elapsed} s`;

        if (activeRequest.stopButton) {
            activeRequest.stopButton.textContent = t("stop");
        }
    }
}

function addMessage(role, text, shouldScroll = true) {
    if (!messages) return null;

    const article = document.createElement("article");
    article.className = `message ${role}-message`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = role === "assistant" ? "LF" : t("userAvatar");

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    article.append(avatar, content);
    messages.appendChild(article);

    if (shouldScroll) {
        article.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    return article;
}

function renderConversation() {
    if (!messages) return;

    messages.replaceChildren();

    chatHistory.forEach(item => {
        addMessage(item.role, item.content, false);
    });

    const hasMessages = messages.children.length > 0;
    messages.classList.toggle("visible", hasMessages);

    if (welcome) {
        welcome.classList.toggle(
            "hidden",
            currentPage !== "chat" || hasMessages
        );
    }
}

function showChat() {
    currentPage = "chat";
    settingsPanel?.classList.add("hidden");
    historyPanel?.classList.add("hidden");

    if (messages) {
        messages.classList.toggle("visible", messages.children.length > 0);
    }

    if (welcome) {
        welcome.classList.toggle("hidden", messages?.children.length > 0);
    }

    $$(".nav-item").forEach(button => {
        button.classList.toggle("active", button.dataset.page === "chat");
    });

    updatePageTitle();
}

function renderHistory() {
    if (!historyList) return;

    historyList.replaceChildren();

    if (!chatHistory.length) {
        const empty = document.createElement("p");
        empty.textContent = t("noHistory");
        historyList.appendChild(empty);

        const details = document.createElement("p");
        details.textContent = t("noHistoryDetails");
        historyList.appendChild(details);
        return;
    }

    chatHistory.forEach(item => {
        const row = document.createElement("div");
        row.className = "history-entry";

        const title = document.createElement("b");
        title.textContent = item.role === "user"
            ? t("historyUser")
            : t("historyAI");

        const text = document.createElement("p");
        text.textContent = item.content;

        row.append(title, text);
        historyList.appendChild(row);
    });
}

function setBusy(isBusy) {
    if (!sendButton) return;

    // Clicking Send while a request is active sends a new request
    // and cancels the previous one.
    sendButton.disabled = false;
    sendButton.title = isBusy ? t("sendNewStopPrevious") : t("sendTitle");
}

function stopGeneration(request = activeRequest) {
    if (!request) return;

    request.controller.abort();
    clearInterval(request.timer);

    if (activeRequest === request) {
        activeRequest = null;
        setBusy(false);

        if (request.statusElement) {
            request.statusElement.textContent = `${t("stopped")} ${request.elapsed} s`;
            request.statusElement.className = "ai-status-done";
        }

        request.stopButton?.remove();
    }
}

async function sendMessage(rawText) {
    const message = String(rawText ?? "").trim();
    if (!message || !form || !input || !messages) return;

    if (activeRequest) stopGeneration(activeRequest);

    showChat();

    // Send recent conversation context to the model.
    const previousHistory = chatHistory.slice(-6);

    chatHistory.push({ role: "user", content: message });
    saveHistory();

    addMessage("user", message);

    input.value = "";
    input.style.height = "auto";

    const request = {
        controller: new AbortController(),
        startedAt: Date.now(),
        elapsed: 0,
        statusElement: null,
        stopButton: null,
        timer: null
    };

    activeRequest = request;
    setBusy(true);

    const article = addMessage("assistant", "");
    const content = article?.querySelector(".message-content");

    if (!content) {
        activeRequest = null;
        setBusy(false);
        return;
    }

    const statusRow = document.createElement("div");
    statusRow.className = "ai-status-row";

    const status = document.createElement("span");
    status.className = "ai-thinking";
    status.textContent = `${t("thinking")} 0 s`;

    const stopButton = document.createElement("button");
    stopButton.type = "button";
    stopButton.className = "stop-generation";
    stopButton.textContent = t("stop");
    stopButton.addEventListener("click", () => stopGeneration(request));

    const answer = document.createElement("div");
    answer.className = "ai-answer";

    statusRow.append(status, stopButton);
    content.append(statusRow, answer);

    request.statusElement = status;
    request.stopButton = stopButton;

    request.timer = setInterval(() => {
        if (activeRequest !== request) return;

        request.elapsed = Math.floor((Date.now() - request.startedAt) / 1000);
        status.textContent =
            `${t(request.elapsed < 3 ? "thinking" : "generating")} ${request.elapsed} s`;
    }, 500);

    let fullReply = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: request.controller.signal,
            body: JSON.stringify({
                message,
                history: previousHistory
            })
        });

        if (activeRequest !== request) return;

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error || `${t("serverError")} ${response.status}`
            );
        }

        if (!response.body) {
            throw new Error(t("browserStreamError"));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        function processLine(line) {
            if (!line.trim()) return;

            const data = JSON.parse(line);

            if (data.error) throw new Error(data.error);

            if (typeof data.token === "string") {
                fullReply += data.token;
                answer.textContent = fullReply;
            }

            // Some servers send a complete response instead of tokens.
            if (typeof data.response === "string" && !data.token) {
                fullReply += data.response;
                answer.textContent = fullReply;
            }
        }

        while (true) {
            const result = await reader.read();

            if (activeRequest !== request) {
                await reader.cancel().catch(() => {});
                return;
            }

            if (result.done) break;

            buffer += decoder.decode(result.value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) processLine(line);
            messages.scrollTop = messages.scrollHeight;
        }

        buffer += decoder.decode();
        if (buffer.trim()) processLine(buffer);

        if (!fullReply.trim()) {
            throw new Error(t("emptyReply"));
        }

        chatHistory.push({ role: "assistant", content: fullReply });
        saveHistory();

        status.textContent =
            `${t("done")} ${Math.floor((Date.now() - request.startedAt) / 1000)} s`;

        status.className = "ai-status-done";
        stopButton.remove();

    } catch (error) {
        if (error.name === "AbortError") return;
        if (activeRequest !== request) return;

        answer.textContent = fullReply
            ? `${fullReply}\n\n⚠️ ${error.message}`
            : `${t("requestFailed")} ${error.message}\n\n${t("checkServer")}`;

        status.textContent = t("error");
        status.className = "ai-status-done";
        stopButton.remove();

        // Keep a failed request out of the saved conversation history.
        if (!fullReply.trim()) {
            chatHistory = chatHistory.filter(item =>
                !(item.role === "user" && item.content === message)
            );
            saveHistory();
        }

    } finally {
        clearInterval(request.timer);

        if (activeRequest === request) {
            activeRequest = null;
            setBusy(false);
            if (input) input.focus();
        }
    }
}

/* Language selection */

if (languageSelect) {
    languageSelect.addEventListener("change", () => {
        const language = languageSelect.value;
        applyLanguage(language);
        safeStorageSet(STORAGE_KEYS.language, currentLanguage);
    });
}

/* Input and form */

if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();
        sendMessage(input?.value ?? "");
    });
}

if (input) {
    input.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            form?.requestSubmit();
        }
    });

    input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
    });
}

/* Prompt cards and quick prompts */

$$("[data-prompt]").forEach(button => {
    const label = button.querySelector("[data-i18n]");
    const labelKey = label?.dataset.i18n;
    const promptKey = featurePromptKeys[labelKey];

    if (promptKey) {
        button.dataset.promptKey = promptKey;
    }

    button.addEventListener("click", () => {
        const key = button.dataset.promptKey;
        sendMessage(key ? t(key) : button.dataset.prompt || "");
    });
});

/* New chat */

if (newChatButton) {
    newChatButton.addEventListener("click", () => {
        if (activeRequest) stopGeneration(activeRequest);

        chatHistory = [];
        saveHistory();

        if (messages) messages.replaceChildren();
        messages?.classList.remove("visible");

        settingsPanel?.classList.add("hidden");
        historyPanel?.classList.add("hidden");
        welcome?.classList.remove("hidden");

        if (input) {
            input.value = "";
            input.style.height = "auto";
            input.focus();
        }

        currentPage = "chat";

        $$(".nav-item").forEach(button => {
            button.classList.toggle("active", button.dataset.page === "chat");
        });

        renderHistory();
        updatePageTitle();
    });
}

/* Navigation */

$$(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
        currentPage = button.dataset.page;

        $$(".nav-item").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        welcome?.classList.add("hidden");
        messages?.classList.remove("visible");
        settingsPanel?.classList.add("hidden");
        historyPanel?.classList.add("hidden");

        if (currentPage === "settings") {
            settingsPanel?.classList.remove("hidden");
        } else if (currentPage === "history") {
            historyPanel?.classList.remove("hidden");
            renderHistory();
        } else {
            const hasMessages = (messages?.children.length ?? 0) > 0;
            messages?.classList.toggle("visible", hasMessages);
            welcome?.classList.toggle("hidden", hasMessages);
        }

        updatePageTitle();
    });
});

/* AI status */

async function checkStatus() {
    try {
        const response = await fetch("/api/status");

        if (!response.ok) throw new Error("Status request failed");

        const data = await response.json();

        if (!data.online) {
            statusState = "ollamaOffline";
            if (statusDot) statusDot.className = "dot offline";
        } else if (!data.modelReady) {
            statusState = "modelMissing";
            if (statusDot) statusDot.className = "dot offline";
        } else {
            statusState = "aiReady";
            if (statusDot) statusDot.className = "dot online";
        }
    } catch {
        statusState = "serverUnavailable";
        if (statusDot) statusDot.className = "dot offline";
    }

    updateStatusLabel();
}

/* Startup */

currentLanguage = translations[
    safeStorageGet(STORAGE_KEYS.language, "en")
] ? safeStorageGet(STORAGE_KEYS.language, "en") : "en";

chatHistory = loadHistory();

applyLanguage(currentLanguage);
renderConversation();
renderHistory();
checkStatus();

setInterval(checkStatus, 15000);
