import React from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import "./notification.css";

const Notifications = () => {
  const { notification } = useSelector((state) => state.timeline);

  return (
    <div className="container">
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notification?.map((comment) => (
          <ListItem key={comment._id} className="notification-item">
            <ListItemAvatar>
              <Avatar
                alt={comment.userName}
                src={comment.userAvatar}
                className="avatar"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <div>
                  <Typography variant="body1" className="username">
                    {comment.userName}
                  </Typography>
                  <Typography variant="body1" className="text">
                    {comment.text}
                  </Typography>
                </div>
              }
              secondary={
                <Typography variant="body2" className="date">
                  {comment.createdAt}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Notifications;
