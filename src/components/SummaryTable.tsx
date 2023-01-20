import generateDatesFromYearBeginning from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap=3">
        {weekDays.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center font-bold justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}

        {amountOfDaysToFill > 0 &&
          Array.from({
            length: amountOfDaysToFill,
          }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 cursor-not-allowed opacity-40 bg-zinc-900 border-2 border-zinc-800 rounded-lg"
              />
            );
          })}
      </div>
    </div>
  );
}

export default SummaryTable;
