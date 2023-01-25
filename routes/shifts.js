let express = require("express");
let router = express.Router();
const db = require("../models");
const dateHelper = require("../helper/date.js");
const Shifts = db.shifts;
const Facilities = db.facilities;

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const shifts = await Shifts.findAll({
    include: [
      {
        model: Facilities,
      },
    ],
  });
  res.send(shifts);
});

router.post("/overlap", async (req, res, next) => {
  const { shift1_id, shift2_id } = req.body;
  const validShiftIDErr = "Please enter valid shift IDs";
  if (!shift1_id || !shift2_id) return res.send(validShiftIDErr);

  const shift1 = await Shifts.findOne({ where: { shift_id: shift1_id } });
  const shift2 = await Shifts.findOne({ where: { shift_id: shift2_id } });

  if (!shift1 || !shift2) return res.send(validShiftIDErr);
  const maxOverlapThreshold =
    shift1.facility_id !== shift2.facility_id ? 0 : 30;
  const overlapMinutes = dateHelper.getOverlappingMinutes(shift1, shift2);

  res.send({
    overlap_minutes: overlapMinutes,
    max_overlap_threshold: maxOverlapThreshold,
    exceeds_overlap_threshold: overlapMinutes > maxOverlapThreshold,
  });
});

module.exports = router;
