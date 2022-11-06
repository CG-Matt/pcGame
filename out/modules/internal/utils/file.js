export { splitName };
function splitName(file_name, error_message) {
    if (!error_message) {
        error_message = `File "${file_name}" does not have an extension and therefore cannot be processed`;
    }
    const reply = { file_name: "", file_extension: "", full_file_name: file_name, error: "" };
    if (!file_name.includes(".")) {
        reply.error = error_message;
        return reply;
    }
    const segments = file_name.split(".");
    const segments_with_dots = [];
    if (segments.length > 2) {
        for (let i = segments.length; i > 1; i--) {
            segments_with_dots.push(segments.shift());
        }
        segments.unshift(segments_with_dots.join("."));
    }
    reply.file_name = segments[0];
    reply.file_extension = segments[1];
    return reply;
}
