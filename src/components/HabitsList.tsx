import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface IHabitProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    createdAt: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: IHabitProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((res) => {
        console.log(res.data);
        setHabitsInfo(res.data);
      });
  }, []);

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo?.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (habit) => habit !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChange(completedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habits) => {
        return (
          <Checkbox.Root
            onCheckedChange={() => handleToggleHabit(habits.id)}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
            key={habits.id}
            disabled={isDateInPast}
            checked={habitsInfo.completedHabits.includes(habits.id)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={24} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habits.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
