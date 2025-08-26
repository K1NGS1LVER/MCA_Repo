import React from "react";
// import "../css/feedback.css";

const Feedback = () => (
  <div className="feedback-container">
    <h2>Feedback</h2>
    <form>
      <textarea
        className="feedback-textarea"
        rows={5}
        placeholder="Your feedback..."
      ></textarea>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
);

export default Feedback;
