"use client";

import React from "react";

const RegistrationMessage: React.FC<{ message: string | null }> = ({ message }) => {
  return message ? <div>{message}</div> : null;
};

export default RegistrationMessage;  // Default export
