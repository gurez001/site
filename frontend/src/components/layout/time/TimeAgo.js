// // import React from 'react'

// // export const TimeAgo = ({ time }) => {
// //     console.log(time)
// //     const getTimeDifference = (timestamp) => {
// //         const now = new Date();
// //         const date = new Date(timestamp);

// //         const timeDifference = now - date;
// //         const minutes = Math.floor(timeDifference / (1000 * 60));
// //         const hours = Math.floor(minutes / 60);
// //         const days = Math.floor(hours / 24);

// //         if (days > 0) {
// //           // If more than 24 hours, display the date
// //           const options = { day: "numeric", month: "short", year: "numeric" };
// //           return date.toLocaleDateString("en-US", options);
// //         } else if (hours > 0) {
// //           return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
// //         } else {
// //           return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
// //         }
// //       };

// //       return <span>{getTimeDifference(time)}</span>;
// // }
import React from "react";

export const TimeAgo = ({ time }) => {
    // console.log(time)
  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);

    const timeDifference = now - date;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (hours < 1) {
        // Less than 1 hour, show minutes ago
        return `${minutes} minutes ago`;
      } else if (days < 1) {
        // Less than 1 day, show hours ago
        return `${hours} hours ago`;
    } else if (days === 1) {
        // Exactly 1 day, show yesterday
        return 'Yesterday';
      } else if (days < 7) {
        // Less than 7 days, show days ago
        return `${days} days ago`;
      } else {
        // More than 7 days, show the date
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      }
    };
    

  return <span>{getTimeDifference(time)}</span>;
};
