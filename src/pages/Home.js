import Hero from "../components/Hero";
import Items from "../components/Items";

const Home = ({ search }) => {
  return (
    <>
      <Hero />
      <Items search={search} />
    </>
  );
};

export default Home;
