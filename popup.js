function getSelectedText() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
        resolve(response ? response.text : '');
      });
    });
  });
}

document.getElementById("speakButton").addEventListener("click", async () => {
  const selectedText = await getSelectedText();
  if (selectedText) {
    chrome.runtime.sendMessage({ action: "speak", text: selectedText });
  } else {
    alert("No text selected. Please select the text you want to be read aloud.");
  }
});
