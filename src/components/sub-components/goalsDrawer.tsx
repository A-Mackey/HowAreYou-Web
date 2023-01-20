import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { APIProvider } from "../../context/APIContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Goals from "./goals";
import Loading from "./loading";

function GoalsDrawer(props: any) {
  const { windowWidth } = useWindowDimensions();

  const { getUserGoals } = APIProvider();

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);

  useEffect(() => {
    hydrateGoals();
    updateHandle(open);
  }, []);

  const hydrateGoals = async () => {
    setLoading(true);
    setGoals(await getUserGoals());
    setLoading(false);
  };

  const toggleDrawer = (direction?: boolean) => {
    const menuStatus: boolean = direction ? direction : !open;
    setOpen(menuStatus);
    updateHandle(menuStatus);
  };

  const updateHandle = (positionOpen: boolean) => {
    document.getElementById("goals-drawer-handle")!.style.left = positionOpen
      ? "calc(100vw - 410px)"
      : "calc(100vw - 110px)";
  };

  const sideNavRef = (
    <div className="goals-drawer-body">
      {loading ? (
        <Loading />
      ) : (
        <div className="goals-drawer-info">
          <h2>Goals</h2>
          <Goals goals={goals} />
        </div>
      )}
    </div>
  );

  return windowWidth > 1070 ? (
    sideNavRef
  ) : (
    <div className="goals-drawer">
      {windowWidth <= 1070 && (
        <div
          onClick={() => toggleDrawer()}
          id="goals-drawer-handle"
          className="goals-drawer-close">
          <img src="/icons/OpenArrowLeft.svg" alt="arrow-right" />
        </div>
      )}
      <Drawer anchor={"right"} open={open} onClose={() => toggleDrawer(false)}>
        {sideNavRef}
      </Drawer>
    </div>
  );
}

export default GoalsDrawer;
