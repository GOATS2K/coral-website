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

const changeBackgroundOnMac = () => {
  const newBg = "#444346";
  document.documentElement.style.setProperty("--color-background", newBg);
}

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

// macOS renders the video in a different color space
// idk how to make the video background transparent, so this will have to do
if (navigator.userAgent.includes("Macintosh")) {
  changeBackgroundOnMac();
}