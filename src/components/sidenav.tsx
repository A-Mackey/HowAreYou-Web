import Button from "./sub-components/navButton";

function SideNav(_props: any) {
  return (
    <div className="sidenav-container">
      <div className="sidenav-section-1">
        <img src="./icons/TempLogo.svg" alt="Logo" className="sidenav-logo" />
      </div>

      <div className="sidenav-section-2">
        <Button text="+" onClick={() => {}} primary={true} icon={false} />

        <Button
          text="./icons/BurgerIcon.svg"
          onClick={() => {}}
          primary={false}
          icon={true}
        />

        <Button
          text="./icons/ArrowIcon.svg"
          onClick={() => {}}
          primary={false}
          icon={true}
        />
      </div>

      <div className="sidenav-section-3">Footer</div>
    </div>
  );
}

export default SideNav;
