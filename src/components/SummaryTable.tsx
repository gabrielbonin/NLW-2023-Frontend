import generateDatesFromYearBeginning from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
  date: string;
  completed: number;
  amount: number;
  id: string;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);
  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

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
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });
            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

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
