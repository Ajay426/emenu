import "./About.css"

export default function About(){
  return (
    <div className="about-page">

      <div className="about-hero">
        <h1>About One Restro</h1>
        <p>Serving happiness on every plate </p>
      </div>

      <div className="about-container">

        <div className="about-card">
          <h2>Our Story</h2>
          <p>
            One Restro started with a simple idea — make food ordering 
            easy, fast and beautiful.  
            We believe great food deserves a great digital experience.
          </p>
        </div>

        <div className="about-grid">

          <div className="info-box">
            <h3> Quality Food</h3>
            <p>Fresh ingredients and authentic recipes prepared daily.</p>
          </div>

          <div className="info-box">
            <h3> Fast Service</h3>
            <p>Quick ordering and instant menu updates.</p>
          </div>

          <div className="info-box">
            <h3> Smart System</h3>
            <p>Modern dashboard for easy menu management.</p>
          </div>

        </div>

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To simplify restaurant management and provide customers
            a smooth digital menu experience across all devices.
          </p>
        </div>

      </div>
    </div>
  )
}