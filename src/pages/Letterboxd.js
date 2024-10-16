import Navigation from "../components/navbar/Navigation";
import Empty from "../components/Empty";

const Letterboxd = () => {
  return (
    <>
      <Navigation title="Letterboxd" />
      <section className="letterboxd flex">
        <Empty header="Letterboxd Watchlist" body="Coming Soon!" />
      </section>
    </>
  );
}
export default Letterboxd;