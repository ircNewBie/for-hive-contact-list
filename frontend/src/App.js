import React from "react";
import AppLayout from "./Components/Layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <AppLayout />
    </div>
  </QueryClientProvider>
);

export default App;
