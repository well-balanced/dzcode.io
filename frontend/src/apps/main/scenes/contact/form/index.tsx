import "./style.scss";
import React, { useState } from "react";
import { sendMessage } from "./send-message";
import { toast } from "react-toastify";
import { validateField } from "./validation/validate-form";

// FORM STATE
const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  errors: { name: "", email: "", subject: "", message: "" },
};

//  CONTACT COMPONENT
export const ContactForm = () => {
  const [state, setState] = useState(initialState);

  //  HANDLE STATE CHANGE
  const handleChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>,
  ): void => {
    const target = event.currentTarget;
    const { name, value } = target;
    const errors = validateField(name, value);
    setState({
      ...state,
      [name]: value,
      errors: { ...state.errors, ...errors },
    });
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //  SHOW MESSAGE SENT
    let emoji = Math.random() * 10 > 5 ? "✌" : "👍";
    toast.success(`${emoji} Message Sent Successfully!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // SEND MESSAGE
    const { name, email, subject, message } = state;
    const form = {
      name,
      email,
      subject,
      message,
    };

    const sent = await sendMessage(form);

    // HANDLE ERRORS
    if (!sent) {
      emoji = Math.random() * 10 > 5 ? "🤷‍♀️" : "🤷‍♂️";
      toast.error(`${emoji} Ops!, Something Went Wrong.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // RESET FORM
    setState(initialState);
  };

  // ERRORS FEEDBACK UI
  const classnames = {
    name: state.errors.name ? "form-error-field" : "",
    email: state.errors.email ? "form-error-field" : "",
    subject: state.errors.subject ? "form-error-field" : "",
    message: state.errors.message ? "form-error-field" : "",
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          autoComplete="off"
          id="name"
          name="name"
          value={state.name}
          onChange={handleChange}
          className={classnames.name}
          required
        />
      </label>
      {state.errors.name ? (
        <div className="form-error">{state.errors.name}</div>
      ) : (
        <></>
      )}
      <label htmlFor="name">
        Email
        <input
          name="email"
          type="email"
          autoComplete="off"
          id="email"
          value={state.email}
          onChange={handleChange}
          className={classnames.email}
          required
        />
        {state.errors.email ? (
          <div className="form-error">{state.errors.email}</div>
        ) : (
          <div></div>
        )}
      </label>
      <label htmlFor="subject">
        Subject
        <input
          autoComplete="off"
          type="text"
          id="subject"
          name="subject"
          value={state.subject}
          onChange={handleChange}
          className={classnames.subject}
          required
        />
        {state.errors.subject ? (
          <div className="form-error">{state.errors.subject}</div>
        ) : (
          <div></div>
        )}
      </label>
      <label htmlFor="name">
        Message
        <textarea
          autoComplete="off"
          name="message"
          id="message"
          cols={25}
          rows={8}
          value={state.message}
          onChange={handleChange}
          className={classnames.message}
          required
        ></textarea>
        {state.errors.message ? (
          <div className="form-error">{state.errors.message}</div>
        ) : (
          <div></div>
        )}
      </label>
      <button type="submit" value="SEND">
        SEND
      </button>
    </form>
  );
};
