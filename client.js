// client.js
const socket = io();
const nicknameForm = document.getElementById('nickname-form');
const nicknameInput = document.getElementById('nickname-input');
const nicknameButton = document.getElementById('nickname-button');
const lobby = document.getElementById('lobby');
const nicknameDisplay = document.getElementById('nickname-display');
const canvas = document.getElementById('canvas');

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = nicknameInput.value;
    socket.emit('nickname', nickname);
    nicknameDisplay.textContent = nickname;
    lobby.hidden = false;
    nicknameForm.hidden = true;
});

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    socket.emit('cursor', {x, y});
});

socket.on('message', (message) => {
    const p = document.createElement('p');
    p.textContent = message;
    canvas.appendChild(p);
});

socket.on('cursor', (data) => {
    const span = document.getElementById(data.nickname) || document.createElement('span');
    span.id = data.nickname;
    span.textContent = data.nickname;
    span.style.left = data.x + 'px';
    span.style.top = data.y + 'px';
    canvas.appendChild(span);
});
