import { FC } from "react";
import { Providers } from "./contexts";
import { ApplicationRouter } from "./pages";

const App: FC = () => (
  <Providers>
    <ApplicationRouter />
  </Providers>
);
export default App;
