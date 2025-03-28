import { Routes, Route } from "react-router-dom";
import { Theme } from "./Theme"
import { SkeletonTheme } from "react-loading-skeleton";
import { MenuContextProvider } from "./context/MenuContext";
import { CartContextProvider } from "./context/CartContext";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  return (
    <MenuContextProvider>
      <CartContextProvider>
        <Theme>
        <SkeletonTheme baseColor="#202020" highlightColor="#445">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </SkeletonTheme>
        </Theme>
      </CartContextProvider>
    </MenuContextProvider>
  );
}

export default App;
