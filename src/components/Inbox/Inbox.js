import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InboxEmailCard from "./InboxEmailCard";
import useHttp from "../../hooks/use-http";
import classes from "../Sent/Sent.module.css";

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emails, setEmails] = useState([]);
  const draftemail = useSelector((state) => state.auth.email);
  const loggedIn = localStorage.getItem("login");
  const navigate = useNavigate();
  let [unReadCount, setUnReadCount] = useState(0);
  const mails = emails.length;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const email = draftemail.split("@");
        const res = await fetch(
          `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${email[0]}/receive.json`
        );
        if (res.ok) {
          const data = await res.json();
          if (data) {
            let emailsArr = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setEmails(emailsArr);
            setUnReadCount(emailsArr.filter((email) => !email.isRead).length);
          } else {
            setEmails([]);
            setUnReadCount(0);
          }
        } else {
          throw new Error("Failed to fetch emails");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchEmails, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [draftemail]);

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    const emailId = draftemail.split("@")[0];
    const emailDate = new Date(email.date).toISOString();

    if (!email.isRead) {
      const res = await fetch(
        `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${emailId}/receive/${email.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            date: emailDate,
            edit: email.edit,
            from: email.from,
            isRead: true,
            subject: email.subject,
          }),
        }
      );

      if (res.ok) {
        console.log(res);
        setEmails((prevEmails) => {
          const updatedEmails = prevEmails.map((prevEmail) => {
            if (prevEmail.id === email.id) {
              return {
                ...prevEmail,
                isRead: true,
              };
            }
            return prevEmail;
          });
          setUnReadCount(updatedEmails.filter((email) => !email.isRead).length);
          return updatedEmails;
        });
      } else {
        console.error("Failed to mark the email as read");
      }
    }
  };

  useEffect(() => {
    let count = 0;
    if (emails) {
      emails.forEach((email) => {
        if (!email.isRead) {
          count++;
        }
      });
    }
    setUnReadCount(count);
  }, [emails]);

  const handleCloseEmailCard = () => {
    setSelectedEmail(null);
  };

  const getSimplifiedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const { sendDeleteRequest } = useHttp();

  const deleteHandler = async (id) => {
    const dlt = draftemail.split("@");
    const url = `https://react-mail-client-b76f1-default-rtdb.asia-southeast1.firebasedatabase.app/mail/${dlt[0]}/receive/${id}.json`;
    try {
      await sendDeleteRequest(url);
      console.log("Email deleted successfully");
      setEmails(emails.filter((email) => email.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.InboxContainer}>
      <h3>
        Inbox (All Mails: {mails})
        {unReadCount > 0 && (
          <span className={classes.unreadcount}>Unread: {unReadCount}</span>
        )}
      </h3>
      <div className={classes.EmailsContainer}>
        {emails.length > 0 ? (
          emails.map((email) => (
            <div key={email.id}>
              <div className={classes.EmailItem}>
                <h4>From: {email.from}</h4>
                <p>Date: {getSimplifiedDate(email.date)}</p>
                <button onClick={() => handleEmailClick(email)}>Open</button>
                <button onClick={() => deleteHandler(email.id)}>Delete</button>
                {!email.isRead && <span className={classes.unRead} />}
              </div>
            </div>
          ))
        ) : (
          <h3>No emails found</h3>
        )}
      </div>
      {selectedEmail && (
        <InboxEmailCard email={selectedEmail} onClose={handleCloseEmailCard} />
      )}
    </div>
  );
};

export default Inbox;
