import React from "react";

export default function Problem() {
  const data = [
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=300&q=80",
      text: "Hunger kills more people each year than AIDS, malaria and terrorism combined",
      color: "#198754",
    },
    {
      image: "https://robinhoodarmy.com/_next/image?url=%2Fmain%2Fimages%2Fsections%2Fproblem%2F02-child-hunger-death-200x200.jpg&w=384&q=75",
      text: "Every 10 seconds, a child dies from hunger",
      color: "#b8b8b8",
    },
    {
      image: "https://robinhoodarmy.com/_next/image?url=%2Fmain%2Fimages%2Fsections%2Fproblem%2F03-food-surplus-countries-200x200.jpg&w=384&q=75",
      text: "82% of hungry people live in countries with food surpluses, not food shortages",
      color: "#198754",
    },
    {
      image: "https://robinhoodarmy.com/_next/image?url=%2Fmain%2Fimages%2Fsections%2Fproblem%2F04-night-hunger-200x200.jpg&w=384&q=75",
      text: "One in every eight people sleeps hungry each night",
      color: "#b8b8b8",
    },
    {
      image: "https://robinhoodarmy.com/_next/image?url=%2Fmain%2Fimages%2Fsections%2Fproblem%2F05-food-waste-global-200x200.jpg&w=384&q=75",
      text: "One-third of the food produced around the world is never consumed",
      color: "#198754",
    },
    {
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=300&q=80",
      text: "850 million hungry people in the world",
      color: "#b8b8b8",
    },
  ];

  return (
    <section
      style={{
        padding: "60px 20px", // Padding reduced for small screens
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1100px",
        margin: "0 auto",
        boxSizing: "border-box"
      }}
    >
      {/* Heading */}
      <h1
        style={{
          color: "#198754",
          textAlign: "center",
          fontSize: "clamp(28px, 5vw, 40px)", // Responsive Font Size (Mobile pe chhota, Laptop pe bada)
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        The Problem
      </h1>

      <p
        style={{
          color: "#198754",
          textAlign: "center",
          fontSize: "clamp(15px, 2vw, 18px)", // Responsive Subtitle Font
          maxWidth: "850px",
          margin: "0 auto 50px",
          lineHeight: "1.6",
        }}
      >
        The challenge is not a lack of food — it is making food consistently
        available to everyone who needs it.
      </p>

      {/* Fully Responsive Grid Layout */}
      <div
        style={{
          display: "grid",
          // auto-fit matches layout dynamically based on available width
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          columnGap: "30px",
          rowGap: "50px",
          justifyContent: "center",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Circular Image */}
            <img
              src={item.image}
              alt=""
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #0d5c3d",
                marginBottom: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            />

            {/* Text */}
            <p
              style={{
                color: item.color,
                fontSize: "14px",
                lineHeight: "1.6",
                maxWidth: "260px",
                margin: "0 auto",
                fontWeight: item.color === "#198754" ? "600" : "400",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}