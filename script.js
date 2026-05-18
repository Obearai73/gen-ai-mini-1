const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

function addMessage(content, type) {
  const message = document.createElement('div');
  message.className = `message ${type}-message`;
  const text = document.createElement('div');
  text.className = 'message-text';
  text.textContent = content;
  message.appendChild(text);
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessageToServer(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Server error: ' + response.statusText);
  }

  const data = await response.json();
  return data.answer;
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  try {
    addMessage('Thinking...', 'bot');
    const answer = await sendMessageToServer(text);
    const botMessages = Array.from(chatContainer.querySelectorAll('.bot-message'));
    const lastBotMessage = botMessages[botMessages.length - 1];
    if (lastBotMessage && lastBotMessage.textContent === 'Thinking...') {
      lastBotMessage.textContent = answer;
    } else {
      addMessage(answer, 'bot');
    }
  } catch (error) {
    const errorText = 'Sorry, the server is unavailable. Please start the backend and try again.';
    addMessage(errorText, 'bot');
    console.error(error);
  }
});

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
  }
});
