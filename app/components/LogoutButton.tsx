import { Button } from '@mui/material';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => (
  <Button variant="contained" color="primary" fullWidth onClick={onLogout}>
    Logout
  </Button>
);

export default LogoutButton;
