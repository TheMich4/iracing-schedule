"use server";

import { getCars } from "~/server/api/content/get-cars";

const getCarsHandler = async (req, res) => {
  const cars = await getCars();

  return res.send({ status: 200, cars });
};

export default getCarsHandler;
