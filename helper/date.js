const {
  areIntervalsOverlapping,
  differenceInMinutes,
  min,
  max,
  isEqual,
  addDays,
  getHours,
  getDate,
  format
} = require("date-fns");

/**
 *
 * @param shift_date
 * @param time
 * @returns {Date} returns full Date given a Shift and a specific time
 */
const getFullDateTime = ({ shift_date, time }) => {
  return new Date(`${shift_date.toString()} ${time ?? ""}`);
};



/**
 *
 * @param shift1 Left Shift
 * @param shift2 Right Shift
 * @returns {number} Amount of overlapping minutes. Returns 0 if there is no overlap.
 */
const getOverlappingMinutes = (shift1, shift2) => {
  const date1 = getDate(getFullDateTime({ shift_date: shift1.shift_date }));
  const date2 = getDate(getFullDateTime({ shift_date: shift2.shift_date }));
  const dateDiff = Math.abs(date1 - date2);

  if (dateDiff > 1) return 0;

  const leftStartHour = getHours(
    getFullDateTime({ shift_date: date1, time: shift1.start_time })
  );
  const leftEndHour = getHours(
    getFullDateTime({ shift_date: date1, time: shift1.end_time })
  );

  const rightStartHour = getHours(
    getFullDateTime({ shift_date: date2, time: shift2.start_time })
  );
  const rightEndHour = getHours(
    getFullDateTime({ shift_date: date2, time: shift2.end_time })
  );

  const startLeft = getFullDateTime({
    shift_date: shift1.shift_date,
    time: shift1.start_time,
  });
  const endLeft = getFullDateTime({
    shift_date:
      leftStartHour <= leftEndHour
        ? shift1.shift_date
        : format(addDays(new Date(shift1.shift_date), 2), "yyyy-MM-dd"),
    time: shift1.end_time,
  });

  const startRight = getFullDateTime({
    shift_date: shift2.shift_date,
    time: shift2.start_time,
  });
  const endRight = getFullDateTime({
    shift_date:
      rightStartHour <= rightEndHour
        ? shift2.shift_date
        : format(addDays(new Date(shift2.shift_date), 2), "yyyy-MM-dd"),
    time: shift2.end_time,
  });


  const rangeLeft = { start: startLeft, end: endLeft };
  const rangeRight = { start: startRight, end: endRight };

  console.log({ rangeLeft, rangeRight });

  if (!areIntervalsOverlapping(rangeLeft, rangeRight)) return 0;
  else {
    if (isEqual(startLeft, startRight)) {
      return isEqual(max([endLeft, endRight]), endLeft)
        ? differenceInMinutes(endLeft, endRight)
        : differenceInMinutes(endRight, endLeft);
    } else {
      return isEqual(min([startLeft, startRight]), startLeft)
        ? differenceInMinutes(endLeft, startRight)
        : differenceInMinutes(endRight, startLeft);
    }
  }
};

module.exports = {
  getOverlappingMinutes,
};
