import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const signMeUp = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [sendProcessing, setSendProcessing] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  function sendEmailToBackend() {
    setSendProcessing(true);
    new Promise(function(resolve) {
      setTimeout(function() {
        setSendProcessing(false);
        resolve();
        alert("signing up to back end");
      }, 3000);
    });
  }

  const buttonText = sendProcessing ? "processing..." : "Get Updates";
  return (
    <div className="container">
      <br />
      <div>
        <input
          value={email}
          onChange={e => {
            const inputFieldValue = e.target.value;
            const emailValid = validateEmail(inputFieldValue);
            setEmailValid(emailValid);
            setHistoryList([
              ...historyList,
              { email: e.target.value, emailValid }
            ]);
            return setEmail(e.target.value);
          }}
          placeholder="Enter Email"
          type="email"
          name="email"
          required
        />
        &nbsp;
        <button
          disabled={!emailValid || sendProcessing}
          className="btn"
          onClick={sendEmailToBackend}
          type="submit"
        >
          {buttonText}
        </button>
      </div>
      <hr />
      <h2>State Updates</h2>

      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>Current STATE</th>
            <th>Is Email Valid?</th>
          </tr>
        </thead>
        {historyList.map(function(rec) {
          return (
            <tr>
              <td className="small">{rec.emailValid ? "true" : "false"}</td>
              <td className="small">{rec.email}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default signMeUp;
