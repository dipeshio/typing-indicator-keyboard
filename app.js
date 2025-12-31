/**
 * Typing Indicator Keyboard - Main Application
 */

(function () {
    'use strict';

    // Word list for typing tests - expanded for variety
    const WORD_LIST = [
        // Common words
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
        'for', 'not', 'on', 'with', 'as', 'you', 'do', 'at', 'this', 'but',
        'by', 'from', 'they', 'we', 'say', 'or', 'an', 'will', 'my', 'one',
        'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
        'who', 'get', 'which', 'go', 'when', 'make', 'can', 'like', 'time', 'no',
        'just', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
        'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its',
        'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
        'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give',
        'day', 'most', 'us', 'been', 'has', 'more', 'was', 'had', 'are', 'were',
        // Extended vocabulary
        'being', 'here', 'must', 'while', 'should', 'each', 'made', 'before', 'those',
        'such', 'long', 'through', 'right', 'down', 'still', 'find', 'world', 'again',
        'place', 'around', 'home', 'small', 'found', 'thought', 'went', 'say', 'part',
        'high', 'every', 'near', 'between', 'own', 'under', 'last', 'keep', 'never',
        'same', 'another', 'while', 'began', 'seem', 'house', 'point', 'might', 'next',
        'city', 'always', 'thing', 'without', 'days', 'keep', 'night', 'once', 'three',
        'both', 'life', 'start', 'name', 'read', 'face', 'change', 'off', 'away',
        'left', 'until', 'along', 'yet', 'state', 'enough', 'head', 'call', 'show',
        'try', 'ask', 'need', 'hand', 'few', 'put', 'end', 'old', 'great',
        'country', 'line', 'man', 'woman', 'child', 'run', 'side', 'turn', 'move',
        // Action words
        'write', 'play', 'help', 'stop', 'open', 'close', 'learn', 'watch', 'build',
        'walk', 'wait', 'plan', 'talk', 'stay', 'stand', 'listen', 'eat', 'drink',
        'sleep', 'dream', 'grow', 'follow', 'begin', 'speak', 'hear', 'feel', 'meet',
        'send', 'spend', 'buy', 'sell', 'bring', 'break', 'catch', 'hold', 'carry',
        'create', 'become', 'happen', 'appear', 'include', 'continue', 'develop', 'provide',
        // Descriptive words
        'important', 'different', 'large', 'young', 'early', 'later', 'possible', 'true',
        'bad', 'best', 'better', 'hard', 'real', 'free', 'sure', 'clear', 'full',
        'easy', 'strong', 'certain', 'public', 'local', 'modern', 'simple', 'whole',
        'human', 'social', 'political', 'special', 'black', 'white', 'short', 'major',
        'common', 'single', 'personal', 'current', 'national', 'general', 'recent', 'main',
        // Tech and modern words
        'system', 'program', 'computer', 'network', 'data', 'online', 'digital', 'software',
        'website', 'internet', 'email', 'mobile', 'phone', 'screen', 'device', 'cloud',
        'server', 'code', 'file', 'folder', 'search', 'click', 'type', 'keyboard',
        'monitor', 'mouse', 'window', 'browser', 'password', 'account', 'profile', 'setting',
        // Nature and environment
        'water', 'fire', 'earth', 'wind', 'sky', 'ocean', 'river', 'mountain', 'forest',
        'tree', 'flower', 'grass', 'rock', 'stone', 'sand', 'snow', 'rain', 'sun',
        'moon', 'star', 'cloud', 'storm', 'weather', 'season', 'spring', 'summer', 'fall',
        'winter', 'animal', 'bird', 'fish', 'plant', 'garden', 'field', 'farm', 'island',
        // Daily life
        'morning', 'afternoon', 'evening', 'today', 'tomorrow', 'yesterday', 'week', 'month',
        'hour', 'minute', 'second', 'moment', 'food', 'drink', 'breakfast', 'lunch', 'dinner',
        'table', 'chair', 'door', 'window', 'floor', 'wall', 'room', 'kitchen', 'bedroom',
        'bathroom', 'office', 'street', 'road', 'car', 'bus', 'train', 'plane', 'bike',
        // Abstract concepts
        'idea', 'problem', 'question', 'answer', 'reason', 'result', 'effect', 'purpose',
        'information', 'knowledge', 'experience', 'memory', 'story', 'history', 'future',
        'power', 'control', 'order', 'process', 'level', 'value', 'quality', 'action',
        'effort', 'success', 'failure', 'progress', 'growth', 'chance', 'choice', 'decision',
        // Relationships
        'family', 'friend', 'group', 'team', 'company', 'community', 'society', 'member',
        'leader', 'parent', 'mother', 'father', 'brother', 'sister', 'teacher', 'student',
        'doctor', 'artist', 'writer', 'player', 'worker', 'manager', 'customer', 'partner'
    ];

    // Quote list for real text mode - longer passages
    const QUOTES = [
        "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. And, like any great relationship, it just gets better and better as the years roll on. So keep looking until you find it.",
        "In the middle of difficulty lies opportunity. The best time to plant a tree was twenty years ago. The second best time is now. What we achieve inwardly will change outer reality. The journey of a thousand miles begins with a single step, but you must have the courage to take that step.",
        "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change. In the long history of humankind, those who learned to collaborate and improvise most effectively have prevailed. Adaptation is not imitation; it means power of resistance and assimilation.",
        "The purpose of our lives is to be happy. Happiness is not something ready-made. It comes from your own actions. If you want others to be happy, practice compassion. If you want to be happy, practice compassion. The more you are motivated by love, the more fearless you become.",
        "Life is what happens when you're busy making other plans. In three words I can sum up everything I've learned about life: it goes on. In the end, it's not the years in your life that count. It's the life in your years. The purpose of life is not to be happy, but to be useful.",
        "Programming is the art of telling another human being what one wants the computer to do. Code is poetry written in logic. The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly. A program is never less than fifty percent done.",
        "The best error message is the one that never shows up. First, solve the problem. Then, write the code. Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. Debugging is twice as hard as writing the code in the first place.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Programs must be written for people to read, and only incidentally for machines to execute. The most important property of a program is whether it accomplishes the intention of its user.",
        "Simplicity is the soul of efficiency. Make it work, make it right, make it fast. In that order. Premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical three percent. A good programmer is someone who always looks both ways before crossing a one-way street.",
        "Talk is cheap. Show me the code. Given enough eyeballs, all bugs are shallow. Release early. Release often. And listen to your customers. The Linux philosophy is laugh in the face of danger. Wrong. Oops. The Linux philosophy is 'laugh in the face of danger. Oops. Wrong.'",
        "Measuring programming progress by lines of code is like measuring aircraft building progress by weight. The competent programmer is fully aware of the limited size of his own skull. He therefore approaches his task with full humility, and avoids clever tricks like the plague.",
        "The function of good software is to make the complex appear to be simple. Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. Good design adds value faster than it adds cost. A designer knows he has achieved perfection when there is nothing left to remove."
    ];

    // Punctuation and number additions
    const PUNCTUATION = ['.', ',', '!', '?', ';', ':', "'", '"', '-'];
    const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // State
    let state = {
        testDuration: 15,
        timeRemaining: 15,
        isRunning: false,
        isFinished: false,
        words: [],
        currentWordIndex: 0,
        currentLetterIndex: 0,
        correctChars: 0,
        totalChars: 0,
        mistakes: 0,
        timerInterval: null,
        mode: 'words',
        options: {
            punctuation: false,
            numbers: false
        },
        lastMetrics: null
    };

    // DOM Elements
    const wordDisplay = document.getElementById('word-display');
    const typingInput = document.getElementById('typing-input');
    const timerValue = document.getElementById('timer-value');
    const statsDisplay = document.getElementById('stats-display');
    const restartBtn = document.getElementById('restart-btn');
    const timeBtns = document.querySelectorAll('.time-btn');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    const saveBtn = document.getElementById('save-btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Stat elements
    const wpmValue = document.getElementById('wpm-value');
    const rawWpmValue = document.getElementById('raw-wpm-value');
    const accuracyValue = document.getElementById('accuracy-value');
    const consistencyValue = document.getElementById('consistency-value');
    const mistakesValue = document.getElementById('mistakes-value');

    /**
     * Generate natural sentences for the test
     */
    function generateWords(count = 50) {
        const words = [];
        let sentenceLength = 0;
        const targetSentenceLength = () => Math.floor(Math.random() * 8) + 5; // 5-12 words per sentence
        let currentTarget = targetSentenceLength();

        for (let i = 0; i < count; i++) {
            let word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

            // Capitalize first word of sentence
            if (sentenceLength === 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }

            // Add numbers naturally (like "about 5 years" or "over 100 times")
            if (state.options.numbers && sentenceLength > 0 && Math.random() < 0.1) {
                const num = Math.floor(Math.random() * 100) + 1;
                words.push(String(num));
                sentenceLength++;
                i++;
                if (i >= count) break;
            }

            sentenceLength++;

            // Add punctuation naturally
            if (state.options.punctuation) {
                // End of sentence
                if (sentenceLength >= currentTarget) {
                    const endPunct = ['.', '.', '.', '!', '?'][Math.floor(Math.random() * 5)];
                    word = word + endPunct;
                    sentenceLength = 0;
                    currentTarget = targetSentenceLength();
                }
                // Mid-sentence comma
                else if (sentenceLength > 2 && Math.random() < 0.15) {
                    word = word + ',';
                }
            }

            words.push(word);
        }

        // Ensure last word ends with period if punctuation enabled
        if (state.options.punctuation && words.length > 0) {
            const last = words[words.length - 1];
            if (!/[.!?]$/.test(last)) {
                words[words.length - 1] = last.replace(/,$/, '') + '.';
            }
        }

        return words;
    }

    /**
     * Generate quote words
     */
    function generateQuoteWords() {
        const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        return quote.split(' ');
    }

    /**
     * Get words based on current mode
     */
    function getWords() {
        if (state.mode === 'quotes') {
            return generateQuoteWords();
        }
        return generateWords();
    }

    /**
     * Render words to the display
     */
    function renderWords() {
        wordDisplay.innerHTML = '';

        state.words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.dataset.wordIndex = wordIndex;

            word.split('').forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter pending';
                letterSpan.dataset.letterIndex = letterIndex;
                letterSpan.textContent = letter;
                wordSpan.appendChild(letterSpan);
            });

            // Add space after word (except last)
            if (wordIndex < state.words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'letter pending space';
                spaceSpan.dataset.letterIndex = word.length;
                spaceSpan.textContent = ' ';
                wordSpan.appendChild(spaceSpan);
            }

            wordDisplay.appendChild(wordSpan);
        });

        updateCurrentLetter();
    }

    /**
     * Update the visual indicator for current letter
     */
    function updateCurrentLetter() {
        // Remove all current markers
        document.querySelectorAll('.letter.current').forEach(el => {
            el.classList.remove('current');
        });

        // Find and mark current letter
        const currentWord = wordDisplay.querySelector(`[data-word-index="${state.currentWordIndex}"]`);
        if (currentWord) {
            const currentLetter = currentWord.querySelector(`[data-letter-index="${state.currentLetterIndex}"]`);
            if (currentLetter) {
                currentLetter.classList.add('current');
            }
        }
    }

    /**
     * Start the typing test
     */
    function startTest() {
        if (state.isRunning) return;

        state.isRunning = true;
        state.isFinished = false;
        statsDisplay.classList.add('hidden');

        state.timerInterval = setInterval(() => {
            state.timeRemaining--;
            timerValue.textContent = state.timeRemaining;

            if (state.timeRemaining <= 0) {
                endTest();
            }
        }, 1000);
    }

    /**
     * End the typing test
     */
    function endTest() {
        state.isRunning = false;
        state.isFinished = true;
        clearInterval(state.timerInterval);

        // Calculate and display results
        const elapsedSeconds = state.testDuration - state.timeRemaining;
        const metrics = MetricsModule.getAllMetrics(
            state.correctChars,
            state.totalChars,
            state.mistakes,
            elapsedSeconds > 0 ? elapsedSeconds : state.testDuration
        );

        state.lastMetrics = {
            ...metrics,
            duration: state.testDuration,
            mode: state.mode,
            punctuation: state.options.punctuation,
            numbers: state.options.numbers,
            date: new Date().toISOString()
        };

        wpmValue.textContent = metrics.wpm;
        rawWpmValue.textContent = metrics.rawWpm;
        accuracyValue.textContent = metrics.accuracy + '%';
        consistencyValue.textContent = metrics.consistency + '%';
        mistakesValue.textContent = metrics.mistakes;

        statsDisplay.classList.remove('hidden');
        saveBtn.disabled = false;
    }

    /**
     * Reset the test
     */
    function resetTest() {
        clearInterval(state.timerInterval);

        state = {
            ...state,
            timeRemaining: state.testDuration,
            isRunning: false,
            isFinished: false,
            words: getWords(),
            currentWordIndex: 0,
            currentLetterIndex: 0,
            correctChars: 0,
            totalChars: 0,
            mistakes: 0,
            timerInterval: null,
            lastMetrics: null
        };

        MetricsModule.reset();
        timerValue.textContent = state.testDuration;
        statsDisplay.classList.add('hidden');
        typingInput.value = '';
        renderWords();
        typingInput.focus();
    }

    /**
     * Handle keydown event
     */
    function handleKeyDown(e) {
        // Activate visual key
        KeyboardModule.activateKey(e.code);

        // Start test on first keystroke
        if (!state.isRunning && !state.isFinished) {
            if (e.key.length === 1 || e.key === 'Backspace') {
                startTest();
            }
        }

        // Don't process if test is finished
        if (state.isFinished) return;

        // Record for consistency
        if (e.key.length === 1) {
            MetricsModule.recordKeystroke();
        }
    }

    /**
     * Handle keyup event
     */
    function handleKeyUp(e) {
        KeyboardModule.deactivateKey(e.code);
    }

    /**
     * Handle input changes
     */
    function handleInput(e) {
        if (state.isFinished) return;

        const currentWord = state.words[state.currentWordIndex];
        const inputValue = e.target.value;

        // Get the word element
        const wordElement = wordDisplay.querySelector(`[data-word-index="${state.currentWordIndex}"]`);
        if (!wordElement) return;

        // Check each character
        const letters = wordElement.querySelectorAll('.letter');
        const expectedWithSpace = currentWord + (state.currentWordIndex < state.words.length - 1 ? ' ' : '');

        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            letter.classList.remove('correct', 'incorrect', 'pending');

            if (i < inputValue.length) {
                if (inputValue[i] === expectedWithSpace[i]) {
                    letter.classList.add('correct');
                } else {
                    letter.classList.add('incorrect');
                }
            } else {
                letter.classList.add('pending');
            }
        }

        state.currentLetterIndex = inputValue.length;
        updateCurrentLetter();

        // Check if word is complete (space pressed or end of text)
        if (inputValue.endsWith(' ') && inputValue.trim().length > 0) {
            const typedWord = inputValue.trim();

            // Count correct characters
            for (let i = 0; i < Math.min(typedWord.length, currentWord.length); i++) {
                state.totalChars++;
                if (typedWord[i] === currentWord[i]) {
                    state.correctChars++;
                } else {
                    state.mistakes++;
                }
            }

            // Count extra characters as mistakes
            if (typedWord.length > currentWord.length) {
                state.mistakes += typedWord.length - currentWord.length;
                state.totalChars += typedWord.length - currentWord.length;
            }

            // Count missing characters as mistakes
            if (typedWord.length < currentWord.length) {
                state.mistakes += currentWord.length - typedWord.length;
            }

            // Count the space
            state.totalChars++;
            state.correctChars++;

            // Move to next word
            state.currentWordIndex++;
            state.currentLetterIndex = 0;
            e.target.value = '';

            if (state.currentWordIndex >= state.words.length) {
                endTest();
            } else {
                updateCurrentLetter();
            }
        }
    }

    /**
     * Set test duration
     */
    function setDuration(seconds) {
        state.testDuration = seconds;
        timeBtns.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.time) === seconds);
        });
        resetTest();
    }

    /**
     * Set test mode
     */
    function setMode(mode) {
        state.mode = mode;
        modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        // Disable options in quotes mode
        optionBtns.forEach(btn => {
            btn.disabled = mode === 'quotes';
            if (mode === 'quotes') {
                btn.classList.remove('active');
                state.options[btn.dataset.option] = false;
            }
        });
        resetTest();
    }

    /**
     * Toggle option
     */
    function toggleOption(option) {
        if (state.mode === 'quotes') return;
        state.options[option] = !state.options[option];
        optionBtns.forEach(btn => {
            if (btn.dataset.option === option) {
                btn.classList.toggle('active', state.options[option]);
            }
        });
        resetTest();
    }

    /**
     * Save result to localStorage
     */
    function saveResult() {
        if (!state.lastMetrics) return;

        const history = JSON.parse(localStorage.getItem('typingHistory') || '[]');
        history.unshift(state.lastMetrics);

        // Keep only last 50 results
        if (history.length > 50) {
            history.pop();
        }

        localStorage.setItem('typingHistory', JSON.stringify(history));
        saveBtn.disabled = true;
        renderHistory();
    }

    /**
     * Load and render history
     */
    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('typingHistory') || '[]');

        if (history.length === 0) {
            historyList.innerHTML = '<div class="history-empty">No saved results yet</div>';
            return;
        }

        historyList.innerHTML = history.slice(0, 10).map(item => {
            const date = new Date(item.date);
            const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const modeStr = item.mode + (item.punctuation ? ' +punct' : '') + (item.numbers ? ' +nums' : '');

            return `
                <div class="history-item">
                    <span class="history-wpm">${item.wpm} WPM</span>
                    <span class="history-details">
                        <span>${item.accuracy}% acc</span>
                        <span>${item.consistency}% cons</span>
                        <span>${item.duration}s</span>
                        <span>${modeStr}</span>
                    </span>
                    <span class="history-date">${dateStr}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Clear history
     */
    function clearHistory() {
        localStorage.removeItem('typingHistory');
        renderHistory();
    }

    /**
     * Initialize the application
     */
    function init() {
        // Render keyboard
        KeyboardModule.renderKeyboard();

        // Generate initial words
        state.words = getWords();
        renderWords();
        timerValue.textContent = state.testDuration;

        // Event listeners
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        typingInput.addEventListener('input', handleInput);

        restartBtn.addEventListener('click', resetTest);

        timeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setDuration(parseInt(btn.dataset.time));
            });
        });

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setMode(btn.dataset.mode);
            });
        });

        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleOption(btn.dataset.option);
            });
        });

        saveBtn.addEventListener('click', saveResult);
        clearHistoryBtn.addEventListener('click', clearHistory);

        // Focus input on click anywhere
        document.addEventListener('click', () => {
            if (!state.isFinished) {
                typingInput.focus();
            }
        });

        // Initial focus
        typingInput.focus();

        // Load history
        renderHistory();
    }

    // Start the app
    init();
})();
