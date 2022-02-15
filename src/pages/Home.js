import Hero from "../components/Hero";
import Items from "../components/Items";

const Home = ({ search, token, sort }) => {
  return (
    <>
      <Hero token={token} />
      <Items search={search} sort={sort} />
    </>
  );
};

export default Home;
