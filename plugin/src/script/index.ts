import fetchLinkData from "./functions/fetchData";
import getHash from "./functions/getHash";
import LinkPreviewCard from "./LinkPreviewCard";

var CSS_URL =
  "https://cdn.jsdelivr.net/npm/link-preview-card@0.0.2/dist/style/styles.css";

(async () => {
  // @ts-ignore
  var aTags: HTMLAnchorElement[] = document.querySelectorAll(
    "a[link-preview-card]"
  );
  // if any then import css
  if (aTags.length > 0) {
    importStyles();
  }

  var linkData = await fetchLinkData([
    ...new Set([...aTags].map((aTag) => aTag.href)),
  ]);

  await setData(linkData);
  setTimeout(() => {
    aTags.forEach((aTag) => {
      new LinkPreviewCard(aTag);
    });
  }, 5000);
})();

async function setData(linkData) {
  for (var i = 0; i < linkData.length; i++) {
    var data = linkData[i];
    LinkPreviewCard.store[getHash(data.url)] = data;
  }
}
function importStyles(): void {
  var link = document.createElement("link");
  link.href = CSS_URL;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}
