import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, className, style }) => (
  <Alert variant={variant} className={className} style={style}>
    {children}
  </Alert>
);

Message.defaultProps = {
  variant: 'info',
};

export default Message;
