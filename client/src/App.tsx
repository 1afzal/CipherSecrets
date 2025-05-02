import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import AlgorithmDetail from "@/pages/AlgorithmDetail";
import Playground from "@/pages/Playground";
import Compare from "@/pages/Compare";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/algorithm/:id" component={AlgorithmDetail} />
          <Route path="/playground" component={Playground} />
          <Route path="/compare" component={Compare} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return <Router />;
}

export default App;
