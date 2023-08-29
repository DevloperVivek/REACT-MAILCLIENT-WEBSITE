import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmailCard from "./EmailCard";
// import useHttp from "../../../../hooks/use-http";
import useHttp from "../../hooks/use-http";
import classes from "./Sent.module.css";

const Sent = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);
  const sentMails = sentEmails.length;
  const email = draftemail.split("@");
  const sendUrl = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`;

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Custom Hook useHttp
  const { sendRequest, sendDeleteRequest } = useHttp();

  const fetchSentEmails = async () => {
    try {
      const data = await sendRequest(sendUrl);
      if (data) {
        const sentEmailsArr = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setSentEmails(sentEmailsArr);
      } else {
        setSentEmails([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSentEmail = async (emailId) => {
    const dlt = draftemail.split("@");
    const url = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${dlt[0]}/send/${emailId}.json`;
    try {
      const data = await sendDeleteRequest(url);
      console.log(`Email deleted successfully: ${data}`);
      setSentEmails(sentEmails.filter((email) => email.id !== emailId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSentEmails();
  }, []);

  return (
    <div className={classes.InboxContainer}>
      <h3>SentBox ({sentMails})</h3>
      <div className={classes.EmailsContainer}>
        {sentEmails.length > 0 &&
          sentEmails.map((email) => (
            <div key={email.id}>
              <div className={classes.EmailItem}>
                <h4>To: {email.to}</h4>
                <p>Date: {getSimplifiedDate(email.date)}</p>
                <button onClick={() => handleEmailClick(email)}>Open</button>
                <button onClick={() => deleteSentEmail(email.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        {sentEmails.length === 0 && <h3>No emails found</h3>}{" "}
      </div>
      {selectedEmail ? (
        <EmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      ) : null}
    </div>
  );
};

export default Sent;
