import React from "react";
import AppLayout from "./Components/layout";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <AppLayout />
    </div>
  </QueryClientProvider>
);

export default App;
