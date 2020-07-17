import {Router} from "express";
import {ObjectID} from "mongodb";

import {asyncHandler} from "../async-handler";
import {db} from "../database";
import {sendErrorResponse} from "../error-response";

import {COLLECTTION_NAME as STATS_COLLECTTION_NAME} from "./stats-routes";

const COLLECTTION_NAME = "stress-test";
const router = Router();

router
  .route("/")
  .get(asyncHandler(getAllStressTest))
  .post(asyncHandler(createStressTest))
  .put(asyncHandler(updateStressTest));

router
  .route("/:id")
  .get(asyncHandler(getStressTest))
  .put(asyncHandler(updateStressTest))
  .delete(asyncHandler(deleteStressTest));

router.route("/:id/stats").get(asyncHandler(getTestStats));

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function getStressTest(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    sendErrorResponse(res, 400, "Invalid id");
    return;
  }
  const result = await db()
    .collection(COLLECTTION_NAME)
    .findOne({_id: ObjectID(req.params.id)});
  if (result === null) {
    sendErrorResponse(res, 404, "Stress test not found");
  } else {
    res.json(result);
  }
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function updateStressTest(req, res) {
  const body = req.body;
  const id = req.params.id || body._id;
  if (!ObjectID.isValid(id)) {
    sendErrorResponse(res, 400, "Invalid or missing id");
    return;
  }

  delete body._id;

  const result = await db()
    .collection(COLLECTTION_NAME)
    .findOneAndReplace({_id: ObjectID(id)}, body);
  if (result.value === null) {
    sendErrorResponse(res, 404, "Stress test not found");
  } else {
    // result.value is the old value before the update therefore return no body
    res.status(200).end();
  }
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function deleteStressTest(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    sendErrorResponse(res, 400, "Invalid id");
    return;
  }
  const result = await db()
    .collection(COLLECTTION_NAME)
    .findOneAndDelete({_id: ObjectID(req.params.id)});
  if (result.value === null) {
    sendErrorResponse(res, 404, "Stress test not found");
  } else {
    res.status(200).end();
  }
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function createStressTest(req, res) {
  const result = await db().collection(COLLECTTION_NAME).insertOne(req.body);
  res.json({_id: result.insertedId});
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function getTestStats(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    sendErrorResponse(res, 400, "Invalid id");
    return;
  }

  const result = await db()
    .collection(STATS_COLLECTTION_NAME)
    .find({stressTestId: req.params.id})
    .toArray();

  res.attachment("all-stats.json");
  res.json(result);
}

/**
 * @param {import("express").Request} req request
 * @param {import("express").Response} res response
 */
async function getAllStressTest(_, res) {
  const result = await db().collection(COLLECTTION_NAME).find().toArray();
  res.json(result);
}

export default router;
