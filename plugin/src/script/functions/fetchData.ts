import axios from "axios";

export default async function fetchLinkData(links: string[]) {
  if (links.length < 1) {
    return [];
  }
  try {
    var response = await axios.post(
      "https://link-previewer.anishroy.me/api/getLinkDataInBatch",
      { urls: links }
    );
    return response.data.data;
  } catch (e) {
    return [];
  }
}
