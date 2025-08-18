import React from "react";
import Link from "next/link";
import "./sectionheader.css"; // Import the CSS file

export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="subHeader">{subHeader}</h3>
      <h2 className="mainHeader">{mainHeader}</h2>
    </>
  );
}
