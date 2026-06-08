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
  borderLine: {
    borderTop: "1px solid rgba(255, 255, 255, 0.2)", 
    margin: "20px 0",
  },
  iconLink: {
    color: "white",            
    textDecoration: "none",  
    cursor: "pointer",       
    display: "inline-block",
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
        <a href="https://www.facebook.com/" style={footerStyles.iconLink} title="Facebook">
          <i className="fa-brands fa-square-facebook"></i>
        </a>
        
        
        <a href="https://x.com/" style={footerStyles.iconLink} title="Twitter">
          <i className="fa-brands fa-square-twitter"></i>
        </a>
        
       
        <a href="https://instagram.com" style={footerStyles.iconLink} title="Instagram">
          <i className="fa-brands fa-instagram"></i>
        </a>

       
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" style={footerStyles.iconLink} title="youtube">
          <i className="fa-brands fa-youtube"></i>
        </a>
      </div>
      <div style={footerStyles.borderLine}></div>
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