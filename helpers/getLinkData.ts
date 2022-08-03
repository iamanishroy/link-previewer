import axios from "axios";
import { StatusCodes } from "http-status-codes";

export default async function getLinkData(link: string) {
  return await axios
    .get("./api/getLinkData/?url=" + link)
    .then((response) => {
      if (response.status === StatusCodes.OK) {
        return response.data;
      }
      return null;
    })
    .catch((e) => {
      return null;
    });
}
