import { Button } from "~/components/Button";
import type { Route } from "./+types/home";

export function loader() {
  return { name: "Dear candidate" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl">Hello, {loaderData.name}</h1>
        <Button
            label="Click Me"
            variant="contained"
            onClick={ () => alert("Button clicked!") }
        />
    </div>
  );
}
