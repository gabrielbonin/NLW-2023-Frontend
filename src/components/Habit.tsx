interface HabitProps {
  completed: number;
}

export function Habit({ completed }: HabitProps) {
  return (
    <div className="bg-zinc-300 w-10 h-10 text-blue rounded m-2 text-center flex items-center justify-center">
      {completed}
    </div>
  );
}
