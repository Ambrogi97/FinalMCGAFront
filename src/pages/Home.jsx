import styles from "./styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className="team">
        <h1>Team</h1>
        <p>Juan Ambrogi</p>
        <p>John Doe</p>
        <p>John Smith</p>
      </div>
      <div className="image">
        <img src="http://unsplash.it/400/400/" alt="hero" />
      </div>
    </div>
  );
};
export default Home;
