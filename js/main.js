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
  whyBanner.scrollIntoView({ behavior: "smooth" });
};

// set event handlers on main page
const attachEventHandlersForFrontPage = () => {
  const scrollButton = document.querySelector("#scrollButton");
  scrollButton.addEventListener("click", scrollToBanner);
  console.log("Attached event handlers for front page.");
};

const setSectionIdsOnArticle = () => {
  const sections = document.querySelectorAll(".article-section");
  let headingCounter = 0;
  let subHeadingCounter = 0;
  for (const section of sections) {
    // get h2 and mark as section header
    for (const child of section.children) {
      if (child.tagName === "H2") {
        headingCounter++;
        child.className = `article-heading`;
        child.id = `heading-${headingCounter}`;
      }
      if (child.tagName === "H3") {
        subHeadingCounter++;
        child.className = "article-sub-heading";
        child.id = `sub-heading-${subHeadingCounter}`;
      }
    }
  }
};

const parseSectionMap = (sectionMap) => {
  let listItem = document.createElement("li");
  listItem.className = "toc-list-item";

  let mainHeadingLink = document.createElement("a");
  mainHeadingLink.innerText = sectionMap.title;
  mainHeadingLink.href = `#${sectionMap.id}`;
  listItem.appendChild(mainHeadingLink);

  if (sectionMap.subHeadings.length > 0) {
    let childList = document.createElement("ul");
    childList.className = "toc-list";

    for (const subHeading of sectionMap.subHeadings) {
      let childItem = document.createElement("li");
      childItem.className = "toc-list-item";

      let link = document.createElement("a");
      link.innerText = subHeading.title;
      link.href = `#${subHeading.id}`;

      childItem.appendChild(link);
      childList.appendChild(childItem);
      listItem.appendChild(childList);
    }
  }

  return listItem;
};

const generateTableOfContentsForArticle = () => {
  setSectionIdsOnArticle();
  let tocContainer = document.querySelector(".toc");

  // map doesn't exist on querySelectorAll so we need to use loops
  let list = document.createElement("ul");
  list.className = "toc-list";
  for (let section of document.querySelectorAll(".article-section")) {
    const heading = section.querySelector(".article-heading");
    let sectionMap = {
      id: heading.id,
      title: heading.innerText,
      subHeadings: [],
    };

    for (const subHeading of section.querySelectorAll(".article-sub-heading")) {
      sectionMap.subHeadings.push({
        id: subHeading.id,
        title: subHeading.innerText,
      });
    }

    const listItem = parseSectionMap(sectionMap);
    list.appendChild(listItem);
  }
  tocContainer.append(list);
};

switch (window.location.pathname) {
  case "/":
    attachEventHandlersForFrontPage();
    break;
  case "/story.html":
    generateTableOfContentsForArticle();
    break;
}
