import Meebit from "../assets/meebit.png";

function MobileDefault() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="flex justify-center">
          <img src={Meebit} style={{ height: 400 }} alt="MEEVIEW" />
        </div>
        <div className="w-auto">
          <p className="text-lg text-center font-nimbus">
            Meeview is best experienced on desktop!
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileDefault;
