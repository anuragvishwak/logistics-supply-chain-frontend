import React from "react";

function Fields({ label, field_value, type }) {
  return (
    <div>
      <p className="">{label}</p>
      <input
        type={type}
        onChange={(event) => {
          field_value(event.target.value);
        }}
        className="border p-2 w-full border-gray-300"
      />
    </div>
  );
}

export default Fields;
