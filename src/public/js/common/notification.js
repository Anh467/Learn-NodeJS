function showNotification(message, duration) {
    try {
        var notification = document.getElementById("notification");
        notification.innerHTML = message.value;
        notification.style.color = message.color
        notification.style.opacity = "1";
    
        setTimeout(function () {
        notification.style.opacity = "0";
        }, duration);
    } catch (error) {
        
    }
    
  }