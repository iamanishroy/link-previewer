import fetchLinkData from "./functions/fetchData";
import getHash from "./functions/getHash";
import LinkPreviewCard from "./LinkPreviewCard";

var CSS_URL = "./../dist/style/styles.css";

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
  linkData.forEach((data) => {
    LinkPreviewCard.store[getHash(data.url)] = data;
  });
  console.log(LinkPreviewCard.store);
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
