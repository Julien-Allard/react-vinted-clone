import Hero from "../components/Hero";
import Items from "../components/Items";

const Home = ({ search, token }) => {
  return (
    <>
      <Hero token={token} />
      <Items search={search} />
    </>
  );
};

export default Home;
