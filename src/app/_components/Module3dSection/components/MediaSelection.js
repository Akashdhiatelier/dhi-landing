import React from "react";

function MediaSelection({
  label,
  noOfPreview,
  selected,
  setSelected,
  disabled,
}) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="radio-button-block">
        <label className="radio radio-outline-primary field-radio mb-0">
          <input
            type="radio"
            name="radio1"
            checked={selected}
            disabled={disabled}
            onChange={(e) => setSelected(label)}
          />
          <span>{label}</span>
          <span className="checkmark"></span>
        </label>
        <span>
          {noOfPreview > 0 ? `${noOfPreview} Previews` : "Coming Soon..."}{" "}
        </span>
      </div>
    </div>
  );
}

export default MediaSelection;
