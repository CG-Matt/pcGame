export default {
    name: "can_you_see_me",
    allowGuestFileAccess: true,
    execute(session, user_input, local_data) {
        return `This website does not contain a displayable UI`;
    }
};
