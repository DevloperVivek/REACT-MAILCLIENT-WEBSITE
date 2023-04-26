import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmailCard from "./EmailCard";
import { useNavigate } from "react-router-dom";
import classes from "./Sent.module.css";

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);
  const loggedIn = localStorage.getItem("login");
  const navigate = useNavigate();
  const [read, setRead] = useState(false);
  const mails = emails.length;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const email = draftemail.split("@");
        const res = await fetch(
          `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/receive.json`
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          let unRead = 0;
          let emailsArr = [];

          console.log(emailsArr);
          emailsArr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setEmails(emailsArr);
          console.log(emails);
        } else {
          throw new Error("Failed to fetch emails");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmails();
  }, [setSelectedEmail]);

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    setRead(true);
    console.log(email.date);
    const emailId = draftemail.split("@")[0];
    console.log(emailId);
    const emailDate = new Date(email.date).toISOString();
    console.log(emailDate);

    const res = await fetch(
      `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${emailId}/receive/${email.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          data: email.data,
          edit: email.edit,
          from: email.from,
          isRead: false,
          subject: email.subject,
        }),
      }
    );
    if (res.ok) {
      console.log("Done");
    }
  };

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const deleteHandler = async (id) => {
    try {
      const res = await fetch(
        `https://react-mailbox-6bafc-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        console.log("Email deleted successfully");
        setEmails(emails.filter((email) => email.id !== id));
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(emails);
  return (
    <div className={classes.InboxContainer}>
      <h3>Inbox ({mails})</h3>
      <div className={classes.EmailsContainer}>
        {emails.length > 0 &&
          emails.map((email) => (
            <div key={email.id}>
              <div className={classes.EmailItem}>
                <h4>From: {email.from}</h4>
                <p>Date:{getSimplifiedDate(email.data)}</p>
                <button onClick={() => handleEmailClick(email)}>Open</button>
                <button onClick={() => deleteHandler(email.id)}>Delete</button>
                {email.isRead && <span className={classes.unRead} />}
              </div>
            </div>
          ))}
        {emails.length === 0 && <h2>No emails found</h2>}
      </div>
      {selectedEmail ? (
        <EmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      ) : null}
    </div>
  );
};

export default Inbox;
