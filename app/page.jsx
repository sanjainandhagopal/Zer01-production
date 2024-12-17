import Image from "next/image";
import Login from "./Login/page";
import Index from "./Index/page";
import NavigationBar from "./NavigationBar/page";

export default function Home() {
  return (
    <div>
      <NavigationBar/>
      {/* <Login /> */}
      <Index/>
    </div>
  );
}
