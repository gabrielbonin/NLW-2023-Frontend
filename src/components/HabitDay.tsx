import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";

import { HabitsList } from "./HabitsList";
import { ProgressBar } from "./ProgressBar";
interface IHabitProps {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: IHabitProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  function handleCompletedChange(completed: number) {
    console.log(completed);
    setCompleted(completed);
  }

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");
  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          className={clsx(
            "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background",
            {
              "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            },
            {
              "bg-violet-900 border border-violet-700":
                completedPercentage > 0 && completedPercentage < 20,
            },
            {
              "bg-violet-800 border border-violet-600":
                completedPercentage >= 20 && completedPercentage < 40,
            },
            {
              "bg-violet-600 border border-violet-500":
                completedPercentage >= 40 && completedPercentage < 60,
            },
            {
              "bg-violet-600 border border-violet-500":
                completedPercentage >= 60 && completedPercentage < 80,
            },
            {
              "bg-violet-500 border border-violet-400":
                completedPercentage >= 80,
            }
          )}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChange={handleCompletedChange} />

          <Popover.Arrow className="fill-zinc-900" height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
