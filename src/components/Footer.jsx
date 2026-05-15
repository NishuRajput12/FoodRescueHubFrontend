const footerStyles = {
    container: {
      backgroundColor: "rgb(0, 128, 73)",
      color: "white",
      textAlign: "center",
      padding: "30px 20px",
      marginTop: "50px",
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    socials: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      fontSize: "1.5rem",
      marginBottom: "15px",
    },
    copy: {
      margin: "10px 0",
      fontSize: "0.9rem",
    },
    links: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
      marginTop: "10px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    linkHover: {
      textDecoration: "underline",
    },
  };
  
  export default function Footer() {
    return (
      <div style={footerStyles.container}>
        <div style={footerStyles.socials}>
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
  
        <div style={footerStyles.copy}>
          &copy; 2026 Food Rescue Hub || All Rights Reserved
        </div>
  
        <div style={footerStyles.links}>
          <a href="/privacy" style={footerStyles.link}>
            Privacy
          </a>
          <a href="/terms" style={footerStyles.link}>
            Terms
          </a>
          <a href="/sitemap" style={footerStyles.link}>
            Sitemap
          </a>
          <a href="/company-details" style={footerStyles.link}>
            Company Details
          </a>
        </div>
      </div>
    );
  }