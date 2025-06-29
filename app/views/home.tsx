import type { Route } from "./+types/home";
import { TaskList } from "~/components/features/tasks/TaskList";

export function loader() {
  return { name: "Dear candidate" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className='min-w-xl'>
      <TaskList />
    </div>
  );
}
