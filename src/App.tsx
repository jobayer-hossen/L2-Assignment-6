import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <>
      <CommonLayout>
        <div className="max-w-7xl mx-auto md:px-16 mt-10 px-4">
          <Outlet />
        </div>
      </CommonLayout>
    </>
  );
}

export default App;
