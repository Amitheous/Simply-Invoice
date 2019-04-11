import React from "react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer bg-success text-white text-uppercase py-4 text-center mt-auto">
      Copyright &copy; {new Date().getFullYear()}
      Simply Invoice{" "}
    </footer>
  );
}
