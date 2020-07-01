import {Router} from "express";

import {asyncHandler} from "../async-handler";
import {db} from "../database";

const router = Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const result = await db().collection("stress-test").insertOne({foo: 123});
    console.log(`Inserted ID ${result.insertedId}`);

    const deletedResult = await db().collection("stress-test").deleteMany({foo: 123});
    console.log(`Deleted ${deletedResult.deletedCount}`);

    res.json({id: req.params.id});
  })
);

export default router;
