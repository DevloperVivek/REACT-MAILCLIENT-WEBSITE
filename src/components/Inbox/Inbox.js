import React, { useState, useEffect } from "react";
import classes from "./Inbox.module.css";
import { useSelector } from "react-redux";
import EmailCard from "./EmailCard";

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null); // Add state for selected email

  const [emails, setEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const emailId = draftemail.split("@")[0];
        console.log(emailId);
        const res = await fetch(
          `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${emailId}/receive.json`
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const emailsArr = [];

          for (const key in data) {
            emailsArr.push({ id: key, ...data[key] });
          }

          setEmails(emailsArr);
        } else {
          throw new Error("Failed to fetch emails");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmails();
  }, [draftemail]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  return (
    <div className={classes.InboxContainer}>
      <h3>Inbox</h3>
      <div className={classes.EmailsContainer}>
        {emails.length > 0 ? (
          emails.map((email) => (
            <div
              key={email.id}
              className={classes.EmailItem}
              onClick={() => handleEmailClick(email)}
            >
              <h4>From: {email.from}</h4>
              {/* <h5>Subject: {email.subject}</h5> */}
              {/* <p>Body: {email.edit}</p> */}
              <p>Date: {email.data}</p>
              <p>Read: {email.isRead ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>No emails found</p>
        )}
      </div>
      {selectedEmail ? (
        <EmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      ) : null}
      {/* {selectedEmail && ( // Render the Editor component when an email is selected
        <Editor
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)} // Add close event handler
        />
      )} */}
    </div>
  );
};

export default Inbox;
