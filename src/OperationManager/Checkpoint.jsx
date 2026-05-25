import React, { useState } from "react";

function Checkpoint({
  selected_order,
  getting_orders,
  checkpoints,
  setcheckpoints,
}) {
  function add_checkpoint() {
    setcheckpoints([
      ...checkpoints,
      {
        checkpoint_name: "",
      },
    ]);
  }

  function update_checkpoint(index, value) {
    const updated_checkpoints = [...checkpoints];

    updated_checkpoints[index].checkpoint_name = value;

    setcheckpoints(updated_checkpoints);
  }

  return (
    <div className="border border-gray-400 p-3 mt-5">
      <div className="flex items-center justify-between">
        <p className="text-[#254441] text-lg font-semibold">Add Checkpoints</p>
        <button
          onClick={add_checkpoint}
          className="bg-[#43aa8b] text-sm font-semibold text-white px-4 py-1 rounded"
        >
          Create Checkpoint
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {checkpoints.map((checkpoint, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Checkpoint ${index + 1} Name`}
              value={checkpoint.checkpoint_name}
              onChange={(event) => update_checkpoint(index, event.target.value)}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkpoint;
