export default {
    name: "cls",
    description: "Clears the screen",
    execute(session, user_input, local_data) {
        console.clear();
        return 1;
    }
};
