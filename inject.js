(function() {
    // This function should be modified to detect new ChatGPT-generated responses
    function onNewResponse(responseElement) {
      const codeExamples = responseElement.querySelectorAll('code');
      codeExamples.forEach(code => code.remove());
      const responseText = responseElement.innerText;
      window.postMessage({ type: 'CHATGPT_RESPONSE', text: responseText }, '*');
    }
  
    // Replace the following code with the logic to detect new ChatGPT-generated responses
    // and call onNewResponse() with the response element
    document.addEventListener('DOMNodeInserted', (event) => {
      const responseElement = event.target.closest('.assistant-msg'); // Replace '.assistant-msg' with the actual selector
      if (responseElement) {
        onNewResponse(responseElement);
      }
    });
  })();
  