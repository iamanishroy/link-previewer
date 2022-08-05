import axios from "axios";
import getHash from "../functions/getHash";
import getHTMLDetails from "../functions/template";
// import { v4 as uuid } from "uuid";

export default class LinkPreviewCard {
  static store: Object = {};
  elem: HTMLAnchorElement;
  cardElement: HTMLDivElement;
  url: string;
  sid: string;

  constructor(element: HTMLAnchorElement) {
    this.elem = element;
    var url = this.elem.getAttribute("href");
    if (!url) {
      return;
    }
    this.url = url;
    this.sid = getHash(this.url);
    this.activate();
  }

  async activate() {
    this.setCard();
    var data = await this.getDetails();
    if (data && this.minimumDataAvailable(data)) {
      this.hydrateCard(data);
    } else {
      this.hydrateError();
    }
  }

  async getDetails() {
    console.log(this.sid, LinkPreviewCard.store[this.sid]);
    if (Object.keys(LinkPreviewCard.store).includes(this.sid)) {
      return LinkPreviewCard.store[this.sid];
    } else {
      var details = await this.fetchDetails();
      if (
        details &&
        details.success &&
        this.minimumDataAvailable(details.data)
      ) {
        LinkPreviewCard.store[this.sid] = details.data;
        return details.data;
      }
      return this.hydrateError();
    }
  }

  setCard() {
    var html_ = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

    this.cardElement = document.createElement("div");
    this.cardElement.classList.add("loading");
    this.cardElement.classList.add("__linkPreview_card");

    this.cardElement.innerHTML = html_;
    this.elem.innerHTML = "";
    this.elem.style.textDecoration = "none";
    this.cardElement.style.boxShadow = "0px 0px 24px 0px pink";
    this.elem.appendChild(this.cardElement);
  }

  async fetchDetails() {
    try {
      var urlData = await axios.get(
        `https://link-previewer.anishroy.me/api/getLinkData/?link=${this.url}`
      );
      return urlData.data;
    } catch (err) {
      return false;
    }
  }

  minimumDataAvailable(data: {
    image?: string;
    title: string;
    icon: string;
    description: string;
    owner: string;
    language: string;
    type: string;
  }) {
    if (data.title && data.title.trim() === "") return false;
    if (data.description && data.description.trim() === "") return false;
    if (data.icon && data.icon.trim() === "") return false;
    return true;
  }
  hydrateCard(data: {
    image?: string;
    title: string;
    icon: string;
    description: string;
    owner: string;
    language: string;
    type: string;
  }) {
    if (this.cardElement) {
      this.cardElement.classList.remove("loading");
      this.cardElement.innerHTML = getHTMLDetails(data, {
        image: data.image ? true : false,
        extra: data.type ? true : false,
      });
    }
  }
  hydrateError() {
    if (this.cardElement) {
      this.cardElement.classList.remove("loading");
      this.cardElement.innerHTML = `<b>could not fetch data</b>`;
    }
  }
}
