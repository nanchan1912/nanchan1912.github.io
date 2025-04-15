function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  function scrollToTextAnalysis() {
    const section = document.getElementById('text-analysis');
    if (section.classList.contains('hidden')) {
      section.classList.remove('hidden');
    }
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function analyzeText() {
    const text = document.getElementById("textInput").value;
    const output = document.getElementById("output");
  
    let letters = 0, words = 0, spaces = 0, newlines = 0, specialSymbols = 0;
  
    for (let char of text) {
      if (/[a-zA-Z]/.test(char)) letters++;
      else if (char === ' ') spaces++;
      else if (char === '\n') newlines++;
      else if (/[^a-zA-Z0-9\s]/.test(char)) specialSymbols++;
    }
  
    words = text.trim().split(/\s+/).filter(Boolean).length;
  
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    const prepositions = ['in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'over', 'under'];
    const articles = ['a', 'an', 'the'];
  
    const tokens = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  
    const countGroup = (list) => {
      const result = {};
      for (let word of tokens) {
        if (list.includes(word)) {
          result[word] = (result[word] || 0) + 1;
        }
      }
      return result;
    };
  
    const pronounCount = countGroup(pronouns);
    const prepositionCount = countGroup(prepositions);
    const articleCount = countGroup(articles);
  
    output.textContent = `
  Letters: ${letters}
  Words: ${words}
  Spaces: ${spaces}
  Newlines: ${newlines}
  Special Symbols: ${specialSymbols}
  
  Pronoun Count:
  ${JSON.stringify(pronounCount, null, 2)}
  
  Preposition Count:
  ${JSON.stringify(prepositionCount, null, 2)}
  
  Article Count:
  ${JSON.stringify(articleCount, null, 2)}
    `;
  }
  function toggleHiddenBox() {
    var box = document.getElementById("hiddenBox");
    var gif = document.getElementById("hiddenGif");
    if (box.style.display === "none") {
      box.style.display = "block";
      gif.style.display = "inline-block";
    } else {
      box.style.display = "none";
      gif.style.display = "none";
    }
  }


  //timestamp
  function captureEvents() {
    // Helper function to determine event object type
    function getEventObjectType(element) {
      if (element.tagName === 'IMG') return 'image';
      if (element.tagName === 'SELECT') return 'drop-down';
      if (element.tagName === 'BUTTON') return 'button';
      if (element.tagName === 'A') return 'link';
      if (element.tagName === 'P' || element.tagName.match(/^H[1-6]$/)) return 'text';
      if (element.tagName === 'DIV') return 'container';
      if (element.tagName === 'TEXTAREA') return 'textarea';
      return 'other'; // Fallback for other elements
    }
  
    // Capture page view on load
    window.addEventListener('load', () => {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp}, view, page`);
    });
  
    // Capture click events on all elements
    document.addEventListener('click', (event) => {
      const timestamp = new Date().toISOString();
      const element = event.target;
      const objectType = getEventObjectType(element);
      console.log(`${timestamp}, click, ${objectType}`);
    });
  }
  
  // Initialize event capturing
  captureEvents();
