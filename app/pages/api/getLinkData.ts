import type { NextApiRequest, NextApiResponse } from "next";
import getMetaData from "metadata-scraper";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

type Data = {
  success: boolean;
  message: string;
  data?: Object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // @ts-ignore
  const url: string | null = req.query?.url || null;

  if (!url) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: ReasonPhrases.BAD_REQUEST,
    });
  }
  try {
    const data = await getMetaData(url);

    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    return res.status(StatusCodes.OK).send({
      success: true,
      message: ReasonPhrases.OK,
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        icon: data.icon,
        type: data.type || "website",
        language: data.language || "oth",
      },
    });
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).send({
      success: false,
      message: ReasonPhrases.NOT_FOUND,
    });
  }
}
