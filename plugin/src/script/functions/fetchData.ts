import axios from "axios";

export default async function fetchLinkData(links: string[]) {
  if (links.length < 1) {
    return [];
  }
  try {
    var response = await axios.post(
      "http://localhost:3000/api/getLinkDataInBatch",
      { urls: links }
    );
    return response.data.data;
  } catch (e) {
    return [];
  }
}
