function AddIconToReplyField() {
  const ReplyWrapper = document.querySelector(
    ".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr",
  );

  if (ReplyWrapper.childNodes.length < 2) {
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHhH1KztBuAwq5aAlX8cE6DzIf7CegyFCJPA&usqp=CAU";

    div.appendChild(img);
    div.style.width = "28px";
    div.style.height = "28px";
    div.style.borderRadius = "50%";
    div.style.display = "inline-block";
    div.style.marginRight = "0.25rem";
    div.style.zIndex = "999";
    div.style.cursor = "pointer";
    div.style.position = "absolute";
    div.style.right = "1rem";
    div.style.bottom = "0";
    div.style.boxShadow = "1px 1px 1px #000";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "50%";

    div.onclick = handleExtensionIconClick;

    ReplyWrapper.appendChild(div);
  }
}

const handleExtensionIconClick = () => {
  const tweet_text_container = document.querySelector(
    "[data-testid=tweetText]",
  );

  const childs = tweet_text_container.querySelectorAll("*");
  let str = "";
  childs.forEach((child) => {
    const link = child.querySelector("a");
    if (
      child.hasAttribute("target") &&
      child.getAttribute("target") === "_blank"
    ) {
      str += child.textContent;
    } else if (link) {
      str += link.textContent;
    } else {
      if (child.nodeName === "SPAN") {
        child.childNodes.forEach((node) => {
          if (
            (node.nodeType =
              3 &&
              node.data &&
              node.data !== "https://" &&
              node.data !== "http://" &&
              node.data[0] !== "/" &&
              node.data[0] !== "?")
          ) {
            str += node.data;
          }
        });
      }
    }
  });

  alert(str);

  copyTextToReplyField(str);
};

function copyTextToReplyField(str) {
  const ReplyWrapper = document.querySelector(
    ".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr",
  );

  const childElement = ReplyWrapper.childNodes[0].childNodes[0];

  if (childElement.nodeName !== "BR") {
    childElement.textContent += str;
  } else {
    const placeHolderElement = document.querySelector(
      ".public-DraftEditorPlaceholder-root",
    );

    placeHolderElement.remove();

    const parentElement = childElement.closest("span");
    if (parentElement && parentElement.contains(childElement)) {
      const spanElement = document.createElement("span");
      spanElement.setAttribute("data-text", "true");
      parentElement.removeChild(childElement);
      parentElement.appendChild(spanElement);
      spanElement.textContent = str;
    }
  }
  const ReplyBtnWrapper = document.querySelector(
    ".css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-19u6a5r.r-2yi16.r-1qi8awa.r-ymttw5.r-o7ynqc.r-6416eg.r-icoktb.r-1ny4l3l",
  );

  if (ReplyBtnWrapper) {
    ReplyBtnWrapper.classList.replace("r-icoktb", "r-1loqt21");
    ReplyBtnWrapper.setAttribute("tabindex", "0");
    ReplyBtnWrapper.removeAttribute("aria-disabled");
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach((node) => {
        if (
          node.matches &&
          node.querySelector(
            ".public-DraftStyleDefault-block.public-DraftStyleDefault-ltr",
          ) &&
          mutation.target.baseURI !== "https://twitter.com/home"
        ) {
          AddIconToReplyField();
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
});
