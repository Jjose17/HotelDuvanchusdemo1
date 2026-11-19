import DemoOne from "./demos/DemoOne";
import DemoTwo from "./demos/DemoTwo";

export default function App() {
  const demo = new URLSearchParams(window.location.search).get("demo");
  return demo === "1" ? <DemoOne /> : <DemoTwo />;
}
