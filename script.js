// Utility function to get the type of element
function getElementType(element) {
    if (element.tagName === "IMG") return "image";
    if (element.tagName === "A") return "link";
    if (element.tagName === "P") return "text";
    if (element.tagName === "UL" || element.tagName === "LI") return "list";
    if (element.tagName === "H1" || element.tagName === "H2") return "heading";
    if (element.tagName === "INPUT") return "input";
    return element.tagName.toLowerCase();
  }
  
  // Log page view on load
  window.addEventListener("load", () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, body`);
  });
  
  // Log all click events
  document.addEventListener("click", (e) => {
    const timestamp = new Date().toISOString();
    const elementType = getElementType(e.target);
    console.log(`${timestamp}, click, ${elementType}`);
  });

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
  
    words = text.trim().split(/\s+/).length;
  
    // Pronouns, prepositions, and articles
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
  
    // Display all results
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
  
  