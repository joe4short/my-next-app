"use client";

import React, { useState } from "react";
import RegistrationWrapper from "../components/RegistrationWrapper"; // Make sure paths are correct
import RegistrationMessage from "../components/RegistrationMessage"; // Correct path
import RegistrationForm from "../components/RegistrationForm"; // Correct path

const RegistrationPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <RegistrationWrapper>
 
      <RegistrationMessage message={message} />
      <RegistrationForm onMessage={setMessage} />
    </RegistrationWrapper>
  );
};

export default RegistrationPage;


// // app/components/RegistrationPage.tsx
// "use client";

// import React, { useState } from "react";
// import RegistrationWrapper from "./RegistrationWrapper";
// import RegistrationMessage from "./RegistrationMessage";
// import RegistrationForm from "./RegistrationForm";

// const RegistrationPage: React.FC = () => {
//   const [message, setMessage] = useState<string | null>(null);

//   return (
//     <RegistrationWrapper>
//       <h1>Registration Page</h1>
//       <RegistrationMessage message={message} />
//       <RegistrationForm onMessage={setMessage} />
//     </RegistrationWrapper>
//   );
// };

// export default RegistrationPage;
