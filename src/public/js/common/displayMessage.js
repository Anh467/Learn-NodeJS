export function displayMessage(message) {
    var messageContainer= document.getElementById('message')
    messageContainer.innerHTML('message: '+ message.value)
    messageContainer.style.color = message.color; 
  }