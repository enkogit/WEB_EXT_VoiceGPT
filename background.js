function getActiveTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0]);
      });
    });
  }
  
  async function speakSelectedText() {
    const activeTab = await getActiveTab();
    chrome.tabs.sendMessage(activeTab.id, { action: "getSelectedText" }, (response) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else {
        const text = response ? response.text : "";
        if (text) {
          chrome.tts.speak(text, { rate: 0.9 });
        }
      }
    });
  }
  
  function stopSpeaking() {
    chrome.tts.stop();
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "speak") {
      speakSelectedText();
    }
  });
  
  chrome.commands.onCommand.addListener((command) => {
    if (command === "speak_selected_text") {
      speakSelectedText();
    } else if (command === "stop_speaking") {
      stopSpeaking();
    }
  });
  
  