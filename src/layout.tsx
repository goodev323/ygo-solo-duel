import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div
    style={{
      display: "grid",
      width: "100vw",
      height: "100vh",
      gridTemplateColumns: "50px 1fr",
      gridTemplateRows: "50px 1fr 100px",
      gridTemplateAreas: `"header header"\n"nav main"\n"footer footer"`,
      gap: 20,
    }}
  >
    <header style={{ gridArea: "header", backgroundColor: "lightblue" }}>Header</header>
    <nav style={{ gridArea: "nav", backgroundColor: "lightyellow" }}>nav bar</nav>
    <main style={{ gridArea: "main" }}>
      <Outlet />
    </main>
    <footer style={{ gridArea: "footer", backgroundColor: "lightblue" }}>footer</footer>
  </div>
);
