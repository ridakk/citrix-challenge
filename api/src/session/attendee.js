let Attendee = (attendeeid, sessionToken) => {
  return {
    getId: () => {
      return attendeeid;
    },
    mute: () => {
      return attendeeid;
    },
    unmute: () => {
      return sessionToken;
    }
  };
};

export default Attendee;
