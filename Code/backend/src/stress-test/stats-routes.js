import {Router} from "express";
import {ObjectID} from "mongodb";

import {asyncHandler} from "../async-handler";
import {db} from "../database";
import {sendErrorResponse} from "../error-response";

const COLLECTTION_NAME = "stats";
const router = Router();

router.route("/").post(asyncHandler(saveRecords));
router.route("/:id").put(asyncHandler(updateRecord)).get(asyncHandler(getRecord));

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function saveRecords(req, res) {
  const result = await db().collection(COLLECTTION_NAME).insertOne(req.body);
  res.json({_id: result.insertedId});
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function updateRecord(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    sendErrorResponse(res, 400, "Invalid or missing id");
    return;
  }

  const result = await db()
    .collection(COLLECTTION_NAME)
    .updateOne({_id: ObjectID(req.params.id)}, {$push: {screens: req.body}});
  if (result.value === null) {
    sendErrorResponse(res, 404, "Stats not found");
  } else {
    // result.value is the old value before the update therefore return no body
    res.status(200).end();
  }
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function getRecord(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    sendErrorResponse(res, 400, "Invalid id");
    return;
  }
  const result = await db()
    .collection(COLLECTTION_NAME)
    .findOne({_id: ObjectID(req.params.id)});
  if (result === null) {
    sendErrorResponse(res, 404, "Stats not found");
  } else {
    res.attachment("result.json");
    res.json(result);
  }
}

export default router;
