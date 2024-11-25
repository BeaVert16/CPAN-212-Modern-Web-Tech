import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to My Website</h1>
        <p>Your one-stop solution for amazing content.</p>
      </header>

      <section className="home-content">
        <div className="home-card">
          <h2>About Us</h2>
          <p>Learn more about our mission and values.</p>
        </div>
        <div className="home-card">
          <h2>Services</h2>
          <p>Check out the services we offer to help you succeed.</p>
        </div>
        <div className="home-card">
          <h2>Contact</h2>
          <p>Get in touch with us for more information.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 My Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
