import React from 'react';
import { Typography } from '@mui/material';

interface MessageProps {
  message: string;
  color: "error" | "success";
}

const Message: React.FC<MessageProps> = ({ message, color }) => {
  return <Typography color={color}>{message}</Typography>;
};

export default Message;
