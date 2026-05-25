import React from "react";

function Textarea({ label, field_value }) {
  return (
    <div>
      <p className="">{label}</p>
      <textarea
        onChange={(event) => {
          field_value(event.target.value);
        }}
        className="border p-2 h-24  w-full border-gray-300"
      />
    </div>
  );
}

export default Textarea;
