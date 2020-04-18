import React from "react";

function Tabela({ children }) {
  return (
    <table className="table is-hoverable is-full-width">
      <tbody>{children}</tbody>
    </table>
  );
}

export default Tabela;
