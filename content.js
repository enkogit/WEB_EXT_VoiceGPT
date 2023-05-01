function getChatGPTResponse() {
    const chatGPTResponses = document.querySelectorAll(".assistant-msg");
  
    if (chatGPTResponses.length > 0) {
      return chatGPTResponses[chatGPTResponses.length - 1];
    }
  
    return null;
  }
  
  function selectElementText(element) {
    if (window.getSelection && document.createRange) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  
  function logChatGPTResponse(element) {
    const text = element.innerText;
    console.log(`New response: ${text}`);
  }
  
  function isAssistantResponse(node) {
    return node.classList && node.classList.contains("assistant-msg");
  }
  
  const chatContainer = document.querySelector(".chat-container");
  
  if (chatContainer) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((addedNode) => {
            if (isAssistantResponse(addedNode)) {
              logChatGPTResponse(addedNode);
            }
          });
        }
      });
    });
  
    observer.observe(chatContainer, { childList: true });
  } else {
    console.warn("Chat container not found. Unable to observe and log ChatGPT responses.");
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedText") {
      const selectedText = window.getSelection().toString();
      const chatGPTResponse = getChatGPTResponse();
      const text = selectedText || (chatGPTResponse ? chatGPTResponse.innerText : "");
  
      if (!selectedText && chatGPTResponse) {
        selectElementText(chatGPTResponse);
      }
  
      sendResponse({ text: text });
    }
  });
  