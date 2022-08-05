import type { NextApiRequest, NextApiResponse } from "next";
import getMetaData from "metadata-scraper";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import NextCors from "nextjs-cors";

type Data = {
  success: boolean;
  message: string;
  data?: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // @ts-ignore
  let urls: string[] | null = req.body?.urls || null;

  if (!urls) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: ReasonPhrases.BAD_REQUEST,
    });
  }

  try {
    const data = await Promise.all(urls.map((url) => getMetaData(url)));
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    return res.status(StatusCodes.OK).send({
      success: true,
      message: ReasonPhrases.OK,
      data: data.map((d, i: number) => {
        return {
          url: urls[i],
          title: d.title,
          description: d.description,
          image: d.image,
          icon: d.icon,
          type: d.type || "website",
          language: d.language || "oth",
        };
      }),
    });
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.NOT_FOUND).send({
      success: false,
      message: ReasonPhrases.NOT_FOUND,
    });
  }
}
