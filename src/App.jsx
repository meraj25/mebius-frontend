import Navigation from "./components/Navigation"
import HeroGrid from "./components/HeroGrid"
import CasualInspirations from "./components/CasualInspiration"
import TrendingSection from "./components/TrendingSection"

const App = () => {
 

  return (
<>


<main className="flex flex-col gap-8 md:gap-12 pb-8">
     <Navigation />
     <HeroGrid />
      <CasualInspirations />
//       <TrendingSection />
      </main>

</>
  )
}

export default App;
//      