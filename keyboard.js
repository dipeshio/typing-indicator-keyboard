/**
 * Keyboard Layout Definition
 * 60% ANSI layout with 62 keys
 */

const KEYBOARD_LAYOUT = [
    // Row 1: Number row (14 keys)
    [
        { key: '`', code: 'Backquote', label: '`' },
        { key: '1', code: 'Digit1', label: '1' },
        { key: '2', code: 'Digit2', label: '2' },
        { key: '3', code: 'Digit3', label: '3' },
        { key: '4', code: 'Digit4', label: '4' },
        { key: '5', code: 'Digit5', label: '5' },
        { key: '6', code: 'Digit6', label: '6' },
        { key: '7', code: 'Digit7', label: '7' },
        { key: '8', code: 'Digit8', label: '8' },
        { key: '9', code: 'Digit9', label: '9' },
        { key: '0', code: 'Digit0', label: '0' },
        { key: '-', code: 'Minus', label: '-' },
        { key: '=', code: 'Equal', label: '=' },
        { key: 'Backspace', code: 'Backspace', label: '⌫', class: 'backspace' }
    ],
    // Row 2: QWERTY row (14 keys)
    [
        { key: 'Tab', code: 'Tab', label: 'Tab', class: 'tab' },
        { key: 'q', code: 'KeyQ', label: 'Q' },
        { key: 'w', code: 'KeyW', label: 'W' },
        { key: 'e', code: 'KeyE', label: 'E' },
        { key: 'r', code: 'KeyR', label: 'R' },
        { key: 't', code: 'KeyT', label: 'T' },
        { key: 'y', code: 'KeyY', label: 'Y' },
        { key: 'u', code: 'KeyU', label: 'U' },
        { key: 'i', code: 'KeyI', label: 'I' },
        { key: 'o', code: 'KeyO', label: 'O' },
        { key: 'p', code: 'KeyP', label: 'P' },
        { key: '[', code: 'BracketLeft', label: '[' },
        { key: ']', code: 'BracketRight', label: ']' },
        { key: '\\', code: 'Backslash', label: '\\' }
    ],
    // Row 3: Home row (13 keys)
    [
        { key: 'CapsLock', code: 'CapsLock', label: 'Caps', class: 'caps' },
        { key: 'a', code: 'KeyA', label: 'A' },
        { key: 's', code: 'KeyS', label: 'S' },
        { key: 'd', code: 'KeyD', label: 'D' },
        { key: 'f', code: 'KeyF', label: 'F' },
        { key: 'g', code: 'KeyG', label: 'G' },
        { key: 'h', code: 'KeyH', label: 'H' },
        { key: 'j', code: 'KeyJ', label: 'J' },
        { key: 'k', code: 'KeyK', label: 'K' },
        { key: 'l', code: 'KeyL', label: 'L' },
        { key: ';', code: 'Semicolon', label: ';' },
        { key: "'", code: 'Quote', label: "'" },
        { key: 'Enter', code: 'Enter', label: 'Enter', class: 'enter' }
    ],
    // Row 4: Bottom letter row (12 keys)
    [
        { key: 'Shift', code: 'ShiftLeft', label: 'Shift', class: 'shift-left' },
        { key: 'z', code: 'KeyZ', label: 'Z' },
        { key: 'x', code: 'KeyX', label: 'X' },
        { key: 'c', code: 'KeyC', label: 'C' },
        { key: 'v', code: 'KeyV', label: 'V' },
        { key: 'b', code: 'KeyB', label: 'B' },
        { key: 'n', code: 'KeyN', label: 'N' },
        { key: 'm', code: 'KeyM', label: 'M' },
        { key: ',', code: 'Comma', label: ',' },
        { key: '.', code: 'Period', label: '.' },
        { key: '/', code: 'Slash', label: '/' },
        { key: 'Shift', code: 'ShiftRight', label: 'Shift', class: 'shift-right' }
    ],
    // Row 5: Bottom row with space (9 keys)
    [
        { key: 'Control', code: 'ControlLeft', label: 'Ctrl', class: 'ctrl' },
        { key: 'Meta', code: 'MetaLeft', label: 'Win', class: 'fn' },
        { key: 'Alt', code: 'AltLeft', label: 'Alt', class: 'alt' },
        { key: ' ', code: 'Space', label: '', class: 'space' },
        { key: 'Alt', code: 'AltRight', label: 'Alt', class: 'alt' },
        { key: 'Fn', code: 'Fn', label: 'Fn', class: 'fn' },
        { key: 'ArrowLeft', code: 'ArrowLeft', label: '←' },
        { key: 'ArrowDown', code: 'ArrowDown', label: '↓' },
        { key: 'ArrowRight', code: 'ArrowRight', label: '→' }
    ]
];

/**
 * Render the keyboard into the DOM
 */
function renderKeyboard() {
    const keyboardElement = document.getElementById('keyboard');
    keyboardElement.innerHTML = '';

    KEYBOARD_LAYOUT.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'keyboard-row';

        row.forEach(keyData => {
            const keyElement = document.createElement('div');
            keyElement.className = 'key';
            if (keyData.class) {
                keyElement.classList.add(keyData.class);
            }
            keyElement.dataset.code = keyData.code;
            keyElement.textContent = keyData.label;
            rowElement.appendChild(keyElement);
        });

        keyboardElement.appendChild(rowElement);
    });
}

/**
 * Activate a key visually (glow effect)
 */
function activateKey(code) {
    const keyElement = document.querySelector(`.key[data-code="${code}"]`);
    if (keyElement) {
        keyElement.classList.remove('dissipating');
        keyElement.classList.add('active');
    }
}

/**
 * Deactivate a key visually (start dissipation)
 */
function deactivateKey(code) {
    const keyElement = document.querySelector(`.key[data-code="${code}"]`);
    if (keyElement) {
        keyElement.classList.remove('active');
        keyElement.classList.add('dissipating');
        
        // Remove dissipating class after animation completes
        setTimeout(() => {
            keyElement.classList.remove('dissipating');
        }, 400);
    }
}

// Export for use in app.js
window.KeyboardModule = {
    renderKeyboard,
    activateKey,
    deactivateKey,
    KEYBOARD_LAYOUT
};
