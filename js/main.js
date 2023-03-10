// We want to see some non-trivial Javascript code
// At a minimum, you should demonstrate a few simple uses of event-driven JavaScript for DOM manipulation
// You should use ES6 syntax throughout: e.g. don't use "var", use the modern tools (template literals, arrow functions).
// There should be no JavaScript errors in the browser console

// For more marks, we like to see a bit more complex use of JavaScript, perhaps some looping and/or more complex DOM manipulation.
// Accessing APIs is a great option if it fits with your project, or you can work with your own, local data.
// Your code should be DRY, if you have repeated code, consider refactoring as a function with arguments for example.
// We like to see what you can do. Be creative.


// event handlers
const scrollToBanner = () => {
  const whyBanner = document.querySelector("#why-coral");
  whyBanner.scrollIntoView({behavior: "smooth"});
}

// set event handlers on main page
const attachEventHandlersForFrontPage = () => {
  const scrollButton = document.querySelector("#scrollButton");
  scrollButton.addEventListener("click", scrollToBanner)
  console.log("Attached event handlers for front page.");
}

const setSectionIdsOnArticle = () => {
  const sections = document.querySelectorAll(".article-section");
  let counter = 0;
  for (const section of sections) {
    // get h2 and mark as section header
    for (const child of section.children) {
      if (child.tagName === "H2") {
        counter++;
        child.className = `article-heading`;
        child.id = `heading-${counter}`
      }
    }
  }
}

const generateTableOfContentsForArticle = () => {
  setSectionIdsOnArticle();
  let tocContainer = document.querySelector(".toc");

  // map doesn't exist on querySelectorAll so we need to use loops
  let mainHeadings = []
  let list = document.createElement("ul");
  for (let section of document.querySelectorAll(".article-heading")) {
    // get all sections with header class
    mainHeadings.push({"id": section.id, "title": section.innerText})
    let listItem = document.createElement("li");
    let link = document.createElement("a");
    link.innerText = section.innerHTML;
    link.href = `#${section.id}`
    listItem.appendChild(link)
    list.appendChild(listItem);
  }
  tocContainer.append(list);
  console.log(mainHeadings);
}

switch (window.location.pathname) {
  case "/":
    attachEventHandlersForFrontPage();
    break;
  case '/story.html':
    generateTableOfContentsForArticle();
    break;
}