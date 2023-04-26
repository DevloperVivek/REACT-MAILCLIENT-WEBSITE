import React, { useState, useEffect } from "react";
import classes from "./Sent.module.css";
import { useSelector } from "react-redux";
import EmailCard from "./EmailCard";

const Sent = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);
  const sentMails = sentEmails.length;

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const email = draftemail.split("@");
        const res = await fetch(
          `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/send.json`
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          let sentEmailsArr = [];

          sentEmailsArr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setSentEmails(sentEmailsArr);
          console.log(sentEmails);
        } else {
          throw new Error("Failed to fetch sent emails");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSentEmails();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  const deleteHandler = async (emailId) => {
    try {
      const res = await fetch(
        `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${emailId}.json`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        console.log("Email deleted successfully");
        setSentEmails(sentEmails.filter((email) => email.id !== emailId));
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

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
                <button onClick={() => deleteHandler(email.id)}>Delete</button>
              </div>
            </div>
          ))}
        {sentEmails.length === 0 && <h2>No emails found</h2>}{" "}
      </div>
      {selectedEmail ? (
        <EmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      ) : null}
    </div>
  );
};

export default Sent;
