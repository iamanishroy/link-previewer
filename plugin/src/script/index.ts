import fetchLinkData from "./functions/fetchData";
import getHash from "./functions/getHash";
import LinkPreviewCard from "./LinkPreviewCard";

var CSS_URL =
  "https://cdn.jsdelivr.net/npm/link-preview-card@1.0.1/dist/style/styles.css";

// var CSS_URL = "../dist/style/styles.css";

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
  for (var i = 0; i < linkData.length; i++) {
    var data = linkData[i];
    LinkPreviewCard.store[getHash(data.url)] = data;
  }
  aTags.forEach((aTag) => {
    new LinkPreviewCard(aTag);
  });
})();

function importStyles(): void {
  var link = document.createElement("link");
  link.href = CSS_URL;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}
